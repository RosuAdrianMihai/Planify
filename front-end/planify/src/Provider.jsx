import { RouterProvider } from "react-router-dom"
import appRouter from './router/router.jsx'
import { Provider as ReduxProvider } from "react-redux"
import { store } from "./store/store.js"
import { Provider as SpectrumProvider, defaultTheme } from "@adobe/react-spectrum"

function Provider({ children }) {
  return (
    <SpectrumProvider theme={defaultTheme} colorScheme="dark">
      <ReduxProvider store={store}>
        <RouterProvider router={appRouter}>
                {children}
        </RouterProvider>
      </ReduxProvider>
    </SpectrumProvider>
  )
}

export default Provider