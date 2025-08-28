import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Users, Edit, Trash2, Search } from 'lucide-react';

interface Aluno {
  id: string;
  nome: string;
  email: string;
  salas: string[];
}

// Mock data
const mockAlunos: Aluno[] = [
  { id: '1', nome: 'João Silva Santos', email: 'joao.silva@email.com', salas: ['Sala A', 'Sala C'] },
  { id: '2', nome: 'Maria Oliveira Costa', email: 'maria.oliveira@email.com', salas: ['Sala B'] },
  { id: '3', nome: 'Pedro Santos Lima', email: 'pedro.santos@email.com', salas: ['Sala A', 'Sala B', 'Sala D'] },
  { id: '4', nome: 'Ana Carolina Pereira', email: 'ana.pereira@email.com', salas: ['Sala C'] },
  { id: '5', nome: 'Carlos Eduardo Rodrigues', email: 'carlos.rodrigues@email.com', salas: ['Sala A'] },
  { id: '6', nome: 'Beatriz Fernandes', email: 'beatriz.fernandes@email.com', salas: ['Sala B', 'Sala C'] },
];

export const ListarAlunos: React.FC = () => {
  const { toast } = useToast();
  const [alunos, setAlunos] = useState<Aluno[]>(mockAlunos);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingAluno, setEditingAluno] = useState<Aluno | null>(null);
  const [editForm, setEditForm] = useState({ nome: '', email: '', salas: [] as string[] });
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredAlunos = alunos.filter(aluno =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aluno.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteAluno = (alunoId: string) => {
    setAlunos(prev => prev.filter(aluno => aluno.id !== alunoId));
    toast({
      title: "Aluno removido",
      description: "O aluno foi removido do sistema e de todas as salas virtuais.",
    });
  };

  const handleEditAluno = (aluno: Aluno) => {
    setEditingAluno(aluno);
    setEditForm({
      nome: aluno.nome,
      email: aluno.email,
      salas: [...aluno.salas]
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingAluno) return;

    setAlunos(prev => prev.map(aluno =>
      aluno.id === editingAluno.id
        ? { ...aluno, nome: editForm.nome, email: editForm.email, salas: editForm.salas }
        : aluno
    ));

    toast({
      title: "Informações atualizadas",
      description: "As informações do aluno foram atualizadas com sucesso.",
    });

    setIsEditDialogOpen(false);
    setEditingAluno(null);
  };

  const handleSalaToggle = (sala: string) => {
    setEditForm(prev => ({
      ...prev,
      salas: prev.salas.includes(sala)
        ? prev.salas.filter(s => s !== sala)
        : [...prev.salas, sala]
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Listar Alunos</h1>
        <p className="text-muted-foreground">Gerenciar todos os alunos do sistema</p>
      </div>

      {/* Search */}
      <Card className="border-border">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Users className="h-5 w-5" />
            Alunos Cadastrados ({filteredAlunos.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome Completo</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Salas Virtuais</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlunos.map((aluno) => (
                  <TableRow key={aluno.id}>
                    <TableCell className="font-medium">{aluno.nome}</TableCell>
                    <TableCell>{aluno.email}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {aluno.salas.map((sala) => (
                          <span
                            key={sala}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground"
                          >
                            {sala}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditAluno(aluno)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta ação é irreversível. O aluno será removido permanentemente do sistema e de todas as salas virtuais.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteAluno(aluno.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Confirmar Exclusão
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Informações do Aluno</DialogTitle>
            <DialogDescription>
              Atualize as informações do aluno abaixo.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-nome">Nome Completo</Label>
              <Input
                id="edit-nome"
                value={editForm.nome}
                onChange={(e) => setEditForm(prev => ({ ...prev, nome: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <Label>Salas Virtuais</Label>
              <div className="space-y-2">
                {['Sala A', 'Sala B', 'Sala C', 'Sala D', 'Sala E'].map((sala) => (
                  <div key={sala} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`edit-sala-${sala}`}
                      checked={editForm.salas.includes(sala)}
                      onChange={() => handleSalaToggle(sala)}
                      className="rounded border-border"
                    />
                    <Label htmlFor={`edit-sala-${sala}`} className="text-sm font-normal">
                      {sala}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};