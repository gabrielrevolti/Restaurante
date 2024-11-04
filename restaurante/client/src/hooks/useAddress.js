import { useContext } from "react"
import { AddressContext } from "../contexts/addressContent"

export const useAddress = () => {
  return useContext(AddressContext)
}