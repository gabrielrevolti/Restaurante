import { useContext } from "react"
import { UserContext } from "../contexts/userContent"

export const useUser = () => {
  return useContext(UserContext)
}