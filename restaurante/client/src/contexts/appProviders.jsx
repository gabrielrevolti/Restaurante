import AdressContextProvider from "./addressContent";
import { ItemsContextProvider } from "./ItemsContent";
import { UserContextProvider } from "./userContent";



const AppProviders = ({ children }) => {
  return (
    <UserContextProvider>
      <ItemsContextProvider>
        <AdressContextProvider>
          {children}
        </AdressContextProvider>
      </ItemsContextProvider>
    </UserContextProvider>
  );
};

export default AppProviders;
