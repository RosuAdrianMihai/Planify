import "./Project.css"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import AddMemberModal from "../../components/modals/addMemberModal/AddMemberModal"
import CreateTaskModal from "../../components/modals/createTaskModal/CreateTaskModal"
import { useEffect, useState } from "react"
import axios from "axios"
import { URL } from "../../utils/utils"

function Project() {
  const { user } = useSelector((state) => state.users)
  const { projects } = useSelector((state) => state.projects)
  const { tasks } = useSelector((state) => state.tasks)
  const { project_id } = useParams()

  const [manager, setManager] = useState(null)
  const [members, setMembers] = useState([])

  const currentProject = projects.find((project) => project.id === Number(project_id))

  useEffect(() => {
    if(user.position !== "admin"){
      axios.get(`${URL}/projectUser/${project_id}/team/${user.id}`).then((responseTeam) => {
        const teamData = responseTeam.data
        
        setManager(teamData.manager)
        setMembers(teamData.members)
      })
    }
  }, [])

  console.log(manager, members, tasks)

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
          <section className="teamTasksContainer">
          <div>
            <h1>Open</h1>

            <div className="taskList">
              Hello Open
            </div>
          </div>

          <div>
            <h1>Pending</h1>

            <div className="taskList">
              Hello Pending
            </div>
          </div>

          <div>
            <h1>Completed</h1>

            <div className="taskList">
              Hello Completed
            </div>
          </div>

          <div>
            <h1>Closed</h1>

            <div className="taskList">
              Hello closed
            </div>
          </div>
      </section>
        }
    </div>
  )
}

export default Project