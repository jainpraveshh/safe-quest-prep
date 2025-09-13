import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DisasterAlert {
  id: string;
  type: string;
  severity: string;
  region: string;
  description: string;
  timestamp: string;
  source: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { region } = await req.json();
    console.log(`Fetching disaster alerts for region: ${region}`);

    // Fetch NDMA SACHET alerts
    let ndmaAlerts: DisasterAlert[] = [];
    try {
      // Note: SACHET doesn't have a direct public API, so we'll simulate
      // In a real implementation, you'd integrate with official APIs
      console.log('Fetching NDMA SACHET alerts...');
      ndmaAlerts = await fetchNDMAAlerts(region);
    } catch (error) {
      console.error('Error fetching NDMA alerts:', error);
    }

    // Fetch IMD weather warnings
    let imdAlerts: DisasterAlert[] = [];
    try {
      console.log('Fetching IMD weather warnings...');
      imdAlerts = await fetchIMDAlerts(region);
    } catch (error) {
      console.error('Error fetching IMD alerts:', error);
    }

    // Combine all alerts
    const allAlerts = [...ndmaAlerts, ...imdAlerts];

    // Sort by severity and timestamp
    allAlerts.sort((a, b) => {
      const severityOrder = { 'Red': 0, 'Orange': 1, 'Yellow': 2, 'Green': 3 };
      const aSeverity = severityOrder[a.severity as keyof typeof severityOrder] || 4;
      const bSeverity = severityOrder[b.severity as keyof typeof severityOrder] || 4;
      
      if (aSeverity !== bSeverity) {
        return aSeverity - bSeverity;
      }
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    return new Response(
      JSON.stringify({ 
        alerts: allAlerts,
        lastUpdated: new Date().toISOString(),
        region: region 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in disaster-alerts function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        alerts: [],
        lastUpdated: new Date().toISOString() 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

async function fetchNDMAAlerts(region: string): Promise<DisasterAlert[]> {
  // Since SACHET doesn't have a public API, we'll simulate alerts based on region
  // In production, you'd integrate with the official NDMA API endpoints
  
  const simulatedAlerts: DisasterAlert[] = [];
  
  // Add region-specific simulated alerts
  if (region.toLowerCase().includes('maharashtra') || region.toLowerCase().includes('mumbai')) {
    simulatedAlerts.push({
      id: 'ndma_001',
      type: 'Flood',
      severity: 'Orange',
      region: region,
      description: 'Heavy rainfall expected. Flash flood warning issued for low-lying areas.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      source: 'NDMA-SACHET'
    });
  }
  
  if (region.toLowerCase().includes('gujarat')) {
    simulatedAlerts.push({
      id: 'ndma_002',
      type: 'Cyclone',
      severity: 'Red',
      region: region,
      description: 'Severe cyclonic storm approaching coastal areas. Evacuation advised.',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      source: 'NDMA-SACHET'
    });
  }

  if (region.toLowerCase().includes('delhi') || region.toLowerCase().includes('ncr')) {
    simulatedAlerts.push({
      id: 'ndma_003',
      type: 'Earthquake',
      severity: 'Yellow',
      region: region,
      description: 'Minor tremors detected. No immediate threat, but stay alert.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      source: 'NDMA-SACHET'
    });
  }

  console.log(`Generated ${simulatedAlerts.length} NDMA alerts for ${region}`);
  return simulatedAlerts;
}

async function fetchIMDAlerts(region: string): Promise<DisasterAlert[]> {
  try {
    // Attempt to fetch from IMD - in practice, you'd need to parse their HTML/XML responses
    // For now, we'll simulate IMD weather alerts
    
    const simulatedAlerts: DisasterAlert[] = [];
    
    // Generate weather-based alerts for different regions
    if (region.toLowerCase().includes('kerala') || region.toLowerCase().includes('karnataka')) {
      simulatedAlerts.push({
        id: 'imd_001',
        type: 'Heavy Rainfall',
        severity: 'Orange',
        region: region,
        description: 'Very heavy rainfall (115.6-204.4 mm) likely at isolated places.',
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        source: 'IMD'
      });
    }
    
    if (region.toLowerCase().includes('rajasthan') || region.toLowerCase().includes('haryana')) {
      simulatedAlerts.push({
        id: 'imd_002',
        type: 'Heat Wave',
        severity: 'Red',
        region: region,
        description: 'Severe heat wave conditions prevailing. Temperature above 45°C expected.',
        timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
        source: 'IMD'
      });
    }

    console.log(`Generated ${simulatedAlerts.length} IMD alerts for ${region}`);
    return simulatedAlerts;
  } catch (error) {
    console.error('Error in fetchIMDAlerts:', error);
    return [];
  }
}