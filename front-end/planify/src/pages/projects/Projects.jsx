import "./Projects.css"
import { useSelector } from "react-redux"
import ProjectCard from "../../components/cards/projectCard/ProjectCard"

function Projects() {
    const projects = useSelector((state) => state.projects)

  return (
    <div className="projectsContainer">
        {projects.map((project) => {
            return <ProjectCard key={project.id} project={project} />
        })}
    </div>
  )
}

export default Projects