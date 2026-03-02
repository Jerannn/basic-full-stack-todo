// hooks
import { NavLink } from "react-router-dom";
import { useState } from "react";

// icons
import {
  Brackets,
  ChevronsRight,
  ListTodo,
  StickyNote,
  User2,
} from "lucide-react";

// shadcn ui
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

const menu = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: ChevronsRight,
  },
  {
    name: "Today",
    url: "/projects",
    icon: ListTodo,
  },

  {
    name: "Sticky Wall",
    url: "/projects",
    icon: StickyNote,
  },
];

export default function AppSidebar() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenuButton className="cursor-pointer">
          <Brackets /> <span className="">Listiq</span>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tasks</SidebarGroupLabel>
          <SidebarMenu>
            {menu.map((project) => (
              <SidebarMenuItem
                key={project.name}
                onClick={() => setActiveMenu(project.name)}
              >
                <SidebarMenuButton
                  asChild
                  isActive={activeMenu === project.name}
                >
                  <NavLink to={project.url}>
                    <project.icon />
                    <span>{project.name}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <User2 /> Username
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
