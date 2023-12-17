import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import NoAccess from "./NoAccess"

function RoleBasedAccess({ roles }) {
    const user = useSelector((state) => state.user)
  
    console.log(user)

    if(user && roles.includes(user.position)){
        return (
            <Outlet />
        )
    }else{
        return <NoAccess />
    }
}

export default RoleBasedAccess