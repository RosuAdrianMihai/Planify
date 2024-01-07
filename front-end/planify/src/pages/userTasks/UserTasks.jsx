import "./UserTasks.css"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import capitalize from "../../utils/capitalize"

function UserTasks() {
  const { user_id } = useParams()


  const { tasks } = useSelector((state) => state.tasks)
  const { user, managers, members } = useSelector((state) => state.users)
  const { projects } = useSelector((state) => state.projects)

  let ownTasks = user_id == user.id && user.position !== "manager" ? true : false

  let viewableTasks = []

  for(const task of tasks){
    if(!ownTasks && task.managerId == user.id){
        viewableTasks.push(task)
        continue
    }

    if(task.assignedUser !== null && task.assignedUser.id == user_id){
        viewableTasks.push(task)
    }
  }

  let tasksUser = null

  if(!ownTasks){
    tasksUser = user
  }else{
    tasksUser = members.find((currentUser) => currentUser.id == user_id)
  }

  return (
    <div>
        <h1 className="userTasksHeader">Tasks for {tasksUser.name}</h1>

        {viewableTasks.map((task) => {
            const taskProject = projects.find((project) => project.id == task.ProjectId)
            const taskManager = managers.find((manager) => manager.id == task.managerId) 

            return <div className="userTaskContainer">
                <div className="taskHeader">
                    <p>Project: {taskProject.title}, Manager: {taskManager.name}</p>

                    <div>
                        <p>Status: {capitalize(task.status)}</p>
                        {task.assignedUser !== null && <p>Assigned member: {task.assignedUser.name}</p>}
                    </div>
                </div>

                <div>
                    <p>Title: {task.title}</p>
                    <p>Description: {task.description}</p>
                </div>
            </div>
        })}
    </div>
  )
}

export default UserTasks