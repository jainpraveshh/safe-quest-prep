import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, MapPin, Clock, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface DisasterAlert {
  id: string;
  type: string;
  severity: string;
  region: string;
  description: string;
  timestamp: string;
  source: string;
}

interface AlertsData {
  alerts: DisasterAlert[];
  lastUpdated: string;
  region: string;
}

export const DisasterAlertsPanel: React.FC = () => {
  const [alertsData, setAlertsData] = useState<AlertsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { profile } = useAuth();

  const fetchAlerts = async () => {
    const region = profile?.region || 'Delhi';
    try {
      setRefreshing(true);
      const { data, error } = await supabase.functions.invoke('disaster-alerts', {
        body: { region }
      });

      if (error) {
        console.error('Error fetching disaster alerts:', error);
        setAlertsData({ alerts: [], lastUpdated: new Date().toISOString(), region });
        return;
      }

      setAlertsData(data as AlertsData);
    } catch (error) {
      console.error('Error in fetchAlerts:', error);
      setAlertsData({ alerts: [], lastUpdated: new Date().toISOString(), region });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchAlerts, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [profile?.region]);

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'red': return 'destructive';
      case 'orange': return 'destructive';
      case 'yellow': return 'secondary';
      default: return 'outline';
    }
  };

  const getDisasterIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      'flood': '🌊',
      'earthquake': '🏚️', 
      'cyclone': '🌪️',
      'fire': '🔥',
      'heat wave': '🌡️',
      'heavy rainfall': '🌧️'
    };
    return icons[type.toLowerCase()] || '⚠️';
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    } else if (diffMinutes < 1440) {
      return `${Math.floor(diffMinutes / 60)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Loading Disaster Alerts...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Live Disaster Alerts
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchAlerts}
            disabled={refreshing}
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        {alertsData && (
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {alertsData.region} • Last updated: {formatTimestamp(alertsData.lastUpdated)}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {alertsData?.alerts && alertsData.alerts.length > 0 ? (
          alertsData.alerts.map((alert) => (
            <div 
              key={alert.id} 
              className="border rounded-lg p-4 space-y-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getDisasterIcon(alert.type)}</span>
                  <div>
                    <h4 className="font-semibold">{alert.type}</h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTimestamp(alert.timestamp)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant={getSeverityColor(alert.severity)}>
                    {alert.severity}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{alert.source}</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed">{alert.description}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-6">
            <div className="text-4xl mb-2">✅</div>
            <h4 className="font-medium text-muted-foreground">No active alerts</h4>
            <p className="text-sm text-muted-foreground">
              All clear in {profile?.region || 'your region'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};