import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GOOGLE_MAPS_API_KEY = Deno.env.get('GOOGLE_MAPS_API_KEY');

interface SafeZone {
  id: string;
  name: string;
  type: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  capacity: number;
  facilities: string[];
  distance: number;
}

interface EvacuationRoute {
  safeZone: SafeZone;
  route: {
    distance: string;
    duration: string;
    steps: Array<{
      instruction: string;
      distance: string;
      duration: string;
    }>;
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { currentLocation, disasterType } = await req.json();
    
    if (!GOOGLE_MAPS_API_KEY) {
      throw new Error('Google Maps API key not configured');
    }

    console.log(`Finding evacuation routes from ${JSON.stringify(currentLocation)} for ${disasterType}`);

    // Get nearby safe zones based on disaster type
    const safeZones = await findSafeZones(currentLocation, disasterType);
    
    // Get routes to each safe zone
    const evacuationRoutes: EvacuationRoute[] = [];
    
    for (const safeZone of safeZones) {
      try {
        const route = await getRouteToSafeZone(currentLocation, safeZone);
        if (route) {
          evacuationRoutes.push({
            safeZone,
            route
          });
        }
      } catch (error) {
        console.error(`Error getting route to ${safeZone.name}:`, error);
      }
    }

    // Sort by distance/duration
    evacuationRoutes.sort((a, b) => {
      const aDuration = parseFloat(a.route.duration.replace(/[^\d.]/g, ''));
      const bDuration = parseFloat(b.route.duration.replace(/[^\d.]/g, ''));
      return aDuration - bDuration;
    });

    return new Response(
      JSON.stringify({ 
        evacuationRoutes: evacuationRoutes.slice(0, 3), // Top 3 routes
        currentLocation,
        disasterType,
        lastUpdated: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in evacuation-routes function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        evacuationRoutes: [],
        lastUpdated: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

async function findSafeZones(currentLocation: any, disasterType: string): Promise<SafeZone[]> {
  // In production, this would query a database of actual safe zones
  // For now, we'll generate some realistic safe zones based on location and disaster type
  
  const safeZones: SafeZone[] = [];
  
  // Generate safe zones based on disaster type
  const baseZones = getSafeZonesByDisasterType(disasterType);
  
  baseZones.forEach((zone, index) => {
    // Generate coordinates around the current location
    const offsetLat = (Math.random() - 0.5) * 0.02; // ~1km radius
    const offsetLng = (Math.random() - 0.5) * 0.02;
    
    safeZones.push({
      ...zone,
      id: `safe_zone_${index}`,
      coordinates: {
        lat: currentLocation.lat + offsetLat,
        lng: currentLocation.lng + offsetLng
      },
      distance: Math.random() * 5 + 1 // 1-6 km
    });
  });

  return safeZones;
}

function getSafeZonesByDisasterType(disasterType: string): Partial<SafeZone>[] {
  switch (disasterType.toLowerCase()) {
    case 'flood':
      return [
        {
          name: 'Community Center - High Ground',
          type: 'Community Center',
          capacity: 500,
          facilities: ['Food', 'Water', 'Medical Aid', 'Shelter']
        },
        {
          name: 'School Building - Upper Floors',
          type: 'Educational Institution',
          capacity: 300,
          facilities: ['Shelter', 'Restrooms', 'Basic Medical']
        },
        {
          name: 'Hospital Complex',
          type: 'Medical Facility',
          capacity: 200,
          facilities: ['Medical Care', 'Emergency Services', 'Food', 'Water']
        }
      ];
    
    case 'earthquake':
      return [
        {
          name: 'Open Ground - Sports Stadium',
          type: 'Open Area',
          capacity: 1000,
          facilities: ['Open Space', 'Emergency Services', 'First Aid']
        },
        {
          name: 'Park Area',
          type: 'Open Area',
          capacity: 800,
          facilities: ['Open Space', 'Water Source']
        },
        {
          name: 'Emergency Assembly Point',
          type: 'Designated Safe Zone',
          capacity: 600,
          facilities: ['Emergency Supplies', 'Communication', 'Medical Aid']
        }
      ];
    
    case 'cyclone':
      return [
        {
          name: 'Reinforced Building - Cyclone Shelter',
          type: 'Cyclone Shelter',
          capacity: 400,
          facilities: ['Wind Protection', 'Food', 'Water', 'Medical Aid']
        },
        {
          name: 'Underground Metro Station',
          type: 'Underground Shelter',
          capacity: 600,
          facilities: ['Wind Protection', 'Shelter', 'Emergency Services']
        },
        {
          name: 'Government Building Complex',
          type: 'Government Facility',
          capacity: 350,
          facilities: ['Secure Shelter', 'Communication', 'Emergency Supplies']
        }
      ];
    
    default:
      return [
        {
          name: 'Community Emergency Center',
          type: 'Emergency Center',
          capacity: 400,
          facilities: ['Shelter', 'Food', 'Water', 'Medical Aid']
        },
        {
          name: 'Local Government Office',
          type: 'Government Facility',
          capacity: 200,
          facilities: ['Shelter', 'Communication', 'Emergency Services']
        }
      ];
  }
}

async function getRouteToSafeZone(origin: any, safeZone: SafeZone): Promise<any> {
  try {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${safeZone.coordinates.lat},${safeZone.coordinates.lng}&mode=walking&key=${GOOGLE_MAPS_API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'OK' && data.routes.length > 0) {
      const route = data.routes[0].legs[0];
      
      return {
        distance: route.distance.text,
        duration: route.duration.text,
        steps: route.steps.slice(0, 5).map((step: any) => ({
          instruction: step.html_instructions.replace(/<[^>]*>/g, ''),
          distance: step.distance.text,
          duration: step.duration.text
        }))
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching route from Google Maps:', error);
    // Return a fallback route
    return {
      distance: `${safeZone.distance.toFixed(1)} km`,
      duration: `${Math.ceil(safeZone.distance * 12)} min`,
      steps: [
        {
          instruction: `Head towards ${safeZone.name}`,
          distance: `${safeZone.distance.toFixed(1)} km`,
          duration: `${Math.ceil(safeZone.distance * 12)} min`
        }
      ]
    };
  }
}