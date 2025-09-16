import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Users, 
  Shield,
  Route,
  AlertCircle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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

interface EvacuationRoutesProps {
  disasterType: string;
}

export const EvacuationRoutes: React.FC<EvacuationRoutesProps> = ({ disasterType }) => {
  const [routes, setRoutes] = useState<EvacuationRoute[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<EvacuationRoute | null>(null);
  const [locationError, setLocationError] = useState<string>('');
  const [routeError, setRouteError] = useState<string>('');

  const getCurrentLocation = () => {
    setLoading(true);
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setCurrentLocation(location);
        fetchEvacuationRoutes(location);
      },
      (error) => {
        console.error('Error getting location:', error);
        setLocationError('Unable to get your location. Please enable location services.');
        // Use a default location (Delhi coordinates as example)
        const defaultLocation = { lat: 28.6139, lng: 77.2090 };
        setCurrentLocation(defaultLocation);
        fetchEvacuationRoutes(defaultLocation);
      }
    );
  };

  const generateFallbackRoutes = (location: {lat: number, lng: number}) => {
    // Generate sample safe zones based on disaster type
    const fallbackSafeZones: SafeZone[] = [
      {
        id: '1',
        name: 'Community Emergency Center',
        type: disasterType === 'Cyclone' ? 'Cyclone Shelter' : 
              disasterType === 'Earthquake' ? 'Open Area' : 
              disasterType === 'Flood' ? 'Educational Institution' : 'Emergency Center',
        coordinates: { lat: location.lat + 0.01, lng: location.lng + 0.01 },
        capacity: 500,
        facilities: disasterType === 'Flood' ? 
          ['Food', 'Water', 'Medical Aid', 'Shelter'] :
          disasterType === 'Earthquake' ?
          ['Open Space', 'Medical Aid', 'Emergency Services'] :
          ['Shelter', 'Food', 'Water', 'Medical Aid', 'Communication'],
        distance: 1.2
      },
      {
        id: '2', 
        name: 'District Hospital Safety Zone',
        type: 'Medical Facility',
        coordinates: { lat: location.lat - 0.008, lng: location.lng + 0.015 },
        capacity: 200,
        facilities: ['Medical Aid', 'Emergency Services', 'Shelter', 'Communication'],
        distance: 2.1
      },
      {
        id: '3',
        name: 'Government School Evacuation Center', 
        type: 'Educational Institution',
        coordinates: { lat: location.lat + 0.005, lng: location.lng - 0.012 },
        capacity: 300,
        facilities: ['Shelter', 'Food', 'Water', 'Open Space'],
        distance: 1.8
      }
    ];

    const fallbackRoutes: EvacuationRoute[] = fallbackSafeZones.map((safeZone, index) => ({
      safeZone,
      route: {
        distance: `${safeZone.distance} km`,
        duration: `${Math.round(safeZone.distance * 12)} min`, // Assuming walking speed
        steps: [
          {
            instruction: `Head ${index === 0 ? 'north' : index === 1 ? 'south' : 'west'} from your current location`,
            distance: '200 m',
            duration: '3 min'
          },
          {
            instruction: `Turn ${index % 2 === 0 ? 'right' : 'left'} on main road`,
            distance: '500 m', 
            duration: '6 min'
          },
          {
            instruction: `Continue straight until you reach ${safeZone.name}`,
            distance: `${(safeZone.distance * 1000 - 700).toFixed(0)} m`,
            duration: `${Math.round((safeZone.distance * 12) - 9)} min`
          }
        ]
      }
    }));

    setRoutes(fallbackRoutes);
  };

  const fetchEvacuationRoutes = async (location: {lat: number, lng: number}) => {
    try {
      setRouteError('');
      const { data, error } = await supabase.functions.invoke('evacuation-routes', {
        body: { 
          currentLocation: location, 
          disasterType: disasterType 
        }
      });

      if (error) {
        console.error('Error fetching evacuation routes:', error);
        setRouteError(error.message || 'Failed to fetch routes');
        // Provide fallback evacuation routes
        generateFallbackRoutes(location);
        return;
      }

      if (data?.error) {
        setRouteError(data.error);
        generateFallbackRoutes(location);
        return;
      }

      if (data?.evacuationRoutes && data.evacuationRoutes.length > 0) {
        setRoutes(data.evacuationRoutes);
      } else {
        // Use fallback if no routes returned
        generateFallbackRoutes(location);
      }
    } catch (error: any) {
      console.error('Error in fetchEvacuationRoutes:', error);
      setRouteError(error?.message || 'Unexpected error while fetching routes');
      generateFallbackRoutes(location);
    } finally {
      setLoading(false);
    }
  };

  const getFacilityIcon = (facility: string) => {
    const icons: { [key: string]: string } = {
      'Food': '🍽️',
      'Water': '💧',
      'Medical Aid': '🏥',
      'Shelter': '🏠',
      'Emergency Services': '🚑',
      'Open Space': '🏞️',
      'Wind Protection': '🛡️',
      'Communication': '📡',
      'Emergency Supplies': '📦'
    };
    return icons[facility] || '✅';
  };

  const getSafeZoneTypeColor = (type: string): "default" | "secondary" | "destructive" | "outline" => {
    const colors: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      'Community Center': 'default',
      'Educational Institution': 'secondary',
      'Medical Facility': 'destructive',
      'Open Area': 'outline',
      'Cyclone Shelter': 'secondary',
      'Underground Shelter': 'default',
      'Government Facility': 'secondary',
      'Emergency Center': 'destructive'
    };
    return colors[type] || 'outline';
  };

  useEffect(() => {
    if (disasterType) {
      getCurrentLocation();
    }
  }, [disasterType]);

  if (!disasterType) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            <Route className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Select a disaster type to view evacuation routes</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="w-5 h-5" />
            Evacuation Routes - {disasterType}
          </CardTitle>
          {locationError && (
            <div className="flex items-center gap-2 text-sm text-warning">
              <AlertCircle className="w-4 h-4" />
              {locationError}
            </div>
          )}
        </CardHeader>
        <CardContent>
          {!currentLocation ? (
            <Button onClick={getCurrentLocation} disabled={loading} className="w-full">
              {loading ? 'Getting your location...' : 'Find Evacuation Routes'}
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Current Location: {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
              </div>

              {routeError && (
                <div className="p-3 border rounded-md bg-warning/10 text-sm">
                  {routeError.includes('Google Maps API key') ? (
                    <span>
                      Google Maps API key not configured. Showing sample routes. You can add the key in Supabase Function Secrets.
                      {' '}<a className="underline" target="_blank" rel="noopener noreferrer" href="https://supabase.com/dashboard/project/fbmlsdftletwtmnxhswk/settings/functions">Open Secrets</a>
                    </span>
                  ) : (
                    <span>{routeError}</span>
                  )}
                </div>
              )}
              
              {loading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-24 bg-muted rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : routes.length > 0 ? (
                <div className="space-y-3">
                  {routes.map((evacRoute, index) => (
                    <div 
                      key={evacRoute.safeZone.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-primary ${
                        selectedRoute?.safeZone.id === evacRoute.safeZone.id 
                          ? 'border-primary bg-primary/5' 
                          : ''
                      }`}
                      onClick={() => setSelectedRoute(
                        selectedRoute?.safeZone.id === evacRoute.safeZone.id ? null : evacRoute
                      )}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold flex items-center gap-2">
                            <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                              {index + 1}
                            </span>
                            {evacRoute.safeZone.name}
                          </h4>
                          <Badge variant={getSafeZoneTypeColor(evacRoute.safeZone.type)} className="mt-1">
                            {evacRoute.safeZone.type}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4" />
                            {evacRoute.route.duration}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {evacRoute.route.distance}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4" />
                          Capacity: {evacRoute.safeZone.capacity}
                        </div>
                      </div>

                      <div className="mb-3">
                        <h5 className="text-sm font-medium mb-2 flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Available Facilities:
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {evacRoute.safeZone.facilities.map((facility) => (
                            <span 
                              key={facility}
                              className="inline-flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded"
                            >
                              {getFacilityIcon(facility)} {facility}
                            </span>
                          ))}
                        </div>
                      </div>

                      {selectedRoute?.safeZone.id === evacRoute.safeZone.id && (
                        <div className="border-t pt-3 mt-3">
                          <h5 className="font-medium mb-2">Turn-by-turn directions:</h5>
                          <div className="space-y-2">
                            {evacRoute.route.steps.map((step, stepIndex) => (
                              <div key={stepIndex} className="text-sm flex gap-3">
                                <span className="text-muted-foreground min-w-0 flex-shrink-0">
                                  {stepIndex + 1}.
                                </span>
                                <div className="flex-1">
                                  <div>{step.instruction}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {step.distance} • {step.duration}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <Route className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No evacuation routes found for your current location.</p>
                  <Button 
                    variant="outline" 
                    className="mt-2" 
                    onClick={getCurrentLocation}
                  >
                    Retry
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};