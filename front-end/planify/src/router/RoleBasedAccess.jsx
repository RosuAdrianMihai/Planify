import { useSelector } from "react-redux"
import Sidebar from "../components/navigation/Sidebar"
import { Outlet } from "react-router-dom"
import NoAccess from "./NoAccess"

function RoleBasedAccess({ roles }) {
    const { user } = useSelector((state) => state.users)

    if(user && roles.includes(user.position)){
        return (
            <Sidebar user={user}>
                <Outlet />
            </Sidebar>
        )
    }else{
        return <NoAccess />
    }
}

export default RoleBasedAccess