import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { seedMockData } from "./data/mockEmendas";

// Public Pages
import PublicHome from "./pages/public/PublicHome";
import ConsultaEmendas from "./pages/public/ConsultaEmendas";
import DetalheEmenda from "./pages/public/DetalheEmenda";
import Metodologia from "./pages/public/Metodologia";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import NovaEmenda from "./pages/admin/NovaEmenda";
import ListaEmendas from "./pages/admin/ListaEmendas";
import Concedentes from "./pages/admin/Concedentes";
import Recebedores from "./pages/admin/Recebedores";
import Usuarios from "./pages/admin/Usuarios";
import Configuracoes from "./pages/admin/Configuracoes";

const queryClient = new QueryClient();

const App = () => {
  // Seed mock data on first load
  useEffect(() => {
    seedMockData();
  }, []);

  return (
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
            <Route path="/detalhe/:id" element={<Navigate to="/consulta/:id" replace />} />
            <Route path="/metodologia" element={<Metodologia />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/emendas" element={<ListaEmendas />} />
            <Route path="/admin/emendas/nova" element={<NovaEmenda />} />
            <Route path="/admin/concedentes" element={<Concedentes />} />
            <Route path="/admin/recebedores" element={<Recebedores />} />
            <Route path="/admin/usuarios" element={<Usuarios />} />
            <Route path="/admin/configuracoes" element={<Configuracoes />} />
            <Route path="/cadastro" element={<Navigate to="/admin/emendas/nova" replace />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
