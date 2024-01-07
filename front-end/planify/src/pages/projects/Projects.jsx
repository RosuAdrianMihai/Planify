import "./Projects.css"
import { useSelector } from "react-redux"
import ProjectCard from "../../components/cards/projectCard/ProjectCard"

function Projects() {
    const { projects } = useSelector((state) => state.projects)

    if(projects.length === 0){
      return <h2>You are not in a member or manager in any projects</h2>
    }

  return (
    <div className="projectsContainer">
        {projects.map((project) => {
            return <ProjectCard key={project.id} project={project} />
        })}
    </div>
  )
}

export default Projects