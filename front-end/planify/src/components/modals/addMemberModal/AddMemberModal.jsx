import "./AddMemberModal.css"
import { useEffect, useState } from "react"
import { ActionButton, Button, Content, Dialog, DialogTrigger, Divider, Form, Heading } from "@adobe/react-spectrum"
import { PlusCircleIcon } from "@heroicons/react/24/outline"
import { useSelector } from "react-redux"
import axios from "axios"
import { URL } from "../../../utils/utils"
import { useParams } from "react-router-dom"
import { ToastQueue } from "@react-spectrum/toast"

function AddMemberModal() {
    const [selectedPosition, setSelectedPosition] = useState("")

    const [managers, members] = useSelector((state) => [state.users.managers, state.users.members])

    const { project_id } = useParams()

    const [projectManagers, setProjectManagers] = useState([])

    const [formKey, setFormKey] = useState(0)

    useEffect(() => {
        if(selectedPosition === "member"){
            axios.get(`${URL}/projectUser/${project_id}/managers`).then((responseManagers) => {
                setProjectManagers(responseManagers.data)
            })
        }
    }, [selectedPosition])

    const onSubmit = async(event) => {
        event.preventDefault()

        const data = Object.fromEntries(new FormData(event.currentTarget))

        if(data.position === "manager"){
            data.managerId = null
        }

        let message = ""
        let toastType = ""

        try{
            const response = await axios.post(`${URL}/projectUser/${project_id}`, data)

            message = response.data.message
            toastType = "positive"

            setSelectedPosition("")
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

  return (
    <DialogTrigger>
    <ActionButton aria-label="add member" marginTop={5} marginStart={5}>
      <PlusCircleIcon />
    </ActionButton>

    {(close) => (  
    <Dialog isDismissable>
      <Heading Heading>Add member</Heading>

      <Divider />

      <Content>
        <Form
        key={formKey}
        onSubmit={onSubmit}
        >
          <select 
          name="position"
          value={selectedPosition}
          onChange={(event) => setSelectedPosition(event.target.value)}
          className="addMemberModalSelect"
          >
            <option selected disabled value="">Select a role</option>

            <option value="manager">Manager</option>
            <option value="member">Member</option>
          </select>

          {
          selectedPosition !== "" && 
          <select
          name="userId"
          className="addMemberModalSelect"
          >
            <option selected disabled value="">Select user</option>
            {
            selectedPosition === "manager" ? 
            managers.map((manager) => {
                return <option key={manager.id} value={manager.id}>{manager.name}</option>
            }) 
            :
            members.map((member) => {
                return <option key={member.id} value={member.id}>{member.name}</option>
            })
            }
          </select>
          }

          {
            selectedPosition === "member" &&
            <select
            name="managerId"
            className="addMemberModalSelect"
            >
                <option selected disabled value="">Select manager</option>

                {projectManagers.map((projectManager) => {
                    return <option key={projectManager.id} value={projectManager.id}>{projectManager.name}</option>
                })}
            </select>
          }

          <Button 
          type="submit"
          variant="primary"
          marginTop={30}
          >
            Add
          </Button>
        </Form>
      </Content>
    </Dialog>
    )}
  </DialogTrigger>
  )
}

export default AddMemberModal