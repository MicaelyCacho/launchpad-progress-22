import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Users, GraduationCap } from 'lucide-react';

// Mock data for salas
const mockSalas = [
  { id: '1', name: 'Sala A' },
  { id: '2', name: 'Sala B' },
  { id: '3', name: 'Sala C' },
  { id: '4', name: 'Sala D' }
];

export const Cadastramento: React.FC = () => {
  const { toast } = useToast();
  
  // Aluno form state
  const [alunoForm, setAlunoForm] = useState({
    nome: '',
    cpf: '',
    idade: '',
    email: '',
    salas: '',
    turma: ''
  });

  // Professor form state
  const [professorForm, setProfessorForm] = useState({
    nome: '',
    cpf: '',
    idade: '',
    telefone: '',
    email: '',
    necessidade: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateCPF = (cpf: string) => {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return cpfRegex.test(cpf);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const handleAlunoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {[key: string]: string} = {};

    if (!alunoForm.nome) newErrors.nome = 'Nome é obrigatório';
    if (!alunoForm.cpf) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!validateCPF(alunoForm.cpf)) {
      newErrors.cpf = 'Por favor, insira um CPF válido (000.000.000-00)';
    }
    if (!alunoForm.idade) {
      newErrors.idade = 'Idade é obrigatória';
    } else if (parseInt(alunoForm.idade) < 6 || parseInt(alunoForm.idade) > 120) {
      newErrors.idade = 'Idade deve estar entre 6 e 120 anos';
    }
    if (!alunoForm.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!validateEmail(alunoForm.email)) {
      newErrors.email = 'Por favor, insira um email válido';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      toast({
        title: "Sucesso!",
        description: "Aluno cadastrado com sucesso!",
      });
      
      // Reset form
      setAlunoForm({
        nome: '',
        cpf: '',
        idade: '',
        email: '',
        salas: '',
        turma: ''
      });
    }
  };

  const handleProfessorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {[key: string]: string} = {};

    if (!professorForm.nome) newErrors.pnome = 'Nome é obrigatório';
    if (!professorForm.cpf) {
      newErrors.pcpf = 'CPF é obrigatório';
    } else if (!validateCPF(professorForm.cpf)) {
      newErrors.pcpf = 'Por favor, insira um CPF válido (000.000.000-00)';
    }
    if (!professorForm.idade) {
      newErrors.pidade = 'Idade é obrigatória';
    } else if (parseInt(professorForm.idade) < 18) {
      newErrors.pidade = 'Professor deve ter pelo menos 18 anos';
    }
    if (!professorForm.telefone) {
      newErrors.ptelefone = 'Telefone é obrigatório';
    } else if (!validatePhone(professorForm.telefone)) {
      newErrors.ptelefone = 'Por favor, insira um telefone válido ((XX) XXXXX-XXXX)';
    }
    if (!professorForm.email) {
      newErrors.pemail = 'Email é obrigatório';
    } else if (!validateEmail(professorForm.email)) {
      newErrors.pemail = 'Por favor, insira um email válido';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      toast({
        title: "Sucesso!",
        description: "Professor cadastrado com sucesso!",
      });
      
      // Reset form
      setProfessorForm({
        nome: '',
        cpf: '',
        idade: '',
        telefone: '',
        email: '',
        necessidade: ''
      });
    }
  };

  const handleSalaChange = (salaId: string) => {
    setAlunoForm(prev => ({
      ...prev,
      salas: salaId
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Cadastramento</h1>
        <p className="text-muted-foreground">Cadastro de alunos e professores</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Formulário de Alunos */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Users className="h-5 w-5" />
              Formulário de Alunos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAlunoSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome *</Label>
                <Input
                  id="nome"
                  value={alunoForm.nome}
                  onChange={(e) => setAlunoForm(prev => ({ ...prev, nome: e.target.value }))}
                  placeholder="Nome completo do aluno"
                  className={errors.nome ? 'border-destructive' : ''}
                />
                {errors.nome && <p className="text-sm text-destructive mt-1">{errors.nome}</p>}
              </div>

              <div>
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  value={alunoForm.cpf}
                  onChange={(e) => setAlunoForm(prev => ({ ...prev, cpf: e.target.value }))}
                  placeholder="000.000.000-00"
                  className={errors.cpf ? 'border-destructive' : ''}
                />
                {errors.cpf && <p className="text-sm text-destructive mt-1">{errors.cpf}</p>}
              </div>

              <div>
                <Label htmlFor="idade">Idade *</Label>
                <Input
                  id="idade"
                  type="number"
                  min="6"
                  max="120"
                  value={alunoForm.idade}
                  onChange={(e) => setAlunoForm(prev => ({ ...prev, idade: e.target.value }))}
                  placeholder="Idade do aluno"
                  className={errors.idade ? 'border-destructive' : ''}
                />
                {errors.idade && <p className="text-sm text-destructive mt-1">{errors.idade}</p>}
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={alunoForm.email}
                  onChange={(e) => setAlunoForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="email@exemplo.com"
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="salas">Salas</Label>
                <Select value={alunoForm.salas} onValueChange={handleSalaChange}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Selecione uma sala" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border z-50">
                    {mockSalas.map((sala) => (
                      <SelectItem key={sala.id} value={sala.id} className="hover:bg-accent">
                        {sala.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="turma">Turma</Label>
                <Input
                  id="turma"
                  value={alunoForm.turma}
                  onChange={(e) => setAlunoForm(prev => ({ ...prev, turma: e.target.value }))}
                  placeholder="Nome da turma (opcional)"
                />
              </div>

              <Button type="submit" className="w-full">
                Cadastrar Aluno
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Formulário de Professores */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <GraduationCap className="h-5 w-5" />
              Formulário de Professores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfessorSubmit} className="space-y-4">
              <div>
                <Label htmlFor="pnome">Nome *</Label>
                <Input
                  id="pnome"
                  value={professorForm.nome}
                  onChange={(e) => setProfessorForm(prev => ({ ...prev, nome: e.target.value }))}
                  placeholder="Nome completo do professor"
                  className={errors.pnome ? 'border-destructive' : ''}
                />
                {errors.pnome && <p className="text-sm text-destructive mt-1">{errors.pnome}</p>}
              </div>

              <div>
                <Label htmlFor="pcpf">CPF *</Label>
                <Input
                  id="pcpf"
                  value={professorForm.cpf}
                  onChange={(e) => setProfessorForm(prev => ({ ...prev, cpf: e.target.value }))}
                  placeholder="000.000.000-00"
                  className={errors.pcpf ? 'border-destructive' : ''}
                />
                {errors.pcpf && <p className="text-sm text-destructive mt-1">{errors.pcpf}</p>}
              </div>

              <div>
                <Label htmlFor="pidade">Idade *</Label>
                <Input
                  id="pidade"
                  type="number"
                  min="18"
                  value={professorForm.idade}
                  onChange={(e) => setProfessorForm(prev => ({ ...prev, idade: e.target.value }))}
                  placeholder="Idade do professor"
                  className={errors.pidade ? 'border-destructive' : ''}
                />
                {errors.pidade && <p className="text-sm text-destructive mt-1">{errors.pidade}</p>}
              </div>

              <div>
                <Label htmlFor="ptelefone">Telefone *</Label>
                <Input
                  id="ptelefone"
                  value={professorForm.telefone}
                  onChange={(e) => setProfessorForm(prev => ({ ...prev, telefone: e.target.value }))}
                  placeholder="(XX) XXXXX-XXXX"
                  className={errors.ptelefone ? 'border-destructive' : ''}
                />
                {errors.ptelefone && <p className="text-sm text-destructive mt-1">{errors.ptelefone}</p>}
              </div>

              <div>
                <Label htmlFor="pemail">Email *</Label>
                <Input
                  id="pemail"
                  type="email"
                  value={professorForm.email}
                  onChange={(e) => setProfessorForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="email@exemplo.com"
                  className={errors.pemail ? 'border-destructive' : ''}
                />
                {errors.pemail && <p className="text-sm text-destructive mt-1">{errors.pemail}</p>}
              </div>

              <div>
                <Label htmlFor="necessidade">Necessidade</Label>
                <Textarea
                  id="necessidade"
                  value={professorForm.necessidade}
                  onChange={(e) => setProfessorForm(prev => ({ ...prev, necessidade: e.target.value }))}
                  placeholder="Observações adicionais (opcional)"
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full">
                Cadastrar Professor
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};