import "./App.css"
import { Provider } from "react-redux"
import { setupAxiosInstance } from "@/utils/axios-instance"
import { store } from "@/redux/store"
import { EntryPoint } from "@/features/entry-point"
import { Toaster } from "@/components/ui/toaster"

function App() {
  setupAxiosInstance(store)
  return (
    <Provider store={store}>
      <EntryPoint />
      <Toaster />
    </Provider>
  )
}

export default App
