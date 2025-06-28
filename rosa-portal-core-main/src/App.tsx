
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AppLayout } from "./components/layout/AppLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import K8sOperation from "./pages/K8sOperation";
import Users from "./pages/Users";
import RoleManagement from "./pages/RoleManagement";
import UserSearch from "./pages/UserSearch";
import FeeConfiguration from "./pages/FeeConfiguration";
import UserManagement from "./pages/UserManagement";
import Settings from "./pages/Settings";
import CoreCustomerMoMo from "./pages/CoreCustomerMoMo";
import CoreCustomerPayLater from "./pages/CoreCustomerPayLater";
import CoreCustomerNewton from "./pages/CoreCustomerNewton";
import CoreCustomerInvest from "./pages/CoreCustomerInvest";
import CoreErrorDescription from "./pages/CoreErrorDescription";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="k8s-operation" element={<K8sOperation />} />
                <Route path="role-management" element={<RoleManagement />} />
                <Route path="user-search" element={<UserSearch />} />
                <Route path="fee-configuration" element={<FeeConfiguration />} />
                <Route path="user-management" element={<UserManagement />} />
                <Route path="settings" element={<Settings />} />
                <Route path="core-customer/momo" element={<CoreCustomerMoMo />} />
                <Route path="core-customer/paylater" element={<CoreCustomerPayLater />} />
                <Route path="core-customer/newton" element={<CoreCustomerNewton />} />
                <Route path="core-customer/invest" element={<CoreCustomerInvest />} />
                <Route path="core-manager/error-description" element={<CoreErrorDescription />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
