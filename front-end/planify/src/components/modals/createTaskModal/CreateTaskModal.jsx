import "./CreateTaskModal.css"
import { useEffect, useState } from "react"
import { DialogTrigger, ActionButton, Dialog, Heading, Divider, Content, Form, TextField, TextArea, Button } from "@adobe/react-spectrum"
import { PlusCircleIcon } from "@heroicons/react/24/outline"
import axios from "axios"
import { URL } from "../../../utils/utils"
import { useParams } from "react-router-dom"
import { ToastQueue } from "@react-spectrum/toast"
import { useDispatch } from "react-redux"
import { addTask } from "../../../store/taskSlice"

function CreateTaskModal() {
    const [teamMembers, setTeamMembers] = useState([])

    const { project_id, user_id } = useParams()

    const dispatch = useDispatch()

    const [formKey, setFormKey] = useState(0)

    const onSubmit = async(event) => {
        event.preventDefault()

        const data = Object.fromEntries(new FormData(event.currentTarget))
        data.managerId = user_id

        let message = ""
        let toastType = ""

        try{
            const responseTask = await axios.post(`${URL}/task/${project_id}`, data)

            let task  = responseTask.data.data
            task.assignedUser = null
            message = responseTask.data.message

            if(data.userSelected){
                const selectedUser = JSON.parse(data.userSelected)
                const responseAssignTask = await axios.put(`${URL}/taskUser/${task.id}/${selectedUser.id}`, {
                    isAssigned: true
                })

                task = responseAssignTask.data.data
                task.assignedUser = selectedUser
            
                message = responseAssignTask.data.message
            }

            dispatch(addTask(task))

            toastType = "positive"

            setFormKey((prevFormKey) => prevFormKey + 1)
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
                    onSubmit={onSubmit}
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
                        name="userSelected"
                        className="createTaskModalSelect"
                        >
                            <option selected disabled value="">Assign task (optional)</option>

                            {
                                teamMembers.map((teamMember) => {
                                    return <option key={teamMember.id} value={JSON.stringify(teamMember)}>{teamMember.name}</option>
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