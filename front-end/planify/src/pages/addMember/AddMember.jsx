import "./AddMember.css"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Button, Form, TextField } from "@adobe/react-spectrum"

function AddMember() {
    const projects = useSelector((state) => state.projects)

    const [selectedProject, setSelectedProject] = useState(false)
    const [position, setPosition] = useState("")

  return (
    <div>
        <h1>Create account</h1>

        <Form>
            <select
            onChange={setSelectedProject(true)}
            name="project_id"
            >
                {projects.map((project) => {
                    return <option key={project.id} value={project.id}>{project.title}</option>
                })}
            </select>

            {
                selectedProject && 
                <>
                    <select
                    name="position"
                    value={position}
                    onChange={(event) => setPosition(event.target.value)}
                    >
                        <option value="manager">Manager</option>
                        <option value="member">Member</option>
                    </select>

                    <select>
                        
                    </select>

                    <TextField 
                    name="email"
                    label="Email"
                    type="email"
                    isRequired
                    />

                    <TextField 
                    name="password"
                    label="Password"
                    type="password"
                    isRequired
                    minLength={8}
                    />

                    <Button variant="primary" type="submit">Add</Button>
                </>
            }
        </Form>
        
    </div>
  )
}

export default AddMember