import "./CreateUser.css"
import { useState } from "react"
import { Button, Form, TextField } from "@adobe/react-spectrum"
import axios from "axios"
import { URL } from "../../utils/utils"
import { useDispatch } from "react-redux"
import { addUser } from "../../store/userSlice"
import { ToastQueue } from "@react-spectrum/toast"

function CreateUser() {
  const [formKey, setFormKey] = useState(0)

  const dispatch = useDispatch()

  const onSubmit = async(event) => {
    event.preventDefault()

    let data = Object.fromEntries(new FormData(event.currentTarget))

    if(!data.position){
      ToastQueue.negative("Select a position to create the account", {
        timeout: 5000
      })

      return
    }

    let message = ""
    let toastType = ""

    try{
      const response = await axios.post(`${URL}/user`, data)
      const { data: createdUser } = response.data
      dispatch(addUser(createdUser))

      message = response.data.message
      toastType = "positive"

      setFormKey((prevFormKey) => prevFormKey + 1)
    }catch(error){
      console.log(error)
      message = error.response.data.message
      toastType = "negative"
    }finally{
      ToastQueue[toastType](message, {
        timeout: 5000
      })
    }
  }

  return (
    <div className="createAccountContainer">
        <h1 className="createAccountHeader">Create account</h1>

        <Form 
        key={formKey}
        onSubmit={onSubmit}
        validationBehavior="native"
        width="size-3600"
        >
            <TextField 
            name="name"
            label="Name"
            type="text"
            isRequired
            minLength={6}
            />

            <select 
            name="position"
            className="selectPosition"
            >
              <option selected disabled>Select role</option>

              <option value="manager">Manager</option>
              <option value="member">Member</option>
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
            <Button variant="primary" type="submit">Create</Button>
        </Form>
        
    </div>
  )
}

export default CreateUser