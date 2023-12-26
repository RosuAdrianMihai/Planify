import "./CreateTaskModal.css"
import { useEffect, useState } from "react"
import { DialogTrigger, ActionButton, Dialog, Heading, Divider, Content, Form, TextField, TextArea, Button } from "@adobe/react-spectrum"
import { PlusCircleIcon } from "@heroicons/react/24/outline"
import axios from "axios"
import { URL } from "../../../utils/utils"
import { useParams } from "react-router-dom"
import { ToastQueue } from "@react-spectrum/toast"

function CreateTaskModal() {
    const [teamMembers, setTeamMembers] = useState([])

    const { project_id, user_id } = useParams()

    const [formKey, setFormKey] = useState(0)

    const onSubmit = async(event, close) => {
        event.preventDefault()

        const data = Object.fromEntries(new FormData(event.currentTarget))
        data.managerId = user_id

        let message = ""
        let toastType = ""

        try{
            const responseTask = await axios.post(`${URL}/task/${project_id}`, data)

            const task  = responseTask.data.data
            message = responseTask.data.message

            if(data.UserId){
                const responseAssignTask = await axios.put(`${URL}/taskUser/${task.id}/${user_id}`, {
                    isAssigned: true
                })

                message = responseAssignTask.data.message
            }

            toastType = "positive"

            setFormKey((prevFormKey) => prevFormKey + 1)
            close()
        }catch(error){
            message = error.response.data.message
            toastType = "negative"
        }finally{
            ToastQueue[toastType](message, {
                timeout: 5000
            })
        }
    }

    useEffect(() => {
        axios.get(`${URL}/projectUser/${project_id}/${user_id}`).then((responseTeamMembers) => {
            setTeamMembers(responseTeamMembers.data)
        })
    }, [])

  return (
    <DialogTrigger>
        <ActionButton aria-label="create task" marginTop={5} marginStart={5}>
            <PlusCircleIcon />
        </ActionButton>

        {(close) => (
            <Dialog isDismissable>
                <Heading>Create task</Heading>
    
                <Divider />
    
                <Content>
                    <Form
                    key={formKey}
                    onSubmit={(event) => onSubmit(event, close)}
                    validationBehavior="native"
                    >
                        <TextField 
                        name="title"
                        label="Title"
                        isRequired
                        minLength={6}
                        />

                        <TextArea 
                        name="description"
                        label="Description"
                        isRequired
                        minLength={20}
                        />

                        <select
                        name="UserId"
                        className="createTaskModalSelect"
                        >
                            <option selected disabled value="">Assign task (optional)</option>

                            {
                                teamMembers.map((teamMember) => {
                                    return <option key={teamMember.id} value={teamMember.id}>{teamMember.name}</option>
                                })
                            }
                        </select>

                        <Button
                        type="submit" 
                        variant="primary"
                        marginTop={30}
                        >
                            Create
                        </Button>
                    </Form>
                </Content>
            </Dialog>
            )
        }
    </DialogTrigger>
  )
}

export default CreateTaskModal