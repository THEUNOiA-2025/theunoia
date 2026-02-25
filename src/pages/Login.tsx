import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client'; // ✅ ADD THIS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false); // ✅ ADD

  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, user } = useAuth();

  const slides = [
    '/images/auth-slide-1.png',
    '/images/auth-slide-2.png',
    '/images/auth-slide-3.png'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);


  // ✅ EMAIL LOGIN
  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    setLoading(true);

    try {

      const { error } = await signIn(email, password);

      if (error) throw error;

      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });

      navigate('/dashboard');

    } catch (error: any) {

      if (error.message?.includes('Email not confirmed')) {

        toast({
          title: 'Email Not Verified',
          description:
            'Please check your email and verify your account.',
          variant: 'destructive',
        });

      } else {

        toast({
          title: 'Login Failed',
          description: error.message || 'Invalid email or password',
          variant: 'destructive',
        });

      }

    } finally {

      setLoading(false);

    }

  };


  // ✅ GOOGLE LOGIN FUNCTION
  const handleGoogleLogin = async () => {

    setGoogleLoading(true);

    try {

      await supabase.auth.signInWithOAuth({

        provider: 'google',

        options: {

          redirectTo: `${window.location.origin}/dashboard`,

        },

      });

    } catch (error: any) {

      toast({
        title: "Google Login Failed",
        description: error.message,
        variant: "destructive",
      });

      setGoogleLoading(false);

    }

  };


  return (

    <div className="flex lg:min-h-screen">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 bg-muted flex-col justify-between lg:p-8 xl:p-12">
        <div className="flex items-center">
          <img
            src="/images/theunoia-logo.png"
            alt="THEUNOiA Logo"
            className="h-10 object-contain"
          />
        </div>


        <div className="relative h-[550px]">

          {slides.map((slide, index) => (

            <img
              key={index}
              src={slide}
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            />

          ))}

        </div>

      </div>


      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col">


        <div className="flex justify-end p-6">

          <Link to="/signup">

            <Button variant="ghost">
              Sign Up
            </Button>

          </Link>

        </div>


        <div className="flex-1 flex items-center justify-center px-6">

          <div className="w-full max-w-[400px] space-y-5">


            <h1 className="text-3xl font-bold text-center">
              Welcome back
            </h1>


            {/* EMAIL LOGIN */}

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>

                <Label>Email</Label>

                <Input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

              </div>


              <div>

                <Label>Password</Label>

                <Input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

              </div>


              <Button
                type="submit"
                className="w-full h-12 rounded-full"
                disabled={loading}
              >

                {loading
                  ? "Signing in..."
                  : "Sign In with Email"}

              </Button>

            </form>


            {/* ✅ DIVIDER */}

            <div className="flex items-center gap-3">

              <div className="flex-1 border-t" />

              <span className="text-sm text-muted-foreground">
                OR
              </span>

              <div className="flex-1 border-t" />

            </div>


            {/* ✅ GOOGLE BUTTON */}

            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full h-12 rounded-full flex items-center gap-2"
              disabled={googleLoading}
            >

              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5 h-5"
              />

              {googleLoading
                ? "Signing in..."
                : "Continue with Google"}

            </Button>



            <p className="text-center text-sm">

              Don't have account?

              <Link to="/signup" className="underline ml-1">
                Sign up
              </Link>

            </p>


          </div>

        </div>

      </div>

    </div>

  );

};

export default Login;