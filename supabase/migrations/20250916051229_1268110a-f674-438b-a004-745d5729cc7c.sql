-- Add region-specific disaster data for Phase 3
INSERT INTO regional_disasters (region, disaster_type, severity, description, preparedness_tips) VALUES
-- Odisha - Cyclone prone
('Odisha', 'Cyclone', 'High', 'Coastal state vulnerable to severe cyclones from Bay of Bengal', ARRAY[
  'Monitor weather updates regularly during cyclone season (May-November)',
  'Keep emergency kit with water, food, medicines for 3 days',
  'Identify nearest cyclone shelter and evacuation routes',
  'Secure loose objects and board up windows before storm hits',
  'Stay indoors during cyclone, avoid going near windows'
]),

-- Rajasthan - Drought prone
('Rajasthan', 'Drought', 'High', 'Desert state facing severe water scarcity and heat waves', ARRAY[
  'Conserve water through rainwater harvesting and efficient usage',
  'Store water in multiple containers for emergency',
  'Protect yourself from heat waves - stay hydrated and indoors during peak hours',
  'Know signs of heat exhaustion and heat stroke',
  'Keep ORS packets and learn preparation method'
]),

-- Uttarakhand - Landslide prone
('Uttarakhand', 'Landslide', 'High', 'Himalayan state prone to landslides during monsoon', ARRAY[
  'Learn to identify landslide warning signs - cracks in ground, tilting trees',
  'Know evacuation routes to higher ground',
  'Avoid construction on steep slopes or near cliff edges',
  'During heavy rain, stay alert for unusual sounds (rumbling, cracking)',
  'If caught in landslide, move perpendicular to debris flow direction'
]),

-- Kerala - Flood prone
('Kerala', 'Flood', 'High', 'State experiences severe flooding during monsoon season', ARRAY[
  'Learn to swim and teach family members basic swimming',
  'Keep emergency supplies on upper floors',
  'Know location of relief camps and evacuation centers',
  'During flood warnings, move to higher ground immediately',
  'Avoid walking or driving through flood water - 6 inches can knock you down'
]),

-- Gujarat - Earthquake prone
('Gujarat', 'Earthquake', 'High', 'State located in seismically active zone', ARRAY[
  'Practice Drop, Cover, Hold On drill regularly',
  'Secure heavy furniture and objects that could fall',
  'Identify safe spots in each room - under sturdy tables, away from glass',
  'Keep emergency supplies accessible but secure',
  'Know how to turn off gas, water, and electricity mains'
]),

-- Delhi - Multiple hazards
('Delhi', 'Air Pollution', 'High', 'National capital faces severe air quality issues', ARRAY[
  'Monitor Air Quality Index (AQI) daily',
  'Use N95 masks during high pollution days',
  'Keep windows closed during smog, use air purifiers',
  'Limit outdoor activities when AQI is above 200',
  'Know symptoms of respiratory distress and when to seek help'
]),

-- Tamil Nadu - Cyclone and Flood
('Tamil Nadu', 'Cyclone', 'High', 'Coastal state facing cyclones and urban flooding', ARRAY[
  'Understand cyclone warning signals - Yellow, Orange, Red alerts',
  'Prepare home with emergency supplies before cyclone season',
  'Know evacuation procedures for coastal areas',
  'Keep important documents in waterproof container',
  'Follow official updates from Chennai Met Department'
]),

-- Assam - Flood prone
('Assam', 'Flood', 'High', 'Annual flooding affects large parts of the state', ARRAY[
  'Understand Brahmaputra river flood patterns',
  'Keep boats or floating devices in flood-prone villages',
  'Store food and medicine in elevated areas',
  'Learn to identify safe drinking water sources during floods',
  'Know locations of relief camps and medical centers'
]);