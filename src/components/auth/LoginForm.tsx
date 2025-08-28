import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/components/ui/auth-provider';
import { toast } from '@/hooks/use-toast';
import { Rocket } from 'lucide-react';

interface LoginFormProps {
  onForgotPassword?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo à plataforma Launch",
        });
      } else {
        toast({
          title: "Erro no login",
          description: "Email ou senha incorretos",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro inesperado",
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
            <CardTitle className="text-2xl font-yeseva text-center">Entrar</CardTitle>
            <CardDescription className="text-center">
              Digite suas credenciais para acessar a plataforma
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
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-launch-beige-light focus:border-primary"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-accent transition-launch"
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            {/* Contas de demonstração */}
            <div className="mt-6 p-4 bg-launch-beige-light rounded-lg">
              <h3 className="font-semibold text-sm mb-2">Contas de demonstração:</h3>
              <div className="text-xs space-y-1 text-muted-foreground">
                <p><strong>Aluno:</strong> aluno@launch.com / senha123</p>
                <p><strong>Professor:</strong> professor@launch.com / senha123</p>
                <p><strong>Administrador:</strong> admin@launch.com / senha123</p>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="mt-4 text-center">
              <button 
                type="button"
                onClick={onForgotPassword}
                className="text-sm text-primary hover:text-accent transition-launch underline"
              >
                Esqueceu sua senha?
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};