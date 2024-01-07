import "./Task.css"
import { ActionButton, DialogTrigger, Dialog } from "@adobe/react-spectrum"
import { BookOpenIcon } from "@heroicons/react/24/outline"
import OpenTask from "./openTask/OpenTask"
import PendingTask from "./pendingTask/PendingTask"
import CompletedTask from "./completedTask/CompletedTask"
import ClosedTask from "./closedTask/ClosedTask"

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

                    {taskData.status == "PENDING" && <PendingTask taskData={taskData} user={user} close={close} />}

                    {taskData.status == "COMPLETED" && <CompletedTask taskData={taskData} user={user} manager={manager} close={close} />}

                    {taskData.status == "CLOSED" &&
                    <ClosedTask taskData={taskData} />}
                </Dialog>
            )}
        </DialogTrigger>
    </div>
  )
}

export default Task