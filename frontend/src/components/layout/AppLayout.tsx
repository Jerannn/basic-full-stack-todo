import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "../dashboard/AppSidebar";
import { Outlet } from "react-router-dom";
import { Input } from "../ui/input";
import { ButtonGroup } from "../ui/button-group";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full max-w-480 mx-auto">
        <header className="w-full py-4 px-5 flex items-center">
          <SidebarTrigger />

          <div className="flex-1 flex justify-center">
            <ButtonGroup className="w-full max-w-md">
              <Input placeholder="Search" />
              <Button variant="outline" aria-label="Search">
                <SearchIcon />
              </Button>
            </ButtonGroup>
          </div>
        </header>
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
