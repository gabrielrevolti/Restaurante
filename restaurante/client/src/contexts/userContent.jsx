import { createContext, useEffect, useState } from "react"
import httpClient from "../hooks/httpClient"

export const UserContext = createContext({})

export const UserContextProvider = ({children}) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
    const response = await httpClient.get("//localhost:5000/userinfo");

    if (response.data.error) {
      setUser(null)
    } else {
      setUser(response.data)
    }
    };
    getUser();
  }, [])


  const info = {
    user: user,
  }

  return (
    <UserContext.Provider value={info}>
      {children}
    </UserContext.Provider>
    ) 
}