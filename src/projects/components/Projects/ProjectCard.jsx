import React from 'react'
import PT from 'prop-types'
import { withRouter } from 'react-router-dom'
import { getProjectRoleForCurrentUser } from '../../../helpers/projectHelper'
import ProjectCardHeader from './ProjectCardHeader'
import ProjectCardBody from './ProjectCardBody'
import ProjectManagerAvatars from './ProjectManagerAvatars'
import './ProjectCard.scss'

function ProjectCard({ project, duration, disabled, currentUser, history, onChangeStatus, projectTemplates }) {
  const className = `ProjectCard ${ disabled ? 'disabled' : 'enabled'}`
  if (!project) return null
  const currentMemberRole = getProjectRoleForCurrentUser({ project, currentUserId: currentUser.userId})
  return (
    <div
      className={className}
      onClick={() => {
        history.push(`/projects/${project.id}/`)
      }}
    >
      <div className="card-header">
        <ProjectCardHeader project={project} projectTemplates={projectTemplates} />
      </div>
      <div className="card-body">
        <ProjectCardBody
          project={project}
          currentMemberRole={currentMemberRole}
          duration={duration}
          onChangeStatus={onChangeStatus}
          showLink
          showLinkURL={`/projects/${project.id}/specification`}
          canEditStatus={false}
        />
      </div>
      <div className="card-footer">
        <ProjectManagerAvatars managers={project.members} maxShownNum={10} />
      </div>
    </div>
  )
}

ProjectCard.defaultTypes = {
}

ProjectCard.propTypes = {
  project: PT.object.isRequired,
  currentMemberRole: PT.string,
  projectTemplates: PT.array.isRequired,
  // duration: PT.object.isRequired,
}

export default withRouter(ProjectCard)
