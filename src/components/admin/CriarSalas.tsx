import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { School, Plus } from 'lucide-react';

export const CriarSalas: React.FC = () => {
  const { toast } = useToast();
  
  const [form, setForm] = useState({
    nomeSala: '',
    quantidadeAlunos: '',
    descricao: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {[key: string]: string} = {};

    if (!form.nomeSala) {
      newErrors.nomeSala = 'Nome da sala é obrigatório';
    }
    if (!form.quantidadeAlunos) {
      newErrors.quantidadeAlunos = 'Quantidade de alunos é obrigatória';
    } else if (parseInt(form.quantidadeAlunos) < 1) {
      newErrors.quantidadeAlunos = 'Quantidade deve ser pelo menos 1';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      toast({
        title: "Sucesso!",
        description: "Sala criada com sucesso!",
      });
      
      // Reset form
      setForm({
        nomeSala: '',
        quantidadeAlunos: '',
        descricao: ''
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Criar Salas</h1>
        <p className="text-muted-foreground">Criação de novas salas virtuais</p>
      </div>

      <div className="max-w-6xl mx-auto">
        <Card className="border-border">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-foreground">
              <School className="h-5 w-5" />
              Nova Sala Virtual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="nomeSala">Nome da Sala *</Label>
                <Input
                  id="nomeSala"
                  value={form.nomeSala}
                  onChange={(e) => setForm(prev => ({ ...prev, nomeSala: e.target.value }))}
                  placeholder="Ex: Sala A, Turma 2024-1, etc."
                  className={errors.nomeSala ? 'border-destructive' : ''}
                />
                {errors.nomeSala && (
                  <p className="text-sm text-destructive mt-1">{errors.nomeSala}</p>
                )}
              </div>

              <div>
                <Label htmlFor="quantidadeAlunos">Quantidade de Alunos Necessários *</Label>
                <Input
                  id="quantidadeAlunos"
                  type="number"
                  min="1"
                  value={form.quantidadeAlunos}
                  onChange={(e) => setForm(prev => ({ ...prev, quantidadeAlunos: e.target.value }))}
                  placeholder="Número máximo de alunos para esta sala"
                  className={errors.quantidadeAlunos ? 'border-destructive' : ''}
                />
                {errors.quantidadeAlunos && (
                  <p className="text-sm text-destructive mt-1">{errors.quantidadeAlunos}</p>
                )}
              </div>

              <div>
                <Label htmlFor="descricao">Descrição da Sala</Label>
                <Textarea
                  id="descricao"
                  value={form.descricao}
                  onChange={(e) => setForm(prev => ({ ...prev, descricao: e.target.value }))}
                  placeholder="Descrição opcional da sala, objetivos de aprendizagem, etc."
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                <Plus className="h-4 w-4 mr-2" />
                Criar Sala
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Preview/Instructions */}
        <Card className="border-border mt-6">
          <CardHeader>
            <CardTitle className="text-foreground">Informações Importantes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Após criar a sala, ela aparecerá automaticamente na seção "Salas Virtuais"</p>
            <p>• Você poderá adicionar e remover alunos a qualquer momento</p>
            <p>• O nome da sala deve ser único e descritivo</p>
            <p>• A quantidade de alunos define o limite máximo para a sala</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};