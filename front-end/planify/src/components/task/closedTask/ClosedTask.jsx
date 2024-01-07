import { Heading, Divider, Content } from "@adobe/react-spectrum"
import capitalize from "../../../utils/capitalize"

function ClosedTask({ taskData }) {
  return (
    <>
        <Heading>Task info - {capitalize(taskData.status)}</Heading>

        <Divider />

        <Content>
            <p>Title: {taskData.title}</p>

            <p>Completed by: {taskData.assignedUser.name}</p>

            <p>Description: {taskData.description}</p>
        </Content>
    </>
  )
}

export default ClosedTask