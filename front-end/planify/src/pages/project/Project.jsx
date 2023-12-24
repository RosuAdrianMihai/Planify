import "./Project.css"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { PlusCircleIcon } from "@heroicons/react/24/outline"
import { Form, Button, ActionButton, Dialog, DialogTrigger, Heading, Divider, Content } from "@adobe/react-spectrum"
import { useState } from "react"
import AddMemberModal from "../../components/modals/addMemberModal/AddMemberModal"

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
        </h1>

        <p>{currentProject.description}</p>
    </div>
  )
}

export default Project