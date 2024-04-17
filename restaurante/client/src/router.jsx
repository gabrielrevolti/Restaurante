import { createBrowserRouter } from "react-router-dom";

import Index from "./pages/home";
import RegisterProduct from "./pages/register";
import UpdateItem from "./pages/update";

const router = createBrowserRouter([
  {path: "/", element: <Index/>},
  {path: "register", element: <RegisterProduct/>},
  {path: "update/:id", element: <UpdateItem/>}
])

export default router;