import "./SignIn.css"
import { Form, TextField, Button } from '@adobe/react-spectrum'
import axios from "axios"
import { URL } from "../../utils/utils.js"
import { useDispatch } from "react-redux"
import { setUser, setUsers } from "../../store/userSlice.js"
import { setProjects } from "../../store/projectSlice.js"
import { useNavigate } from "react-router-dom"
import { ToastQueue } from "@react-spectrum/toast"
import { setTasks } from "../../store/taskSlice.js"

function SignIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async function(event){      
    event.preventDefault()

    let data = Object.fromEntries(
      new FormData(event.currentTarget)
    )

    try{
      const responseUser = await axios.post(`${URL}/user/signIn`, data)
      const user = responseUser.data
      dispatch(setUser(user))

      const responseProjects = await axios.post(`${URL}/projectUser`, user)
      const projects = responseProjects.data
      dispatch(setProjects(projects))

      if(user.position === "admin"){
        const responseUsers = await axios.get(`${URL}/user`)
        const users = responseUsers.data
        dispatch(setUsers(users))
      }else{
        for(const project of projects){
          const responseTeamMembers = await axios.get(`${URL}/projectUser/${project.id}/team/${user.id}`)
          const teamMembers = responseTeamMembers.data

          dispatch(setUsers([teamMembers.manager, ...teamMembers.members]))

          const responseTeamTasks = await axios.get(`${URL}/projectUser/${project.id}/team/${teamMembers.manager.id}/tasks`)
          const teamTasks = responseTeamTasks.data

          dispatch(setTasks(teamTasks))
        }
      }

      navigate(`/common/${user.id}`)
    }catch(error){
      console.log(error)
      const errorMessage = error.response.data.message
      ToastQueue.negative(errorMessage, {
        timeout: 5000
      })
    }
  }

  return (
    <div className="signInContainer">
        <h1 className="header">Planify</h1>

        <Form
        onSubmit={onSubmit}
        validationBehavior="native"
        width="size-3600"
        >
            <TextField 
            type="email" 
            name="email" 
            label="Email" 
            isRequired
            />

            <TextField 
            type="password" 
            name="password" 
            label="Password"
            isRequired
            minLength={8}
            />

            <Button 
            type="submit" 
            variant="primary"
            marginTop="size-400"
            >
              Sign In
            </Button>
        </Form>
    </div>
  )
}

export default SignIn