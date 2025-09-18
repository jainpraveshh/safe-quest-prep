import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Shield } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const ageGroups = [
  'Primary (5-10 years)', 
  'Middle (11-14 years)', 
  'High School (15-18 years)', 
  'Teacher/Adult'
];

const userRoles = ['student', 'teacher', 'admin'];

export const SignupPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  // Signup form state
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    name: '',
    schoolName: '',
    region: '',
    rollNo: '',
    classNo: '',
    ageGroup: '',
    userRole: 'student'
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validation: Age group required for students
    if (signupData.userRole === 'student' && !signupData.ageGroup) {
      setError('Please select your age group');
      setIsLoading(false);
      return;
    }

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: signupData.email,
        password: signupData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name: signupData.name,
            school_name: signupData.schoolName,
            region: signupData.region,
            roll_no: signupData.rollNo,
            class_no: signupData.classNo,
            age_group: signupData.ageGroup,
            user_role: signupData.userRole
          }
        }
      });

      if (authError) {
        setError(authError.message);
      } else if (authData.user) {
        // Check if email confirmation is required
        if (!authData.user.email_confirmed_at && !authData.session) {
          setSuccess('Account created! Please check your email and click the confirmation link to complete signup.');
        } else {
          // Auto-login successful - redirect to main app
          navigate('/');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Join EduShield</CardTitle>
          <CardDescription>Create your disaster preparedness account</CardDescription>
        </CardHeader>
        
        <CardContent>
          {error && (
            <Alert className="mb-4" variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                type="email"
                value={signupData.email}
                onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                value={signupData.password}
                onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g., Aarav Sharma"
                value={signupData.name}
                onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="user-role">Role</Label>
              <Select value={signupData.userRole} onValueChange={(value) => setSignupData({...signupData, userRole: value})} required>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {userRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {signupData.userRole === 'student' && (
              <>
                <div>
                  <Label htmlFor="age-group">Age Group *</Label>
                  <Select value={signupData.ageGroup} onValueChange={(value) => setSignupData({...signupData, ageGroup: value})} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your age group" />
                    </SelectTrigger>
                    <SelectContent>
                      {ageGroups.slice(0, 3).map((group) => (
                        <SelectItem key={group} value={group}>{group}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="school">School Name</Label>
                  <Input
                    id="school"
                    type="text"
                    placeholder="e.g., Delhi Public School"
                    value={signupData.schoolName}
                    onChange={(e) => setSignupData({...signupData, schoolName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="region">Region/State</Label>
                  <Select value={signupData.region} onValueChange={(value) => setSignupData({...signupData, region: value})} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      {indianStates.map((state) => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="roll-no">Roll No.</Label>
                    <Input
                      id="roll-no"
                      type="text"
                      placeholder="e.g., 2024001"
                      value={signupData.rollNo}
                      onChange={(e) => setSignupData({...signupData, rollNo: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="class-no">Class</Label>
                    <Input
                      id="class-no"
                      type="text"
                      placeholder="e.g., 10-A"
                      value={signupData.classNo}
                      onChange={(e) => setSignupData({...signupData, classNo: e.target.value})}
                    />
                  </div>
                </div>
              </>
            )}
            
            {(signupData.userRole === 'teacher' || signupData.userRole === 'admin') && (
              <>
                <div>
                  <Label htmlFor="school">School/Organization Name</Label>
                  <Input
                    id="school"
                    type="text"
                    placeholder="e.g., Delhi Public School"
                    value={signupData.schoolName}
                    onChange={(e) => setSignupData({...signupData, schoolName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="region">Region/State</Label>
                  <Select value={signupData.region} onValueChange={(value) => setSignupData({...signupData, region: value})} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      {indianStates.map((state) => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-emerald-600 hover:underline font-medium">
                Login here
              </Link>
            </p>
            <Link to="/" className="text-sm text-gray-500 hover:underline mt-2 block">
              Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};