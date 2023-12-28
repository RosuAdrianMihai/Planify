import "./Project.css"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import AddMemberModal from "../../components/modals/addMemberModal/AddMemberModal"
import CreateTaskModal from "../../components/modals/createTaskModal/CreateTaskModal"
import { useEffect, useState } from "react"
import axios from "axios"
import { URL } from "../../utils/utils"
import Task from "../../components/task/Task"

function Project() {
  const { user } = useSelector((state) => state.users)
  const { projects } = useSelector((state) => state.projects)
  const { tasks } = useSelector((state) => state.tasks)
  const { project_id } = useParams()

  const [manager, setManager] = useState(null)
  const [members, setMembers] = useState([])

  const currentProject = projects.find((project) => project.id == project_id)

  const teamTasks = tasks.filter((task) => {
    return task.ProjectId == project_id && task.managerId == manager?.id
  })

  useEffect(() => {
    if(user.position !== "admin"){
      axios.get(`${URL}/projectUser/${project_id}/team/${user.id}`).then((responseTeam) => {
        const teamData = responseTeam.data
        
        setManager(teamData.manager)
        setMembers(teamData.members)
      })
    }
  }, [])

  return (
    <div>
        <h1 className="projectHeader">{currentProject.title} 
          {
          user.position === "admin" &&
          <AddMemberModal />
          }

          {
            user.position === "manager" && 
            <CreateTaskModal />
          }
        </h1>

        <p>{currentProject.description}</p>

        {
          user.position !== "admin" && 
          <section>
              <h2 className="teamManagerHeader">Manager: {manager?.name}</h2>

            <div className="teamTasksContainer">
              <div className="tasksContainer">
                <h1>Open</h1>

                <div className="taskList">
                  {teamTasks.filter((task) => task.status == "OPEN").map((task) => {
                    return <Task key={task.id} taskData={task} user={user} manager={manager} members={members} />
                  })}
                </div>
              </div>

            <div className="tasksContainer">
              <h1>Pending</h1>

              <div className="taskList">
                Hello Pending
              </div>
            </div>

            <div className="tasksContainer">
              <h1>Completed</h1>

              <div className="taskList">
                Hello Completed
              </div>
            </div>

            <div className="tasksContainer">
              <h1>Closed</h1>

              <div className="taskList">
                Hello closed
              </div>
            </div>
          </div>
      </section>
        }
    </div>
  )
}

export default Project