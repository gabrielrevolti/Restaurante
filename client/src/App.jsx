import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ItemsContextProvider } from "./contexts/ItemsContent";
import AppProviders from "./contexts/appProviders";

const App = () => {
  return (
    <AppProviders>
      <RouterProvider router={router}/>
    </AppProviders>
  )
}

export default App;