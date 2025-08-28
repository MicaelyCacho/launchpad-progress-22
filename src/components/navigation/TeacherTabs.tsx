import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Eye, 
  Edit3, 
  Trash2,
  Upload
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const TeacherTabs: React.FC = () => {

  // Mock data ajustado para escala de 1000 pontos
  const classStats = [
    { turma: 'Turma A', media: 850, alunos: 25 },
    { turma: 'Turma B', media: 780, alunos: 22 },
    { turma: 'Turma C', media: 820, alunos: 28 },
  ];

  const competencyStats = [
    { competencia: 'Argumentação', turmaA: 170, turmaB: 156, turmaC: 164 },
    { competencia: 'Coesão', turmaA: 160, turmaB: 150, turmaC: 158 },
    { competencia: 'Gramática', turmaA: 176, turmaB: 164, turmaC: 170 },
    { competencia: 'Repertório', turmaA: 164, turmaB: 152, turmaC: 160 },
    { competencia: 'Proposta', turmaA: 172, turmaB: 160, turmaC: 166 }
  ];

  const monthlyProgress = [
    { mes: 'Jan', turmaA: 750, turmaB: 700, turmaC: 720 },
    { mes: 'Fev', turmaA: 780, turmaB: 730, turmaC: 750 },
    { mes: 'Mar', turmaA: 820, turmaB: 750, turmaC: 780 },
    { mes: 'Abr', turmaA: 850, turmaB: 780, turmaC: 820 },
  ];

  const themeDistribution = [
    { name: 'Tecnologia', value: 30, color: 'hsl(var(--launch-wine-dark))' },
    { name: 'Meio Ambiente', value: 25, color: 'hsl(var(--launch-green-gray))' },
    { name: 'Sociedade', value: 20, color: 'hsl(var(--launch-red-dark))' },
    { name: 'Educação', value: 15, color: 'hsl(var(--launch-beige-yellow))' },
    { name: 'Outros', value: 10, color: 'hsl(var(--launch-beige-light))' }
  ];


  const myContents = [
    { 
      titulo: 'Técnicas de Argumentação', 
      tipo: 'Vídeo', 
      turmas: ['Turma A', 'Turma B'], 
      criado: '2024-07-20',
      visualizacoes: 45
    },
    { 
      titulo: 'Estrutura da Redação ENEM', 
      tipo: 'PDF', 
      turmas: ['Turma A'], 
      criado: '2024-07-15',
      visualizacoes: 32
    },
    { 
      titulo: 'Coesão e Coerência', 
      tipo: 'Apresentação', 
      turmas: ['Turma B', 'Turma C'], 
      criado: '2024-07-10',
      visualizacoes: 28
    }
  ];

  const averageTotal = classStats.reduce((sum, cls) => sum + cls.media, 0) / classStats.length;

  return (
    <div className="container mx-auto p-3 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-yeseva text-primary">Dashboard do Professor</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Gerencie suas turmas e conteúdos</p>
        </div>
        <Button className="bg-primary hover:bg-accent w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Nova Atividade
        </Button>
      </div>

      <Tabs defaultValue="notas" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-4 sm:mb-6 h-auto bg-launch-beige-light">
          <TabsTrigger value="notas" className="text-xs sm:text-sm p-2 sm:p-3">Notas por Turma</TabsTrigger>
          <TabsTrigger value="conteudos" className="text-xs sm:text-sm p-2 sm:p-3">Conteúdos</TabsTrigger>
          <TabsTrigger value="salas" className="text-xs sm:text-sm p-2 sm:p-3">Sala Virtual</TabsTrigger>
        </TabsList>

        {/* Aba de Notas por Turma */}
        <TabsContent value="notas" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de Competências */}
            <Card className="border-launch-beige-light">
              <CardHeader>
                <CardTitle className="font-yeseva text-primary">Notas por Competência</CardTitle>
                <CardDescription>Desempenho detalhado por turma (máx. 200 pontos cada)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={competencyStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="competencia" />
                    <YAxis domain={[0, 200]} />
                    <Tooltip />
                    <Bar dataKey="turmaA" fill="hsl(var(--launch-wine-dark))" name="Turma A" />
                    <Bar dataKey="turmaB" fill="hsl(var(--launch-red-dark))" name="Turma B" />
                    <Bar dataKey="turmaC" fill="hsl(var(--launch-green-gray))" name="Turma C" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Evolução Temporal */}
            <Card className="border-launch-beige-light">
              <CardHeader>
                <CardTitle className="font-yeseva text-primary">Evolução das Turmas</CardTitle>
                <CardDescription>Progresso mensal por turma (máx. 1000 pontos)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis domain={[0, 1000]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="turmaA" stroke="hsl(var(--launch-wine-dark))" strokeWidth={2} />
                    <Line type="monotone" dataKey="turmaB" stroke="hsl(var(--launch-red-dark))" strokeWidth={2} />
                    <Line type="monotone" dataKey="turmaC" stroke="hsl(var(--launch-green-gray))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Distribuição de Temas */}
          <Card className="border-launch-beige-light">
            <CardHeader>
              <CardTitle className="font-yeseva text-primary">Distribuição de Temas Trabalhados</CardTitle>
              <CardDescription>Análise dos temas mais abordados nas redações</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={themeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {themeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba de Gerenciar Conteúdos */}
        <TabsContent value="conteudos" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-yeseva text-primary">Meus Conteúdos</h2>
            <Button className="bg-primary hover:bg-accent">
              <Upload className="h-4 w-4 mr-2" />
              Adicionar Conteúdo
            </Button>
          </div>

          <div className="grid gap-4">
            {myContents.map((content, index) => (
              <Card key={index} className="border-launch-beige-light">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary">{content.titulo}</h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                        <span>Tipo: {content.tipo}</span>
                        <span>Criado: {content.criado}</span>
                        <span>{content.visualizacoes} visualizações</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {content.turmas.map((turma, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {turma}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Aba de Salas Virtuais */}
        <TabsContent value="salas" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-yeseva text-primary">Minhas Salas Virtuais</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sala A */}
            <Card className="border-launch-beige-light">
              <CardHeader>
                <CardTitle className="font-yeseva text-primary">Sala A</CardTitle>
                <CardDescription>25 alunos matriculados</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full bg-primary hover:bg-accent"
                  onClick={() => window.location.href = '/sala/A'}
                >
                  Entrar na Sala
                </Button>
              </CardContent>
            </Card>

            {/* Sala B */}
            <Card className="border-launch-beige-light">
              <CardHeader>
                <CardTitle className="font-yeseva text-primary">Sala B</CardTitle>
                <CardDescription>22 alunos matriculados</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full bg-primary hover:bg-accent"
                  onClick={() => window.location.href = '/sala/B'}
                >
                  Entrar na Sala
                </Button>
              </CardContent>
            </Card>

            {/* Sala C */}
            <Card className="border-launch-beige-light">
              <CardHeader>
                <CardTitle className="font-yeseva text-primary">Sala C</CardTitle>
                <CardDescription>28 alunos matriculados</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full bg-primary hover:bg-accent"
                  onClick={() => window.location.href = '/sala/C'}
                >
                  Entrar na Sala
                </Button>
              </CardContent>
            </Card>
          </div>

        </TabsContent>

      </Tabs>
    </div>
  );
};