import { Link, useLocation } from "react-router-dom";
import { 
  FileText, 
  LayoutDashboard, 
  Users, 
  Building2, 
  Settings,
  PlusCircle,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const menuItems = [
  { 
    label: "Dashboard", 
    icon: LayoutDashboard, 
    href: "/admin" 
  },
  { 
    label: "Emendas", 
    icon: FileText, 
    href: "/admin/emendas" 
  },
  { 
    label: "Nova Emenda", 
    icon: PlusCircle, 
    href: "/admin/emendas/nova" 
  },
  { 
    label: "Concedentes", 
    icon: Building2, 
    href: "/admin/concedentes" 
  },
  { 
    label: "Recebedores", 
    icon: Users, 
    href: "/admin/recebedores" 
  },
  { 
    label: "Usuários", 
    icon: ClipboardList, 
    href: "/admin/usuarios" 
  },
  { 
    label: "Configurações", 
    icon: Settings, 
    href: "/admin/configuracoes" 
  },
];

export function BackofficeSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
              <FileText className="h-4 w-4 text-sidebar-primary-foreground" />
            </div>
            <span className="font-semibold text-sm">MPC-MG</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href !== "/admin" && location.pathname.startsWith(item.href));
          
          const linkContent = (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );

          if (collapsed) {
            return (
              <Tooltip key={item.href} delayDuration={0}>
                <TooltipTrigger asChild>
                  {linkContent}
                </TooltipTrigger>
                <TooltipContent side="right" className="font-medium">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          }

          return linkContent;
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-2">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                collapsed && "justify-center px-0"
              )}
            >
              <LogOut className="h-5 w-5 shrink-0" />
              {!collapsed && <span>Sair</span>}
            </Button>
          </TooltipTrigger>
          {collapsed && (
            <TooltipContent side="right" className="font-medium">
              Sair
            </TooltipContent>
          )}
        </Tooltip>
      </div>
    </aside>
  );
}
