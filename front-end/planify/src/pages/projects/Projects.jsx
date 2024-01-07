import "./Projects.css"
import { useSelector } from "react-redux"
import ProjectCard from "../../components/cards/projectCard/ProjectCard"

function Projects() {
    const { projects } = useSelector((state) => state.projects)
    const { user } = useSelector((state) => state.users)

    if(projects.length === 0){
      if(user.position !== "admin"){
        return <h2>You are not a {user.position} in any project</h2>
      }else{
        return <h2>There are no projects</h2>
      }
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