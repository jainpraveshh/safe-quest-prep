-- Create user profiles table for Indian users
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  school_name TEXT NOT NULL,
  region TEXT NOT NULL,
  roll_no TEXT,
  class_no TEXT,
  age_group TEXT,
  user_role TEXT NOT NULL DEFAULT 'student' CHECK (user_role IN ('student', 'teacher', 'admin')),
  points INTEGER DEFAULT 0,
  badges_earned INTEGER DEFAULT 0,
  streak_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Teachers can view students in their region
CREATE POLICY "Teachers can view students in region"
ON public.profiles
FOR SELECT
USING (
  user_role = 'student' AND 
  EXISTS (
    SELECT 1 FROM public.profiles teacher_profile 
    WHERE teacher_profile.user_id = auth.uid() 
    AND teacher_profile.user_role = 'teacher'
    AND teacher_profile.region = profiles.region
  )
);

-- Create regional disasters table
CREATE TABLE public.regional_disasters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  region TEXT NOT NULL,
  disaster_type TEXT NOT NULL,
  severity TEXT NOT NULL,
  description TEXT,
  preparedness_tips TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for regional disasters
ALTER TABLE public.regional_disasters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Regional disasters are viewable by everyone" 
ON public.regional_disasters 
FOR SELECT 
USING (true);

-- Insert Indian regional disaster data
INSERT INTO public.regional_disasters (region, disaster_type, severity, description, preparedness_tips) VALUES
('Maharashtra', 'flood', 'high', 'Heavy monsoon flooding in coastal and urban areas', ARRAY['Keep emergency kit ready', 'Know evacuation routes', 'Store drinking water']),
('Maharashtra', 'cyclone', 'medium', 'Cyclones affecting coastal regions', ARRAY['Secure windows and doors', 'Stock food for 3 days', 'Listen to weather updates']),
('Gujarat', 'earthquake', 'high', 'High seismic activity in Kutch region', ARRAY['Practice drop-cover-hold', 'Secure heavy furniture', 'Know safe spots']),
('Gujarat', 'cyclone', 'high', 'Cyclones from Arabian Sea', ARRAY['Evacuate coastal areas', 'Store emergency supplies', 'Charge electronic devices']),
('Bihar', 'flood', 'high', 'Annual monsoon flooding', ARRAY['Move to higher ground', 'Purify drinking water', 'Keep important documents safe']),
('Uttar Pradesh', 'flood', 'high', 'River flooding during monsoon', ARRAY['Monitor water levels', 'Prepare evacuation plan', 'Store dry food']),
('Rajasthan', 'heatwave', 'high', 'Extreme summer temperatures', ARRAY['Stay hydrated', 'Avoid outdoor activities', 'Use cooling measures']),
('Rajasthan', 'drought', 'medium', 'Water scarcity in desert regions', ARRAY['Conserve water', 'Store rainwater', 'Plan water usage']),
('Odisha', 'cyclone', 'high', 'Bay of Bengal cyclones', ARRAY['Follow evacuation orders', 'Secure loose objects', 'Stock emergency supplies']),
('West Bengal', 'cyclone', 'high', 'Frequent cyclones from Bay of Bengal', ARRAY['Strengthen roof and walls', 'Keep radio for updates', 'Prepare first aid kit']),
('Kerala', 'flood', 'high', 'Monsoon and landslide-induced flooding', ARRAY['Know warning signs', 'Have emergency contacts', 'Keep boats/rafts ready']),
('Tamil Nadu', 'cyclone', 'high', 'Northeast monsoon cyclones', ARRAY['Board up windows', 'Stock medicines', 'Plan safe room']),
('Assam', 'flood', 'high', 'Brahmaputra river flooding', ARRAY['Monitor flood warnings', 'Prepare boats', 'Store food on higher levels']),
('Himachal Pradesh', 'landslide', 'medium', 'Monsoon-induced landslides', ARRAY['Avoid steep slopes', 'Know safe routes', 'Watch for warning signs']),
('Uttarakhand', 'landslide', 'high', 'Mountain slope instability', ARRAY['Evacuate quickly', 'Listen for unusual sounds', 'Stay away from slopes']);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();