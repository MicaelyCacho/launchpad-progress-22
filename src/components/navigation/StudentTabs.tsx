import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FileInput } from '@/components/ui/file-input';
import { Progress } from '@/components/ui/progress';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Calendar, BookOpen, FileText, Award, Clock, Users, Upload, Brain, File, ChevronDown, Filter } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

export const StudentTabs: React.FC = () => {
  const navigate = useNavigate();
  const [newEssay, setNewEssay] = useState('');
  const [submissionMode, setSubmissionMode] = useState<'text' | 'file'>('text');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dropdownFilter, setDropdownFilter] = useState('Todos os períodos');

  const handleFileSelect = (files: FileList | null) => {
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  // Mock data ajustado para escala de 1000 pontos
  const competencyData = [
    { name: 'Argumentação', nota: 170, meta: 180 },
    { name: 'Coesão', nota: 156, meta: 170 },
    { name: 'Gramática', nota: 184, meta: 180 },
    { name: 'Repertório', nota: 160, meta: 176 },
    { name: 'Proposta', nota: 176, meta: 180 }
  ];

  const progressData = [
    { mes: 'Jan', nota: 750 },
    { mes: 'Fev', nota: 780 },
    { mes: 'Mar', nota: 820 },
    { mes: 'Abr', nota: 850 },
    { mes: 'Mai', nota: 880 },
    { mes: 'Jun', nota: 900 }
  ];

  const essayHistory = [
    { tema: 'Tecnologia na Educação', data: '2024-08-01', nota: 890, competencias: [178, 175, 180, 172, 185] },
    { tema: 'Sustentabilidade Urbana', data: '2024-07-25', nota: 860, competencias: [170, 168, 175, 165, 182] },
    { tema: 'Redes Sociais e Sociedade', data: '2024-07-18', nota: 840, competencias: [165, 162, 170, 160, 183] }
  ];

  const pendingActivities = [
    { title: 'Redação ENEM - Tema Tecnologia', deadline: '2024-08-15', subject: 'Português' },
    { title: 'Exercícios de Coesão', deadline: '2024-08-12', subject: 'Redação' },
    { title: 'Análise de Texto Argumentativo', deadline: '2024-08-18', subject: 'Literatura' }
  ];

  const myRooms = [
    { name: 'Redação ENEM 2024', teacher: 'Prof. Maria Santos', students: 25, status: 'ativa' },
    { name: 'Literatura Brasileira', teacher: 'Prof. João Silva', students: 30, status: 'ativa' },
    { name: 'Preparatório Vestibular', teacher: 'Prof. Ana Costa', students: 18, status: 'pausa' }
  ];

  const totalScore = competencyData.reduce((sum, comp) => sum + comp.nota, 0);

  // Helper function to get performance level and color for individual competencies (out of 200 points)
  const getCompetencyPerformanceLevel = (score: number) => {
    if (score >= 170) return { 
      level: 'Excellent', 
      color: 'bg-performance-excellent text-performance-excellent-foreground',
      progressColor: 'bg-performance-excellent'
    };
    if (score >= 150) return { 
      level: 'Good', 
      color: 'bg-performance-good text-performance-good-foreground',
      progressColor: 'bg-performance-good'
    };
    if (score >= 120) return { 
      level: 'Reasonable', 
      color: 'bg-performance-reasonable text-performance-reasonable-foreground',
      progressColor: 'bg-performance-reasonable'
    };
    return { 
      level: 'Poor', 
      color: 'bg-destructive text-destructive-foreground',
      progressColor: 'bg-destructive'
    };
  };

  // Helper function to get performance level and color for total scores (out of 1000 points)
  const getPerformanceLevel = (score: number) => {
    if (score >= 850) return { level: 'Excellent', color: 'bg-performance-excellent text-performance-excellent-foreground' };
    if (score >= 750) return { level: 'Good', color: 'bg-performance-good text-performance-good-foreground' };
    if (score >= 650) return { level: 'Reasonable', color: 'bg-performance-reasonable text-performance-reasonable-foreground' };
    return { level: 'Poor', color: 'bg-destructive text-destructive-foreground' };
  };

  return (
    <div className="container mx-auto p-3 sm:p-6">
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-4 sm:mb-6 h-auto">
          <TabsTrigger value="dashboard" className="text-xs sm:text-sm p-2 sm:p-3">Dashboard</TabsTrigger>
          <TabsTrigger value="enviar" className="text-xs sm:text-sm p-2 sm:p-3">Enviar Redação</TabsTrigger>
          <TabsTrigger value="historico" className="text-xs sm:text-sm p-2 sm:p-3">Histórico</TabsTrigger>
          <TabsTrigger value="salas" className="text-xs sm:text-sm p-2 sm:p-3">Sala Virtual</TabsTrigger>
        </TabsList>

        {/* Dashboard */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Header - clearly separated h1 and dropdown */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl font-yeseva text-primary">Dashboard do Aluno</h1>
            
            <div className="flex justify-end">
              <Badge variant="secondary" className="bg-launch-beige-light text-primary flex items-center gap-1 px-3 py-1">
                <Award className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">Nota Geral: {totalScore}</span>
              </Badge>
            </div>
          </div>

          {/* Cards de Resumo - Now only 2 cards taking full width */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Card className="border-launch-beige-light">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
                <CardTitle className="text-sm font-medium">Atividades Pendentes</CardTitle>
                <FileText className="h-4 w-4 text-launch-red-dark flex-shrink-0" />
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="text-2xl sm:text-3xl font-bold text-primary">3</div>
                <p className="text-xs text-muted-foreground">2 com prazo próximo</p>
              </CardContent>
            </Card>

            <Card className="border-launch-beige-light">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 sm:p-6">
                <CardTitle className="text-sm font-medium">Redações Enviadas</CardTitle>
                <BookOpen className="h-4 w-4 text-launch-beige-yellow flex-shrink-0" />
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="text-2xl sm:text-3xl font-bold text-primary">12</div>
                <p className="text-xs text-muted-foreground">+2 este mês</p>
              </CardContent>
            </Card>
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Competências */}
            <Card className="border-launch-beige-light">
              <CardHeader>
                <CardTitle className="font-yeseva text-primary">Desempenho por Competência</CardTitle>
                <CardDescription>Suas notas vs metas estabelecidas (máx. 200 pontos cada)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={competencyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" fontSize={10} />
                    <YAxis domain={[0, 200]} fontSize={10} />
                    <Tooltip />
                    <Bar dataKey="nota" fill="hsl(var(--launch-wine-dark))" />
                    <Bar dataKey="meta" fill="hsl(var(--launch-beige-yellow))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Evolução Temporal */}
            <Card className="border-launch-beige-light">
              <CardHeader>
                <CardTitle className="font-yeseva text-primary">Evolução das Notas</CardTitle>
                <CardDescription>Progresso ao longo do tempo (máx. 1000 pontos)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" fontSize={10} />
                    <YAxis domain={[0, 1000]} fontSize={10} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="nota" 
                      stroke="hsl(var(--launch-red-dark))" 
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Enviar Redação */}
        <TabsContent value="enviar" className="space-y-6">
          <Card className="border-launch-beige-light">
            <CardHeader>
              <CardTitle className="font-yeseva text-primary">Enviar Nova Redação</CardTitle>
              <CardDescription>Escolha como deseja enviar sua redação</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium text-primary mb-2">Tema: "Tecnologia e Educação no Século XXI"</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Com base na situação-problema apresentada e nos conhecimentos construídos ao longo de sua formação, 
                  redija um texto dissertativo-argumentativo em modalidade escrita formal da língua portuguesa sobre o tema...
                </p>
              </div>

              {/* Submission Mode Selector */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  variant={submissionMode === 'text' ? 'default' : 'outline'} 
                  onClick={() => setSubmissionMode('text')}
                  className="flex-1"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Escrever Texto
                </Button>
                <Button 
                  variant={submissionMode === 'file' ? 'default' : 'outline'} 
                  onClick={() => setSubmissionMode('file')}
                  className="flex-1"
                >
                  <File className="h-4 w-4 mr-2" />
                  Enviar Arquivo
                </Button>
              </div>

              {/* Text Submission */}
              {submissionMode === 'text' && (
                <div className="space-y-4">
                  <Textarea
                    placeholder="Digite sua redação aqui..."
                    value={newEssay}
                    onChange={(e) => setNewEssay(e.target.value)}
                    className="min-h-[400px] border-launch-beige-light"
                  />
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                    <div className="flex items-start space-x-2 text-xs sm:text-sm text-muted-foreground">
                      <Brain className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">As correções são realizadas com apoio de inteligência artificial, respeitando os critérios oficiais de avaliação de redações.</span>
                    </div>
                    <Button className="bg-primary hover:bg-accent w-full sm:w-auto">
                      <Upload className="h-4 w-4 mr-2" />
                      Enviar Redação
                    </Button>
                  </div>
                </div>
              )}

              {/* File Submission */}
              {submissionMode === 'file' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Upload da Redação
                    </label>
                    <p className="text-xs text-muted-foreground mb-3">
                      Formatos aceitos: PDF e PNG (máx. 10MB)
                    </p>
                    <FileInput
                      accept=".pdf,.png"
                      onFileSelect={handleFileSelect}
                      className="border-launch-beige-light"
                    />
                    {selectedFile && (
                      <p className="text-sm text-primary mt-2">
                        Arquivo selecionado: {selectedFile.name}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                    <div className="flex items-start space-x-2 text-xs sm:text-sm text-muted-foreground">
                      <Brain className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">As correções são realizadas com apoio de inteligência artificial, respeitando os critérios oficiais de avaliação de redações.</span>
                    </div>
                    <Button 
                      className="bg-primary hover:bg-accent w-full sm:w-auto"
                      disabled={!selectedFile}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Enviar Arquivo
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Histórico */}
        <TabsContent value="historico" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-yeseva text-primary">Histórico de Redações</h2>
            <div className="text-sm text-muted-foreground flex items-center">
              <Brain className="h-4 w-4 mr-1" />
              Correções com apoio de IA
            </div>
          </div>
          
          <div className="space-y-4">
            {essayHistory.map((essay, index) => (
              <Card key={index} className="border-launch-beige-light">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-primary">{essay.tema}</h3>
                      <p className="text-sm text-muted-foreground">Enviado em {essay.data}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="secondary" className="bg-launch-beige-light text-primary">
                        Nota: {essay.nota}/1000
                      </Badge>
                      <Badge className={getPerformanceLevel(essay.nota).color}>
                        {getPerformanceLevel(essay.nota).level}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
                    {essay.competencias.map((nota, compIndex) => {
                      const competencias = ['Argumentação', 'Coesão', 'Gramática', 'Repertório', 'Proposta'];
                      const performance = getCompetencyPerformanceLevel(nota);
                      return (
                        <div key={compIndex} className="text-center space-y-2">
                          <p className="text-xs text-muted-foreground truncate">{competencias[compIndex]}</p>
                          <div className="text-base sm:text-lg font-bold text-primary">{nota}/200</div>
                          <Badge className={`${performance.color} text-xs px-2 py-1`}>
                            {performance.level}
                          </Badge>
                          <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
                            <div 
                              className={`h-full transition-all ${performance.progressColor}`}
                              style={{ width: `${(nota / 200) * 100}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Salas */}
        <TabsContent value="salas" className="space-y-6">
          <h2 className="text-2xl font-yeseva text-primary">Minhas Salas Virtuais</h2>
          
          <div className="space-y-4">
            {myRooms.map((room, index) => (
              <Card key={index} className="border-launch-beige-light hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary">{room.name}</h3>
                      <p className="text-sm text-muted-foreground">{room.teacher}</p>
                      <p className="text-xs text-muted-foreground">{room.students} alunos</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={room.status === 'ativa' ? 'default' : 'secondary'}
                        className={room.status === 'ativa' ? 'bg-launch-green-gray' : ''}
                      >
                        {room.status === 'ativa' ? 'Ativa' : 'Em Pausa'}
                      </Badge>
                      <Button 
                        size="sm" 
                        className="bg-primary hover:bg-accent"
                        onClick={() => navigate(`/aluno/sala/${room.name.replace(/\s+/g, '-').toLowerCase()}`)}
                      >
                        Entrar na Sala
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};