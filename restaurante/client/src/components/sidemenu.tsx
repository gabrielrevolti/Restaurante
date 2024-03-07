import { Home } from "lucide-react";
import { Button } from "./ui/button";
import { SheetHeader, SheetTitle } from "./ui/sheet";

const SideMenu = () => {
  return ( 
    <>
    <SheetHeader className="text-left border-b border-solid border-secondary p-5">
        <SheetTitle>Menu</SheetTitle>
    </SheetHeader>

    <div className="flex flex-col gap-3 px-5 mt-3">
      <Button variant="outline" className="justify-start" asChild>
        <a href="/">
          <Home size={18} className="mr-2"/>
            Home
        </a>
      </Button>
    </div>

    <div className="flex flex-col gap-3 px-5 mt-3">
      <Button variant="outline" className="justify-start" asChild>
        <a href="/register">
          <Home size={18} className="mr-2"/>
            Cadastro de produtos
        </a>
      </Button>
    </div>
    </>
   );
}
 
export default SideMenu;