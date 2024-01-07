import { Heading, Divider, Content, Button } from "@adobe/react-spectrum"
import axios from "axios"
import { URL } from "../../../utils/utils"
import { useDispatch } from "react-redux"
import { updateTask } from "../../../store/taskSlice"
import { ToastQueue } from "@react-spectrum/toast"
import capitalize from "../../../utils/capitalize"

function PendingTask({ taskData, user, close }) {
    const dispatch = useDispatch()
  
    const taskAssignedToUser = taskData.assignedUser.id == user.id ? true : false 

  const completeTask = async() => {
    let toastType = ""
    let message = ""

    try{
        const responseCompletedTask = await axios.patch(`${URL}/task/${taskData.id}`, {
            status: "COMPLETED"
        })

        let updatedTask = { ...responseCompletedTask.data.data, assignedUser: taskData.assignedUser }

        dispatch(updateTask(updatedTask))

        toastType = "positive"
        message = responseCompletedTask.data.message

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

            <p>Assigned to: {taskData.assignedUser.name}</p>

            <p>Description: {taskData.description}</p>

            {
                taskAssignedToUser === true &&
                <Button 
                variant="primary"
                width="100%"
                marginTop="30px"
                onPress={completeTask}
                >Complete
                </Button> 
            }
        </Content>
    </>
  )
}

export default PendingTask