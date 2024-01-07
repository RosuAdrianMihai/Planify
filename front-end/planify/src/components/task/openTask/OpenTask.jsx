import { Heading, Divider, Content, Form, Picker, Item, Button } from "@adobe/react-spectrum"
import axios from "axios"
import { URL } from "../../../utils/utils"
import { useDispatch } from "react-redux"
import { updateTask } from "../../../store/taskSlice"
import { ToastQueue } from "@react-spectrum/toast"
import capitalize from "../../../utils/capitalize"

function OpenTask({ taskData, user, manager, members, close }) {
  const dispatch = useDispatch()

  const isManager = manager.id == user.id ? true : false

  const assignTask = async(assignedUserId) => {
    let userData = members.find((member) => member.id == assignedUserId)

    let toastType = ""
    let message = ""

    try{
        const responseAssignTask = await axios.put(`${URL}/taskUser/${taskData.id}/${userData.id}`, {
            isAssigned: true
        })
    
        let updatedTask = { ...responseAssignTask.data.data, assignedUser: userData }
    
        dispatch(updateTask(updatedTask))

        toastType = "positive"
        message = responseAssignTask.data.message

        close()
    }catch(error){
        if(error.response.data.message){
            toastType = "negative"
            message = error.response.data.message
        }
    }finally{
        ToastQueue[toastType](message, {
            timeout: 5000
        })
    }
  }

  const onSubmit = async(event, close) => {
    event.preventDefault()

    const data = Object.fromEntries(new FormData(event.currentTarget))

    await assignTask(data.assignedUserId, close)
  }

  return (
    <>
        <Heading>Task info - {capitalize(taskData.status)}</Heading>

        <Divider />

        <Content>
            <p>Title: {taskData.title}</p>

            <p>Assigned: No</p>

            <p>Description: {taskData.description}</p>

            {
                isManager === true ?
                <Form
                onSubmit={onSubmit}
                validationBehavior="native"
                >
                    <Picker 
                    name="assignedUserId" 
                    label="Assign member" 
                    items={members}
                    isRequired
                    >
                        {(member) => <Item key={member.id}>{member.name}</Item>}
                    </Picker>

                    <Button 
                    type="submit"
                    marginTop="40px">Assign</Button>
                </Form>
                :
                <Button 
                variant="primary"
                width="100%"
                marginTop="30px" 
                onPress={() => assignTask(user.id)}>Assume</Button>
            }
        </Content>
    </>
  )
}

export default OpenTask