import "./SignIn.css"
import { useRef, useState } from "react"
import { Form, TextField, Button } from '@adobe/react-spectrum'
import axios from "axios"
import { URL } from "../../utils/utils.js"
import { useDispatch } from "react-redux"
import { setUser } from "../../store/userSlice.js"
import { useNavigate } from "react-router-dom"
import { ToastQueue } from "@react-spectrum/toast"

function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  let errors = useRef({
    email: "",
    password: ""
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const validateInputField = (value, inputKey) => {
    if(value.length === 0){
      errors.current[inputKey] = `Field ${inputKey} is required`

      if(inputKey === "email"){
        setEmail(value)
      }else{
        setPassword(value)
      }

      return
    }
    
    switch(inputKey){
      case "email":
        setEmail(value)

        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        
        if(!validEmail){
          errors.current.email = "Invalid email"
        }else{
          errors.current.email = ""
        }
        break

      case "password":
        setPassword(value)

        if(value.length < 8){
          errors.current.password = "Password must be at least 8 characters long"
        }else{
          errors.current.password = ""
        }
    }
  }

  const onSubmit = async function(event){      
    event.preventDefault()

    if(email.length === 0 || password.length === 0){
      ToastQueue.negative("Incomplete credentials", {
        timeout: 5000
      })

      return
    }

    let data = Object.fromEntries(
      new FormData(event.currentTarget)
    )

    try{
      const response = await axios.post(`${URL}/user/signIn`, data)
      const user = response.data

      dispatch(setUser(user))
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
        width="size-3600"
        >
            <TextField 
            type="email" 
            name="email" 
            label="Email" 
            value={email}
            onChange={(emailValue) => validateInputField(emailValue, "email")}
            isInvalid={!!errors.current.email}
            errorMessage={errors.current.email}
            />

            <TextField 
            type="password" 
            name="password" 
            label="Password"
            value={password}
            onChange={(passwordValue) => validateInputField(passwordValue, "password")} 
            isInvalid={!!errors.current.password}
            errorMessage={errors.current.password}
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