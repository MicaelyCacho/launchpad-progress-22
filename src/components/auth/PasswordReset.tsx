import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Rocket, ArrowLeft } from 'lucide-react';

interface PasswordResetProps {
  onBackToLogin: () => void;
}

export const PasswordReset: React.FC<PasswordResetProps> = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate password reset request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Email enviado com sucesso!",
        description: "Verifique sua caixa de entrada para redefinir sua senha",
      });
      
      // Reset form
      setEmail('');
    } catch (error) {
      toast({
        title: "Erro ao enviar email",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Rocket className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-yeseva text-primary">Launch</h1>
          </div>
          <p className="text-muted-foreground">Sua redação vai longe! 🚀</p>
        </div>

        <Card className="border-launch-beige-light">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-yeseva text-center">Redefinir Senha</CardTitle>
            <CardDescription className="text-center">
              Digite seu email para receber as instruções de redefinição
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-launch-beige-light focus:border-primary"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-accent transition-launch"
                disabled={isLoading}
              >
                {isLoading ? 'Enviando...' : 'Enviar Instruções'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button 
                variant="ghost" 
                onClick={onBackToLogin}
                className="text-primary hover:text-accent transition-launch"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para o login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};