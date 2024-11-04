import AdressContextProvider from "./addressContent";
import { ItemsContextProvider } from "./ItemsContent";



const AppProviders = ({ children }) => {
  return (
    <ItemsContextProvider>
      <AdressContextProvider>
        {children}
      </AdressContextProvider>
    </ItemsContextProvider>
  );
};

export default AppProviders;
