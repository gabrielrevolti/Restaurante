import { createContext } from "react"


export const ItemsContext = createContext({})

export const ItemsContextProvider = ({children}) => {


  
  const consoleLog = () => {
    console.log("Está funcionando")
  }

  const Items = {
    consoleLog
  }
  return (
    <ItemsContext.Provider value={Items}>
      {children}
    </ItemsContext.Provider>
    ) 
}