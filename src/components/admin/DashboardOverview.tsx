import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, GraduationCap, School, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data
const stats = [
  {
    title: 'Quantidade de Salas',
    value: '12',
    icon: School,
    change: '+2 este mês'
  },
  {
    title: 'Professores Cadastrados',
    value: '8',
    icon: GraduationCap,
    change: '+1 este mês'
  },
  {
    title: 'Alunos Cadastrados',
    value: '145',
    icon: Users,
    change: '+23 este mês'
  },
  {
    title: 'Taxa de Crescimento',
    value: '18.7%',
    icon: TrendingUp,
    change: '+5.2% vs. mês anterior'
  }
];

const mediaPorTurma = [
  { turma: 'Turma A', media: 8.5 },
  { turma: 'Turma B', media: 7.8 },
  { turma: 'Turma C', media: 9.2 },
  { turma: 'Turma D', media: 7.3 },
  { turma: 'Turma E', media: 8.9 }
];

export const DashboardOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral da instituição</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="max-w-4xl">
        {/* Bar Chart */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Média por Turma</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mediaPorTurma}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="turma" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="media" fill="hsl(var(--launch-wine-dark))" name="Média da Turma" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};