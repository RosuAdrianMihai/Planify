import "./UserProjectTasks.css"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import capitalize from "../../utils/capitalize"

function UserProjectTasks() {
    const { user_id, project_id } = useParams()

    const { tasks } = useSelector((state) => state.tasks)
    const { members } = useSelector((state) => state.users)
    const { projects } = useSelector((state) => state.projects)

    const viewableTasks = tasks.filter((task) => task.assignedUser !== null && task.assignedUser.id == user_id && task.ProjectId == project_id)

    const selectedMember = members.find((member) => member.id == user_id)

    const currentProject = projects.find((project) => project.id == project_id)

    return (
    <div>
        <h1 className="userProjectTasksHeader">Tasks {selectedMember.name} - {currentProject.title}</h1>

        {viewableTasks.map((task) => {
            return <div className="memberTaskContainer">
                <p>Title: {task.title}</p>
                <p>Status: {capitalize(task.status)}</p>
                <p>Description: {task.description}</p>
            </div>
        })}
    </div>
  )
}

export default UserProjectTasks