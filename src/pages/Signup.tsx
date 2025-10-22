import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';
import slide1 from '@/assets/auth-slide-1.png';
import slide2 from '@/assets/auth-slide-2.png';
import slide3 from '@/assets/auth-slide-3.png';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const basicInfoSchema = z.object({
  firstName: z.string().trim().min(2, 'First name must be at least 2 characters').max(50),
  lastName: z.string().trim().min(2, 'Last name must be at least 2 characters').max(50),
  email: z.string().trim().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  dateOfBirth: z.string().refine((date) => {
    const dob = new Date(date);
    const age = (Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365);
    return age >= 13 && age <= 120;
  }, 'You must be at least 13 years old'),
  gender: z.string().min(1, 'Please select a gender'),
  city: z.string().trim().min(2, 'City must be at least 2 characters').max(100),
});

const studentInfoSchema = z.object({
  instituteName: z.string().trim().min(2, 'Institute name must be at least 2 characters').max(200),
  enrollmentId: z.string().trim().max(100).optional(),
  instituteEmail: z.string().trim().email('Invalid email address').optional(),
}).refine((data) => data.enrollmentId || data.instituteEmail, {
  message: 'Please provide either Enrollment ID or Institute Email',
  path: ['enrollmentId'],
});

const Signup = () => {
  const [step, setStep] = useState(1);
  const [isStudent, setIsStudent] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Step 1 - Basic Info
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');

  // Step 2 - Student Info (optional)
  const [instituteName, setInstituteName] = useState('');
  const [enrollmentId, setEnrollmentId] = useState('');
  const [instituteEmail, setInstituteEmail] = useState('');

  const slides = [slide1, slide2, slide3];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/');
      }
    });
  }, [navigate]);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      basicInfoSchema.parse({
        firstName,
        lastName,
        email,
        password,
        dateOfBirth,
        gender,
        city,
      });
      setStep(2);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Validation Error',
          description: error.errors[0].message,
          variant: 'destructive',
        });
      }
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate student info if user is a student
      if (isStudent) {
        studentInfoSchema.parse({
          instituteName,
          enrollmentId: enrollmentId || undefined,
          instituteEmail: instituteEmail || undefined,
        });
      }

      // Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Signup failed');

      // Create user profile
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          user_id: authData.user.id,
          first_name: firstName,
          last_name: lastName,
          email: email,
          date_of_birth: dateOfBirth,
          gender: gender,
          city: city,
        });

      if (profileError) throw profileError;

      // If student, create student verification record
      if (isStudent) {
        const { error: studentError } = await supabase
          .from('student_verifications')
          .insert({
            user_id: authData.user.id,
            institute_name: instituteName,
            enrollment_id: enrollmentId || null,
            institute_email: instituteEmail || null,
          });

        if (studentError) throw studentError;
      }

      toast({
        title: 'Account created successfully!',
        description: isStudent 
          ? 'Your student verification is pending. You will be notified once approved.'
          : 'Welcome to THEUNOiA!',
      });

      navigate('/');
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        title: 'Signup Failed',
        description: error.message || 'An error occurred during signup',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Branding & Images */}
      <div className="hidden lg:flex lg:w-1/2 bg-muted flex-col justify-between p-12">
        <div className="flex items-center gap-3">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/92d972effd43063f68165dc5639029d3b68f7576?placeholderIfAbsent=true"
            alt="THEUNOiA Logo"
            className="w-[30px] h-[24px]"
          />
          <span className="text-xl font-bold text-foreground">THEUNOiA</span>
        </div>

        <div className="space-y-6">
          <div className="bg-transparent rounded-3xl p-4 relative overflow-hidden">
            <div className="relative h-[550px] w-full flex items-center justify-center">
              {slides.map((slide, index) => (
                <img
                  key={index}
                  src={slide}
                  alt={`Slide ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ mixBlendMode: 'multiply' }}
                />
              ))}
            </div>
          </div>
          
          <blockquote className="space-y-2">
            <p className="text-muted-foreground text-base leading-relaxed">
              "THEUNOiA has transformed how my team collaborates! The intuitive task board and real-time updates keep everyone on the same page."
            </p>
            <footer className="text-sm text-foreground font-medium">- Sofia Davis, Product Manager</footer>
          </blockquote>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-end p-6">
          <Link to="/login">
            <Button variant="ghost" className="text-base font-medium">
              Login
            </Button>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-[450px] space-y-8">
            <div className="space-y-3 text-center">
              <h1 className="text-3xl font-bold text-foreground">Create an account</h1>
              <p className="text-muted-foreground text-base">
                Step {step} of 2: {step === 1 ? 'Basic Information' : 'Student Verification'}
              </p>
            </div>

            {step === 1 ? (
              <form onSubmit={handleStep1Submit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={gender} onValueChange={setGender} required>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="Your city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                <Button type="submit" className="w-full h-11 text-base font-bold rounded-full">
                  Continue
                </Button>
              </form>
            ) : (
              <form onSubmit={handleFinalSubmit} className="space-y-4">
                <div className="flex items-center space-x-2 p-4 bg-muted rounded-lg">
                  <Checkbox
                    id="isStudent"
                    checked={isStudent}
                    onCheckedChange={(checked) => setIsStudent(checked as boolean)}
                  />
                  <Label htmlFor="isStudent" className="cursor-pointer">
                    I am a student (unlock freelancing features)
                  </Label>
                </div>

                {isStudent && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="instituteName">Institute Name</Label>
                      <Input
                        id="instituteName"
                        type="text"
                        placeholder="University or College name"
                        value={instituteName}
                        onChange={(e) => setInstituteName(e.target.value)}
                        required={isStudent}
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="enrollmentId">Enrollment ID (Optional)</Label>
                      <Input
                        id="enrollmentId"
                        type="text"
                        placeholder="Your enrollment/student ID"
                        value={enrollmentId}
                        onChange={(e) => setEnrollmentId(e.target.value)}
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="instituteEmail">Institute Email (Optional)</Label>
                      <Input
                        id="instituteEmail"
                        type="email"
                        placeholder="your.name@university.edu"
                        value={instituteEmail}
                        onChange={(e) => setInstituteEmail(e.target.value)}
                        className="h-11"
                      />
                    </div>

                    <p className="text-sm text-muted-foreground">
                      * Provide either Enrollment ID or Institute Email for verification
                    </p>
                  </>
                )}

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 h-11 rounded-full"
                    disabled={loading}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-11 text-base font-bold rounded-full"
                    disabled={loading}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </div>
              </form>
            )}

            <p className="text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{' '}
              <Link to="/terms" className="underline underline-offset-4 hover:text-foreground">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="underline underline-offset-4 hover:text-foreground">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
