import { useContext } from "react"
import { ItemsContext } from "../contexts/ItemsContent"

export const useItems = () => {
  return useContext(ItemsContext)
}