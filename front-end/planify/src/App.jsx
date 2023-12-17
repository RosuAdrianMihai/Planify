import './App.css'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from "@react-spectrum/toast"

function App() {
  return (
    <div className="appContainer">
      <ToastContainer />

      <Outlet />
    </div>
  )
}

export default App
