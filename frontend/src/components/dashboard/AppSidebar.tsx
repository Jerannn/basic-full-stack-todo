// hooks
import { NavLink, useLocation } from "react-router-dom";

// icons
import {
  Brackets,
  Calendar1,
  CalendarClock,
  CalendarDays,
  ChevronsRight,
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
    url: "/today",
    icon: Calendar1,
  },
  {
    name: "Tomorrow",
    url: "/tomorrow",
    icon: CalendarClock,
  },
  {
    name: "Week",
    url: "/week",
    icon: CalendarDays,
  },
];

export default function AppSidebar() {
  const location = useLocation();
  const activeMenu = location.pathname;

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
              <SidebarMenuItem key={project.name}>
                <SidebarMenuButton
                  asChild
                  isActive={activeMenu === project.url}
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
