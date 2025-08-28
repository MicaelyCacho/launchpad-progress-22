import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Rocket, BookOpen, Users, BarChart3 } from 'lucide-react';

interface LandingProps {
  onGetStarted: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-launch-beige-light to-background py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center items-center space-x-3 mb-6">
            <Rocket className="h-12 w-12 text-primary animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-yeseva text-primary">Launch</h1>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Sua redação vai longe! 🚀
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Plataforma educacional moderna com funcionalidades específicas para cada perfil de usuário.
            Desenvolvida para potencializar o aprendizado e facilitar o ensino.
          </p>
          
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-primary hover:bg-accent text-white px-8 py-3 text-lg transition-launch"
          >
            Começar Agora
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-yeseva text-center mb-12 text-primary">
            Funcionalidades por Perfil
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Aluno */}
            <Card className="border-launch-beige-light hover:shadow-lg transition-launch">
              <CardContent className="p-6 text-center">
                <BookOpen className="h-12 w-12 text-launch-green-gray mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-3 text-primary">🎓 Aluno</h4>
                <ul className="text-muted-foreground space-y-2 text-left">
                  <li>• Dashboard com progresso</li>
                  <li>• Minhas Salas virtuais</li>
                  <li>• Atividades pendentes</li>
                  <li>• Acompanhamento de notas</li>
                  <li>• Agenda de eventos</li>
                </ul>
              </CardContent>
            </Card>

            {/* Professor */}
            <Card className="border-launch-beige-light hover:shadow-lg transition-launch">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-launch-red-dark mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-3 text-primary">👨‍🏫 Professor</h4>
                <ul className="text-muted-foreground space-y-2 text-left">
                  <li>• Estatísticas das turmas</li>
                  <li>• Gerenciar conteúdos</li>
                  <li>• Solicitações de alunos</li>
                  <li>• Notas detalhadas</li>
                  <li>• Criar novas salas</li>
                </ul>
              </CardContent>
            </Card>

            {/* Administrador */}
            <Card className="border-launch-beige-light hover:shadow-lg transition-launch">
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-12 w-12 text-launch-beige-yellow mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-3 text-primary">👨‍💼 Administrador</h4>
                <ul className="text-muted-foreground space-y-2 text-left">
                  <li>• Visão geral do sistema</li>
                  <li>• Lista de todas as salas</li>
                  <li>• Métricas de performance</li>
                  <li>• Relatórios gerais</li>
                  <li>• Análises estatísticas</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 bg-launch-beige-light">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-yeseva mb-8 text-primary">
            Tecnologias Modernas
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-muted-foreground">
            <span className="bg-background px-4 py-2 rounded-lg border">React + TypeScript</span>
            <span className="bg-background px-4 py-2 rounded-lg border">Tailwind CSS</span>
            <span className="bg-background px-4 py-2 rounded-lg border">Shadcn/ui</span>
            <span className="bg-background px-4 py-2 rounded-lg border">Recharts</span>
            <span className="bg-background px-4 py-2 rounded-lg border">Vite</span>
          </div>
        </div>
      </section>
    </div>
  );
};