import "./ProjectCard.css"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { Button } from "@adobe/react-spectrum"

function ProjectCard({ project }) {
    const user = useSelector((state) => state.user)

  return (
    <div className="projectCardContainer">
        <h2>{project.title}</h2>
        <p>{project.description}</p>

        <Button 
            variant="primary"
            marginStart="80%"
            >
            <Link to={`/common/${user.id}/${project.id}`}>
                To project
            </Link>
        </Button>
    </div>
  )
}

export default ProjectCard