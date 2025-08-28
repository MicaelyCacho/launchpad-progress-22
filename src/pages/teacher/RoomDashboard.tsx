import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  ArrowLeft,
  Plus, 
  Eye, 
  Edit3, 
  Trash2,
  Upload,
  Calendar,
  User,
  BookOpen,
  Target
} from 'lucide-react';
import { 
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

export const RoomDashboard: React.FC = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [isAddContentOpen, setIsAddContentOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [newContent, setNewContent] = useState({
    titulo: '',
    descricao: '',
    arquivo: null as File | null
  });

  // Mock data para a sala específica
  const performanceData = [
    { name: 'Bom', value: 12, color: 'hsl(var(--performance-excellent))' },
    { name: 'Ruim', value: 3, color: 'hsl(var(--destructive))' },
    { name: 'Atenção', value: 7, color: 'hsl(var(--performance-reasonable))' },
    { name: 'Não entregou a redação', value: 3, color: 'hsl(var(--muted))' }
  ];

  const studentsByCategory = {
    'Bom': [
      { nome: 'Ana Silva', ultimaNota: 920, data: '2024-08-15' },
      { nome: 'Carlos Santos', ultimaNota: 880, data: '2024-08-14' },
      { nome: 'Maria Oliveira', ultimaNota: 860, data: '2024-08-13' }
    ],
    'Ruim': [
      { nome: 'João Pereira', ultimaNota: 520, data: '2024-08-12' },
      { nome: 'Pedro Lima', ultimaNota: 480, data: '2024-08-11' }
    ],
    'Atenção': [
      { nome: 'Julia Costa', ultimaNota: 680, data: '2024-08-10' },
      { nome: 'Lucas Ferreira', ultimaNota: 720, data: '2024-08-09' }
    ],
    'Não entregou a redação': [
      { nome: 'Camila Rocha', ultimaNota: 0, data: 'Nunca entregou' },
      { nome: 'Rafael Souza', ultimaNota: 0, data: 'Nunca entregou' }
    ]
  };

  const roomContents = [
    { 
      titulo: 'Técnicas Avançadas de Argumentação', 
      tipo: 'PDF', 
      criado: '2024-08-01',
      descricao: 'Material sobre técnicas de argumentação para redação ENEM'
    },
    { 
      titulo: 'Estrutura da Redação Dissertativa', 
      tipo: 'Vídeo', 
      criado: '2024-07-28',
      descricao: 'Aula em vídeo sobre estrutura da redação'
    }
  ];

  const roomStudents = [
    { nome: 'Ana Silva', ultimaNota: 920, data: '2024-08-15' },
    { nome: 'Carlos Santos', ultimaNota: 880, data: '2024-08-14' },
    { nome: 'Maria Oliveira', ultimaNota: 860, data: '2024-08-13' },
    { nome: 'Julia Costa', ultimaNota: 680, data: '2024-08-10' },
    { nome: 'Lucas Ferreira', ultimaNota: 720, data: '2024-08-09' },
    { nome: 'João Pereira', ultimaNota: 520, data: '2024-08-12' },
    { nome: 'Pedro Lima', ultimaNota: 480, data: '2024-08-11' }
  ];

  const metaAtual = "Melhorar a coesão textual e uso de conectivos até o final do mês";
  const historicoMetas = [
    { meta: "Aumentar a média da turma para 800 pontos", data: '2024-07-15', status: 'Concluída' },
    { meta: "Trabalhar argumentação baseada em dados", data: '2024-06-20', status: 'Concluída' }
  ];

  const handleAddContent = () => {
    if (newContent.titulo.trim()) {
      console.log('Novo conteúdo adicionado:', newContent);
      setNewContent({ titulo: '', descricao: '', arquivo: null });
      setIsAddContentOpen(false);
    }
  };

  const handlePieClick = (data: any) => {
    setSelectedCategory(data.name);
  };

  const getPerformanceLevel = (score: number) => {
    if (score >= 850) return { level: 'Excellent', color: 'bg-performance-excellent text-performance-excellent-foreground' };
    if (score >= 750) return { level: 'Good', color: 'bg-performance-good text-performance-good-foreground' };
    if (score >= 600) return { level: 'Reasonable', color: 'bg-performance-reasonable text-performance-reasonable-foreground' };
    return { level: 'Poor', color: 'bg-destructive text-destructive-foreground' };
  };

  return (
    <div className="container mx-auto p-3 sm:p-6">
      {/* Header com botão de voltar */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/teacher')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-yeseva text-primary">Sala {roomId}</h1>
          <p className="text-muted-foreground">Gerenciamento da sala virtual</p>
        </div>
      </div>

      <Tabs defaultValue="visao-geral" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-6 h-auto">
          <TabsTrigger value="visao-geral" className="text-xs sm:text-sm p-2 sm:p-3">Visão Geral</TabsTrigger>
          <TabsTrigger value="meus-conteudos" className="text-xs sm:text-sm p-2 sm:p-3">Meus Conteúdos</TabsTrigger>
          <TabsTrigger value="lista-alunos" className="text-xs sm:text-sm p-2 sm:p-3">Lista de Alunos</TabsTrigger>
        </TabsList>

        {/* Tab Visão Geral */}
        <TabsContent value="visao-geral" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de Performance */}
            <Card className="border-launch-beige-light">
              <CardHeader>
                <CardTitle className="font-yeseva text-primary">Performance da Turma</CardTitle>
                <CardDescription>Distribuição dos alunos por categoria de desempenho</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={performanceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      onClick={handlePieClick}
                      style={{ cursor: 'pointer' }}
                    >
                      {performanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Lista de Alunos por Categoria */}
            <Card className="border-launch-beige-light">
              <CardHeader>
                <CardTitle className="font-yeseva text-primary">
                  {selectedCategory ? `Alunos - ${selectedCategory}` : 'Selecione uma categoria'}
                </CardTitle>
                <CardDescription>
                  {selectedCategory ? 'Clique no gráfico para ver outras categorias' : 'Clique em uma fatia do gráfico para ver os alunos'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedCategory && (
                  <div className="space-y-3">
                    {studentsByCategory[selectedCategory as keyof typeof studentsByCategory]?.map((student, index) => (
                      <Card key={index} className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold text-primary">{student.nome}</h4>
                            <p className="text-sm text-muted-foreground">
                              Última nota: {student.ultimaNota > 0 ? student.ultimaNota : 'Sem nota'}
                            </p>
                            <p className="text-xs text-muted-foreground">{student.data}</p>
                          </div>
                          {student.ultimaNota > 0 && (
                            <Badge className={getPerformanceLevel(student.ultimaNota).color}>
                              {getPerformanceLevel(student.ultimaNota).level}
                            </Badge>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Meus Conteúdos */}
        <TabsContent value="meus-conteudos" className="space-y-6">

          {/* Lista de Conteúdos */}
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-yeseva text-primary">Conteúdos da Sala</h3>
            <Dialog open={isAddContentOpen} onOpenChange={setIsAddContentOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-accent">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Conteúdo
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Conteúdo</DialogTitle>
                  <DialogDescription>Crie um novo conteúdo para a Sala {roomId}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="titulo">Título *</Label>
                    <Input
                      id="titulo"
                      value={newContent.titulo}
                      onChange={(e) => setNewContent({...newContent, titulo: e.target.value})}
                      placeholder="Digite o título do conteúdo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="descricao">Descrição</Label>
                    <Textarea
                      id="descricao"
                      value={newContent.descricao}
                      onChange={(e) => setNewContent({...newContent, descricao: e.target.value})}
                      placeholder="Descrição opcional do conteúdo"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="arquivo">Upload de Arquivo (PDF, PNG, DOCX)</Label>
                    <Input
                      id="arquivo"
                      type="file"
                      accept=".pdf,.png,.docx"
                      onChange={(e) => setNewContent({...newContent, arquivo: e.target.files?.[0] || null})}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddContent} disabled={!newContent.titulo.trim()}>
                      Salvar Conteúdo
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddContentOpen(false)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Lista de Conteúdos */}
          <div className="grid gap-4">
            {roomContents.map((content, index) => (
              <Card key={index} className="border-launch-beige-light">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-primary">{content.titulo}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{content.descricao}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {content.tipo}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {content.criado}
                        </span>
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

        {/* Tab Lista de Alunos */}
        <TabsContent value="lista-alunos" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-yeseva text-primary">Lista de Alunos da Sala {roomId}</h3>
          </div>

          <Card className="border-launch-beige-light">
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-yeseva text-primary">Nome Completo</TableHead>
                    <TableHead className="font-yeseva text-primary">Nota Geral</TableHead>
                    <TableHead className="font-yeseva text-primary">Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roomStudents.map((student, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-foreground">{student.nome}</TableCell>
                      <TableCell className="text-foreground">{student.ultimaNota}</TableCell>
                      <TableCell>
                        <Badge className={getPerformanceLevel(student.ultimaNota).color}>
                          {student.ultimaNota >= 850 ? 'Excelente' : 
                           student.ultimaNota >= 750 ? 'Bom' : 
                           student.ultimaNota >= 600 ? 'Regular' : 'Regular'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};