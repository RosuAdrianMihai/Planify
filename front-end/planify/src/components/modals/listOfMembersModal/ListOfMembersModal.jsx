import "./ListOfMembersModal.css"
import { DialogTrigger, ActionButton, Dialog, Heading, Divider, Content } from "@adobe/react-spectrum"
import { UserGroupIcon } from "@heroicons/react/24/outline"
import { Link, useParams } from "react-router-dom"

function ListOfMembersModal({ members }) {
  const { project_id } = useParams()

  return (
    <DialogTrigger>
        <ActionButton aria-label="view members" marginTop={5} marginStart={5}>
            <UserGroupIcon />
        </ActionButton>

        <Dialog isDismissable>
            <Heading>View members</Heading>

            <Divider />

            <Content>
                {members.map((member) => {
                    return <div className="projectMemberContainer">
                        <p>{member.name}</p>
                        <Link to={`/user/${member.id}/${project_id}/tasks`}>View tasks</Link>
                    </div>
                })}
            </Content>
        </Dialog>
    </DialogTrigger>
  )
}

export default ListOfMembersModal