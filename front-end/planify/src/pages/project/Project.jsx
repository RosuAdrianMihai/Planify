import "./Project.css"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

function Project() {
  const projects = useSelector((state) => state.projects)
  const { project_id } = useParams()

  const currentProject = projects.find((project) => project.id === Number(project_id))

  return (
    <div>
        <h1>{currentProject.title}</h1>

        <p>{currentProject.description}</p>
    </div>
  )
}

export default Project