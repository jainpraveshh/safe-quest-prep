import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, MapPin, Shield, Lightbulb } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface RegionalDisaster {
  id: string;
  region: string;
  disaster_type: string;
  severity: string;
  description: string;
  preparedness_tips: string[];
}

export const RegionalDisasterAwareness = () => {
  const { profile } = useAuth();
  const [disasters, setDisasters] = useState<RegionalDisaster[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.region) {
      fetchRegionalDisasters(profile.region);
    }
  }, [profile?.region]);

  const fetchRegionalDisasters = async (region: string) => {
    try {
      const { data, error } = await supabase
        .from('regional_disasters')
        .select('*')
        .eq('region', region)
        .order('severity', { ascending: false });

      if (error) {
        console.error('Error fetching regional disasters:', error);
      } else {
        setDisasters(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getDisasterIcon = (type: string) => {
    switch (type) {
      case 'earthquake': return '🏠';
      case 'flood': return '🌊';
      case 'cyclone': return '🌪️';
      case 'fire': return '🔥';
      case 'landslide': return '⛰️';
      case 'heatwave': return '🌡️';
      case 'drought': return '🏜️';
      default: return '⚠️';
    }
  };

  if (!profile) {
    return null;
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Regional Disaster Awareness
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <MapPin className="w-5 h-5" />
          {profile.region} - Regional Disaster Awareness
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {disasters.length === 0 ? (
          <Alert>
            <Shield className="w-4 h-4" />
            <AlertDescription>
              No specific disaster alerts for {profile.region} at this time. Stay prepared!
            </AlertDescription>
          </Alert>
        ) : (
          disasters.map((disaster) => (
            <Card key={disaster.id} className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getDisasterIcon(disaster.disaster_type)}</span>
                    <div>
                      <h4 className="font-semibold capitalize text-gray-900">
                        {disaster.disaster_type.replace('_', ' ')}
                      </h4>
                      <Badge className={`${getSeverityColor(disaster.severity)} text-white text-xs`}>
                        {disaster.severity.toUpperCase()} RISK
                      </Badge>
                    </div>
                  </div>
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-700 mb-3">{disaster.description}</p>
                
                <div className="space-y-2">
                  <h5 className="font-medium flex items-center gap-1 text-emerald-700">
                    <Lightbulb className="w-4 h-4" />
                    Preparedness Tips:
                  </h5>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                    {disaster.preparedness_tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </CardContent>
    </Card>
  );
};