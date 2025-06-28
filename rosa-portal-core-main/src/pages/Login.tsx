
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { LogIn, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, authMethod, setAuthMethod, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Set default auth method to LDAP on component mount
  useEffect(() => {
    setAuthMethod('LDAP');
  }, [setAuthMethod]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(username, password, authMethod);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error('Google login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 to-pink-600 p-4">
      <Card className="w-full max-w-md shadow-lg border-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold">
            Welcome to Core Portal
          </CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{authMethod === 'LDAP' ? 'Email' : 'Username'}</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder={authMethod === 'LDAP' ? 'name@example.com' : 'Username'}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-background border-border focus:border-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-background border-border focus:border-primary"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2.5"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-method">Login Method</Label>
                <Select value={authMethod} onValueChange={setAuthMethod}>
                  <SelectTrigger className="bg-background border-border focus:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LDAP">LDAP</SelectItem>
                    <SelectItem value="LOCAL">LOCAL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                variant="pink" 
                className="w-full" 
                disabled={isLoading}
              >
                <LogIn className="h-4 w-4 mr-2" />
                {isLoading ? 'Logging in...' : `Login with ${authMethod}`}
              </Button>
            </div>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button 
            type="button" 
            variant="google" 
            className="w-full"
            onClick={handleGoogleLogin}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Sign in with Google
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Core Portal
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
