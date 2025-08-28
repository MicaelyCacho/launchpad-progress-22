import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { School, Users, Plus, Search, Edit, Trash2, AlertTriangle } from 'lucide-react';

// Mock data
const mockSalas = [
  {
    id: '1',
    nome: 'Sala A',
    quantidadeAlunos: 25,
    limiteAlunos: 30,
    metaAtual: 'Melhorar argumentação em redações dissertativas'
  },
  {
    id: '2', 
    nome: 'Sala B',
    quantidadeAlunos: 22,
    limiteAlunos: 25,
    metaAtual: 'Aperfeiçoar coesão textual'
  },
  {
    id: '3',
    nome: 'Sala C',
    quantidadeAlunos: 28,
    limiteAlunos: 30,
    metaAtual: 'Desenvolver repertório cultural'
  }
];

const mockAlunos = [
  { id: '1', nome: 'Ana Silva Santos', cpf: '123.456.789-10', ultimaNota: 85, dataUltimaNota: '2024-01-15' },
  { id: '2', nome: 'Bruno Costa Lima', cpf: '234.567.890-21', ultimaNota: 92, dataUltimaNota: '2024-01-14' },
  { id: '3', nome: 'Carla Mendes Oliveira', cpf: '345.678.901-32', ultimaNota: 78, dataUltimaNota: '2024-01-13' },
  { id: '4', nome: 'Diego Ferreira Souza', cpf: '456.789.012-43', ultimaNota: 88, dataUltimaNota: '2024-01-12' },
  { id: '5', nome: 'Elena Rodrigues Silva', cpf: '567.890.123-54', ultimaNota: 95, dataUltimaNota: '2024-01-11' }
];

const mockTodosAlunos = [
  ...mockAlunos,
  { id: '6', nome: 'Felipe Nunes Castro', cpf: '678.901.234-65', ultimaNota: 0, dataUltimaNota: '' },
  { id: '7', nome: 'Gabriela Santos Lima', cpf: '789.012.345-76', ultimaNota: 0, dataUltimaNota: '' },
  { id: '8', nome: 'Henrique Alves Costa', cpf: '890.123.456-87', ultimaNota: 0, dataUltimaNota: '' }
];

export const SalasVirtualAdmin: React.FC = () => {
  const { toast } = useToast();
  const [selectedSala, setSelectedSala] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddAlunoOpen, setIsAddAlunoOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'nome' | 'nota'>('nome');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredAlunos = mockAlunos.filter(aluno =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aluno.cpf.includes(searchTerm)
  );

  const sortedAlunos = [...filteredAlunos].sort((a, b) => {
    if (sortBy === 'nome') {
      return sortOrder === 'asc' 
        ? a.nome.localeCompare(b.nome)
        : b.nome.localeCompare(a.nome);
    } else {
      return sortOrder === 'asc'
        ? a.ultimaNota - b.ultimaNota
        : b.ultimaNota - a.ultimaNota;
    }
  });

  const handleSort = (column: 'nome' | 'nota') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleDeleteAluno = (alunoId: string, alunoNome: string) => {
    const confirmed = window.confirm(`Tem certeza que deseja excluir ${alunoNome} desta sala?`);
    if (confirmed) {
      toast({
        title: "Aluno removido",
        description: `${alunoNome} foi removido da sala com sucesso.`,
      });
    }
  };

  const handleAddAluno = (alunoId: string) => {
    const aluno = mockTodosAlunos.find(a => a.id === alunoId);
    if (aluno) {
      const isAlreadyInSala = mockAlunos.some(a => a.id === alunoId);
      if (isAlreadyInSala) {
        toast({
          title: "Aviso",
          description: "Este aluno já está vinculado a esta sala.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Sucesso!",
          description: `${aluno.nome} foi adicionado à sala com sucesso.`,
        });
        setIsAddAlunoOpen(false);
      }
    }
  };

  if (selectedSala) {
    const sala = mockSalas.find(s => s.id === selectedSala);
    if (!sala) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button
              variant="ghost"
              onClick={() => setSelectedSala(null)}
              className="mb-2 text-muted-foreground hover:text-foreground"
            >
              ← Voltar para lista de salas
            </Button>
            <h1 className="text-3xl font-bold text-foreground">{sala.nome}</h1>
            <p className="text-muted-foreground">
              {sala.quantidadeAlunos} de {sala.limiteAlunos} alunos
            </p>
          </div>
          <Dialog open={isAddAlunoOpen} onOpenChange={setIsAddAlunoOpen}>
            <DialogTrigger asChild>
              <Button className="min-h-[44px]">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Aluno
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Adicionar Aluno à {sala.nome}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Pesquisar por nome ou CPF..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="max-h-96 overflow-y-auto space-y-2">
                  {mockTodosAlunos
                    .filter(aluno => 
                      aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      aluno.cpf.includes(searchTerm)
                    )
                    .map((aluno) => (
                      <div
                        key={aluno.id}
                        className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-secondary/50 transition-launch"
                      >
                        <div>
                          <p className="font-medium text-foreground">{aluno.nome}</p>
                          <p className="text-sm text-muted-foreground">{aluno.cpf}</p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleAddAluno(aluno.id)}
                        >
                          Adicionar
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="border-border">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-foreground">Lista de Alunos</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Filtrar alunos..."
                  className="pl-10 w-full sm:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <button
                        onClick={() => handleSort('nome')}
                        className="flex items-center gap-2 hover:text-foreground"
                      >
                        Nome do Aluno
                        {sortBy === 'nome' && (
                          <span className="text-xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </button>
                    </TableHead>
                    <TableHead>
                      <button
                        onClick={() => handleSort('nota')}
                        className="flex items-center gap-2 hover:text-foreground"
                      >
                        Última Nota
                        {sortBy === 'nota' && (
                          <span className="text-xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </button>
                    </TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedAlunos.map((aluno) => (
                    <TableRow key={aluno.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{aluno.nome}</p>
                          <p className="text-sm text-muted-foreground">{aluno.cpf}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <Badge 
                            variant={
                              aluno.ultimaNota >= 90 ? "default" :
                              aluno.ultimaNota >= 80 ? "secondary" : "destructive"
                            }
                          >
                            {aluno.ultimaNota}/100
                          </Badge>
                          {aluno.dataUltimaNota && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(aluno.dataUltimaNota).toLocaleDateString('pt-BR')}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toast({ 
                              title: "Editar cadastro", 
                              description: "Funcionalidade de edição (mock)" 
                            })}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteAluno(aluno.id, aluno.nome)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Salas Virtuais</h1>
        <p className="text-muted-foreground">Gerenciamento de salas virtuais</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSalas.map((sala) => (
          <Card key={sala.id} className="border-border hover:shadow-md transition-launch cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-foreground">
                <span className="flex items-center gap-2">
                  <School className="h-5 w-5" />
                  {sala.nome}
                </span>
                <Badge variant="secondary">
                  {sala.quantidadeAlunos}/{sala.limiteAlunos}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                {sala.quantidadeAlunos} alunos cadastrados
              </div>
              
              {sala.metaAtual && (
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">Meta atual:</p>
                  <p className="text-muted-foreground">{sala.metaAtual}</p>
                </div>
              )}

              <Button 
                onClick={() => setSelectedSala(sala.id)}
                className="w-full"
              >
                Gerenciar Sala
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};