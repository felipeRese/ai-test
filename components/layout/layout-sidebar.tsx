import { MessageSquare, PanelLeft, Plus } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator, SidebarTrigger, useSidebar } from "../ui/sidebar";
import { cn } from "@/lib/utils";

export default function LayoutSidebar() {
  const {open} = useSidebar()
  return (
    <Sidebar >
      <SidebarHeader className="flex flex-row justify-between items-center">
        <p className={cn("bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-900 font-black text-lg", !open && "hidden")}>AI Chat</p>
        <SidebarTrigger className={cn(!open && "hidden")}>
          <PanelLeft />
        </SidebarTrigger>
      </SidebarHeader>

      <div className="flex flex-col w-full my-3 px-2">
        <SidebarSeparator />
      </div>


      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem className="p-2">
            <SidebarMenuButton className="cursor-pointer">
                <Plus />
                <p className="text-lg">New</p>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarMenu>
          <SidebarMenuItem className="p-1">
            <SidebarMenuButton className="cursor-pointer">
              <MessageSquare />
              Chat
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

      </SidebarContent>

        <SidebarTrigger className={cn("flex mx-auto justify-center items-center", open && "hidden")}>
          <PanelLeft />
        </SidebarTrigger>
      <SidebarFooter />
    </Sidebar>
  )
}
