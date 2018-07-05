import React, { Component } from 'react'
import PT from 'prop-types'
import _ from 'lodash'
import moment from 'moment'
import Panel from '../Panel/Panel'
import DeleteProjectModal from './DeleteProjectModal'
import ProjectCardBody from '../../projects/components/projectsCard/ProjectCardBody'
import ProjectDirectLinks from '../../projects/list/components/Projects/ProjectDirectLinks'
import MobileExpandable from '../MobileExpandable/MobileExpandable'
import ProjectProgress from '../../projects/detail/components/ProjectProgress'
import MediaQuery from 'react-responsive'
import { SCREEN_BREAKPOINT_MD } from '../../config/constants'

import { formatProjectProgressProps, formatOldProjectProgressProps } from '../../helpers/projectHelper'

import './ProjectInfo.scss'

class ProjectInfo extends Component {

  constructor(props) {
    super(props)
    this.toggleProjectDelete = this.toggleProjectDelete.bind(this)
    this.onConfirmDelete = this.onConfirmDelete.bind(this)
  }

  componentWillMount() {
    this.setState({ showDeleteConfirm: false })
  }

  toggleProjectDelete() {
    this.setState({ showDeleteConfirm: !this.state.showDeleteConfirm })
  }

  onConfirmDelete() {
    this.props.onDeleteProject()
  }

  render() {
    const { project, currentMemberRole, duration, canDeleteProject,
      onChangeStatus, directLinks, isSuperUser, phases } = this.props
    const { showDeleteConfirm } = this.state

    const code = _.get(project, 'details.utm.code', '')

    const projectProgressProps = _.omit(
      !phases
        ? formatOldProjectProgressProps(project)
        : formatProjectProgressProps(project, phases),
      'labelSpent'
    )

    return (
      <div className="project-info">
        <div className="project-info-header">
          <div className="project-status-header">project status</div>
          {canDeleteProject && !showDeleteConfirm &&
            <div className="project-delete-icon">
              <Panel.DeleteBtn onClick={this.toggleProjectDelete} />
            </div>
          }
        </div>
        <div className="project-status">
          <div className="project-status-progress">
            <ProjectProgress {...projectProgressProps} />
          </div>
          <div className="project-status-info">
            <div className="project-status-time">Created {moment(project.updatedAt).format('MMM DD, YYYY')}</div>
            {!!code && <div className="project-status-ref">{code}</div>}
          </div>
        </div>
        <MobileExpandable title="DESCRIPTION" defaultOpen>
          {showDeleteConfirm &&
            <DeleteProjectModal
              onCancel={this.toggleProjectDelete}
              onConfirm={this.onConfirmDelete}
            />
          }
          <MediaQuery minWidth={SCREEN_BREAKPOINT_MD}>
            {(matches) => (
              <ProjectCardBody
                project={project}
                currentMemberRole={currentMemberRole}
                duration={duration}
                descLinesCount={matches ? 4 : Infinity}
                onChangeStatus={onChangeStatus}
                isSuperUser={isSuperUser}
                showLink
              />
            )}
          </MediaQuery>
          <ProjectDirectLinks
            directLinks={directLinks}
          />
        </MobileExpandable>
      </div>
    )
  }
}

ProjectInfo.propTypes = {
  project: PT.object.isRequired,
  currentMemberRole: PT.string,
  duration: PT.object.isRequired
}

export default ProjectInfo
