import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardOverview } from '@/components/admin/DashboardOverview';
import { Cadastramento } from '@/components/admin/Cadastramento';
import { CriarSalas } from '@/components/admin/CriarSalas';
import { SalasVirtualAdmin } from '@/components/admin/SalasVirtualAdmin';
import { ListarAlunos } from '@/components/admin/ListarAlunos';

export const AdminDashboard: React.FC = () => {

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-3 sm:p-6">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 mb-4 sm:mb-6 h-auto">
            <TabsTrigger value="dashboard" className="text-xs sm:text-sm p-2 sm:p-3">Dashboard</TabsTrigger>
            <TabsTrigger value="cadastramento" className="text-xs sm:text-sm p-2 sm:p-3">Cadastramento</TabsTrigger>
            <TabsTrigger value="criar-salas" className="text-xs sm:text-sm p-2 sm:p-3">Criar Salas</TabsTrigger>
            <TabsTrigger value="salas-virtuais" className="text-xs sm:text-sm p-2 sm:p-3">Salas Virtuais</TabsTrigger>
            <TabsTrigger value="listar-alunos" className="text-xs sm:text-sm p-2 sm:p-3">Listar Alunos</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="cadastramento">
            <Cadastramento />
          </TabsContent>

          <TabsContent value="criar-salas">
            <CriarSalas />
          </TabsContent>

          <TabsContent value="salas-virtuais">
            <SalasVirtualAdmin />
          </TabsContent>

          <TabsContent value="listar-alunos">
            <ListarAlunos />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};