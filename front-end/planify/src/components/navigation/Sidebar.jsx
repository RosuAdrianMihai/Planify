import "./Sidebar.css"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { Bars4Icon, XMarkIcon } from "@heroicons/react/24/solid"
import { Button } from "@adobe/react-spectrum"
import { clearUser } from "../../store/userSlice"

function Sidebar({ children, user }) {
  const { position: role } = user

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if(window.innerWidth >= 800){
        setIsSidebarOpen(true)
    }else{
        setIsSidebarOpen(false)
    }
  }, [window.innerWidth])

  return (
    <div className="sidebarContainer">
        {isSidebarOpen ?
         <XMarkIcon onClick={() => setIsSidebarOpen(false)} height={35} className="icon" /> 
         : 
         <Bars4Icon onClick={() => setIsSidebarOpen(true)} height={35} className="icon" />
         }

        <nav className="navContainer" style={{
            left: isSidebarOpen ? "0%" : "-100%"
        }}>
            <Link to={`/common/${user.id}`}>Projects</Link>

            {role === "admin" && 
            <>
                <Link to="/admin/create-project">Create project</Link>
                <Link to="/admin/add-user">Create user</Link>
            </>}

            {(role === "manager" || role === "executant") && 
            <>
                <Link to={`/common/${user.id}/tasks`}>Tasks</Link>
            </>
            }

            <Button 
            variant="primary"
            position="absolute" 
            bottom="size-300"
            onPress={() => {
                navigate("/")
                dispatch(clearUser())
            }} 
            >Logout
            </Button>
        </nav>

        <div className="pageContainer">
            {children}
        </div>
    </div>
  )
}

export default Sidebar