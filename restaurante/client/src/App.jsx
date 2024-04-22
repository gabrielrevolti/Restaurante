import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ItemsContextProvider } from "./contexts/ItemsContent";

const App = () => {
  return (
    <ItemsContextProvider>
      <RouterProvider router={router}/>
    </ItemsContextProvider>
    
  )
}

export default App;