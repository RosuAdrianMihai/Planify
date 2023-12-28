import "./Task.css"
import { ActionButton, DialogTrigger, Dialog } from "@adobe/react-spectrum"
import { BookOpenIcon } from "@heroicons/react/24/outline"
import OpenTask from "./openTask/OpenTask"

function Task({ taskData, user, manager, members }) {
  return (
    <div className="taskContainer">
        <DialogTrigger>
            <div className="taskHighlight">
                <ActionButton>{taskData.title.length > 15 ? `${taskData.title.slice(0, 15)}...` : taskData.title} <BookOpenIcon height={25} style={{
                    marginLeft: "10px"
                }} /></ActionButton>
            </div>

            {(close) => (
                <Dialog isDismissable>
                    {taskData.status == "OPEN" && <OpenTask taskData={taskData} user={user} manager={manager} members={members} close={close} />}
                </Dialog>
            )}
        </DialogTrigger>
    </div>
  )
}

export default Task