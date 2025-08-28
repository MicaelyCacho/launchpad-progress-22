import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/components/ui/auth-provider";
import { LoginForm } from "@/components/auth/LoginForm";
import { PasswordReset } from "@/components/auth/PasswordReset";
import { Header } from "@/components/layout/Header";
import { Landing } from "@/pages/Landing";
import { StudentDashboard } from "@/pages/student/StudentDashboard";
import { StudentRoomDashboard } from "@/pages/student/StudentRoomDashboard";
import { TeacherDashboard } from "@/pages/teacher/TeacherDashboard";
import { RoomDashboard } from "@/pages/teacher/RoomDashboard";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";
import { useState } from "react";

const queryClient = new QueryClient();

const TeacherRoomRoute = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <LoginForm onForgotPassword={() => {}} />;
  }
  
  if (user.role !== 'teacher') {
    return <div>Acesso negado. Apenas professores podem acessar salas virtuais.</div>;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <RoomDashboard />
    </div>
  );
};

const StudentRoomRoute = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <LoginForm onForgotPassword={() => {}} />;
  }
  
  if (user.role !== 'student') {
    return <div>Acesso negado. Apenas alunos podem acessar esta sala.</div>;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <StudentRoomDashboard />
    </div>
  );
};

const AppContent = () => {
  const { user } = useAuth();
  const [showLanding, setShowLanding] = useState(true);
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  if (!user && showLanding) {
    return <Landing onGetStarted={() => setShowLanding(false)} />;
  }

  if (!user && showPasswordReset) {
    return <PasswordReset onBackToLogin={() => setShowPasswordReset(false)} />;
  }

  if (!user) {
    return <LoginForm onForgotPassword={() => setShowPasswordReset(true)} />;
  }

  const getDashboard = () => {
    switch (user.role) {
      case 'student':
        return <StudentDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <div>Tipo de usuário não reconhecido</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {getDashboard()}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppContent />} />
            <Route path="/sala/:roomId" element={<TeacherRoomRoute />} />
            <Route path="/aluno/sala/:roomId" element={<StudentRoomRoute />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
