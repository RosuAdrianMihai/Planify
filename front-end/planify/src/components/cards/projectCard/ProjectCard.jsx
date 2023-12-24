import "./ProjectCard.css"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { Button } from "@adobe/react-spectrum"

function ProjectCard({ project }) {
    const { user } = useSelector((state) => state.users)

    const setbuttonMargin = () => {
      const windowSize = window.innerWidth

      switch(true){
        case windowSize < 400:
          return "65%"
        case windowSize < 800:
          return "70%"
        case windowSize < 1200:
          return "75%"
        case windowSize < 1600:
          return "85%"
        default:
          return "90%"
      }
    }

  return (
    <div className="projectCardContainer">
        <h2>{project.title}</h2>
        <p>{project.description}</p>

        <Button 
            variant="primary"
            marginStart={setbuttonMargin()}
            >
            <Link to={`/common/${user.id}/${project.id}`}>
                To project
            </Link>
        </Button>
    </div>
  )
}

export default ProjectCard