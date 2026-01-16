import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";

// Public Pages
import PublicHome from "./pages/public/PublicHome";
import ConsultaEmendas from "./pages/public/ConsultaEmendas";
import DetalheEmenda from "./pages/public/DetalheEmenda";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import NovaEmenda from "./pages/admin/NovaEmenda";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicHome />} />
          <Route path="/consulta" element={<ConsultaEmendas />} />
          <Route path="/consulta/:id" element={<DetalheEmenda />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/emendas/nova" element={<NovaEmenda />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
