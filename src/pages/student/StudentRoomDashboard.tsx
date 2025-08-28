import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, BookOpen, FileText, Calendar, Download } from 'lucide-react';

export const StudentRoomDashboard: React.FC = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app this would come from API based on roomId
  const roomData = {
    name: 'Redação ENEM 2024',
    teacher: 'Prof. Maria Santos',
    description: 'Preparação completa para redação do ENEM com foco nas 5 competências avaliadas'
  };

  const teacherContents = [
    {
      id: 1,
      title: 'Estrutura da Redação ENEM',
      type: 'material',
      description: 'Guia completo sobre a estrutura dissertativo-argumentativa',
      date: '2024-08-01',
      category: 'Teoria'
    },
    {
      id: 2,
      title: 'Exercícios de Coesão Textual',
      type: 'assignment',
      description: 'Atividades práticas para melhorar conectivos e coesão',
      date: '2024-08-05',
      category: 'Teoria',
      deadline: '2024-08-15'
    },
    {
      id: 3,
      title: 'Repertório Cultural - Como Usar',
      type: 'video',
      description: 'Aula gravada sobre como incorporar repertório cultural',
      date: '2024-08-03',
      category: 'Teoria'
    },
    {
      id: 4,
      title: 'Tecnologia na Educação',
      type: 'assignment',
      description: 'Tema de redação sobre o impacto da tecnologia na educação',
      date: '2024-08-07',
      category: 'Tema de redação',
      deadline: '2024-08-20'
    },
    {
      id: 5,
      title: 'Correção Comentada',
      type: 'material',
      description: 'Exemplo de redação 1000 com correção detalhada',
      date: '2024-08-02',
      category: 'Teoria'
    }
  ];

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'material':
        return <FileText className="h-4 w-4" />;
      case 'assignment':
        return <BookOpen className="h-4 w-4" />;
      case 'video':
        return <Calendar className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getContentTypeColor = (category: string) => {
    switch (category) {
      case 'Tema de redação':
        return 'bg-launch-red-light text-launch-red-dark';
      case 'Teoria':
        return 'bg-launch-beige-light text-primary';
      default:
        return 'bg-launch-beige-light text-primary';
    }
  };

  return (
    <div className="container mx-auto p-3 sm:p-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-yeseva text-primary">{roomData.name}</h1>
          <p className="text-muted-foreground">{roomData.teacher} • {roomData.description}</p>
        </div>
      </div>

      {/* Room contents */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-yeseva text-primary">Conteúdos da Sala</h2>
          <Badge variant="secondary" className="bg-launch-beige-light text-primary">
            {teacherContents.length} itens disponíveis
          </Badge>
        </div>

        <div className="grid gap-4">
          {teacherContents.map((content) => (
            <Card key={content.id} className="border-launch-beige-light hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 rounded-lg bg-launch-beige-light text-primary">
                      {getContentIcon(content.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-primary mb-1">{content.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{content.description}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>Publicado em {content.date}</span>
                            {content.deadline && (
                              <span className="text-launch-red-dark font-medium">
                                Prazo: {content.deadline}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getContentTypeColor(content.category)}>
                            {content.category}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3 mr-1" />
                            Acessar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};