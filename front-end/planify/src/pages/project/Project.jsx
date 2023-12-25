import "./Project.css"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import AddMemberModal from "../../components/modals/addMemberModal/AddMemberModal"
import CreateTaskModal from "../../components/modals/createTaskModal/CreateTaskModal"

function Project() {
  const { user } = useSelector((state) => state.users)
  const projects = useSelector((state) => state.projects)
  const { project_id } = useParams()

  const currentProject = projects.find((project) => project.id === Number(project_id))

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
    </div>
  )
}

export default Project