import { Heading, Divider, Content, Button } from "@adobe/react-spectrum"
import axios from "axios"
import { URL } from "../../../utils/utils"
import { useDispatch } from "react-redux"
import { updateTask } from "../../../store/taskSlice"
import { ToastQueue } from "@react-spectrum/toast"
import capitalize from "../../../utils/capitalize"

function CompletedTask({ taskData, user, manager, close }) {
  const dispatch = useDispatch()
   
  const isManager = manager.id == user.id ? true : false

  const closeTask = async() => {
    let toastType = ""
    let message = ""

    try{
        const responseClosedTask = await axios.patch(`${URL}/task/${taskData.id}`, {
            status: "CLOSED"
        })

        let closedTask = { ...responseClosedTask.data.data, assignedUser: taskData.assignedUser }

        dispatch(updateTask(closedTask))

        toastType = "positive"
        message = responseClosedTask.data.message

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

  return (
    <>
        <Heading>Task info - {capitalize(taskData.status)}</Heading>

        <Divider />

        <Content>
            <p>Title: {taskData.title}</p>

            <p>Assgined to: {taskData.assignedUser.name}</p>

            <p>Description: {taskData.description}</p>

            {
                isManager && 
                <Button 
                variant="primary"
                width="100%"
                marginTop="30px"
                onPress={closeTask}
                >Close
                </Button> 
            }
        </Content>
    </>
  )
}

export default CompletedTask