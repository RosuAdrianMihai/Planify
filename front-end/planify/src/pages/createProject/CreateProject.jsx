import "./CreateProject.css"
import { Form, TextField, TextArea, Button } from '@adobe/react-spectrum'
import axios from "axios"
import { URL } from "../../utils/utils"
import { ToastQueue } from "@react-spectrum/toast"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addProject } from "../../store/projectSlice"

function CreateProject() {
    const [formKey, setFormKey] = useState(0)

    const dispatch = useDispatch()

    const onSubmit = async(event) => {
        event.preventDefault()

        let data = Object.fromEntries(
            new FormData(event.currentTarget)
        )
        
        try{
            const response = await axios.post(`${URL}/project`, data)

            const successMessage = response.data.message
            ToastQueue.positive(successMessage, {
                timeout: 5000
            })

            dispatch(addProject(response.data.data))

            setFormKey((prevFormKey) => prevFormKey + 1)
        }catch(error){
            console.log(error)
            const errorMessage = error.response.data.message
            ToastQueue.negative(errorMessage, {
                timeout: 5000
            })
        }
    }

  return (
    <div className="createProjectContainer">
        <h1>Project</h1>

        <Form 
        key={formKey}
        onSubmit={onSubmit}
        validationBehavior="native"
        width="size-3600"
        >
            <TextField 
            name="title"
            label="Title" 
            isRequired
            minLength={4}
            />

            <TextArea 
            name="description"
            label="Description" 
            isRequired
            minLength={20}
            />

            <Button type="submit" variant="primary">Create</Button>
        </Form>
    </div>
  )
}

export default CreateProject