import { createBrowserRouter } from "react-router-dom";

import Index from "./pages/home";
import Cart from "./pages/cart/cart";
import Login from "./pages/enter/login";
import Register from "./pages/enter/register";
import User from "./pages/user/User";
import Payment from "./pages/cart/payment/payment";

const router = createBrowserRouter([
  {path: "/", element: <Index/>},
  {path: 'login', element: <Login/>},
  {path: 'login/register', element: <Register/>},
  {path: "cart", element: <Cart/>},
  {path: "cart/payment", element: <Payment/>},
  {path: "user", element: <User/>}
])

export default router;