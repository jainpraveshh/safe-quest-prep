import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DisasterContent, getAgeAppropriateContent } from '@/data/disasterContent';

interface DisasterContentCardProps {
  disaster: DisasterContent;
  ageGroup: 'primary' | 'middle' | 'high' | 'adult';
  onStartDrill: (disasterId: string) => void;
  isCompleted?: boolean;
  className?: string;
}

export const DisasterContentCard = ({ 
  disaster, 
  ageGroup, 
  onStartDrill, 
  isCompleted = false,
  className = "" 
}: DisasterContentCardProps) => {
  const content = getAgeAppropriateContent(disaster, ageGroup);

  const getAgeGroupStyle = () => {
    switch (ageGroup) {
      case 'primary':
        return 'border-4 border-white shadow-xl hover:shadow-2xl transform hover:-translate-y-2 cursor-pointer bg-gradient-to-br';
      case 'middle':
        return 'border-2 border-purple-300 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer bg-gradient-to-br';
      case 'high':
        return 'border border-blue-300 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br';
      case 'adult':
        return 'border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer bg-white';
    }
  };

  const getTextStyles = () => {
    switch (ageGroup) {
      case 'primary':
        return {
          title: 'text-2xl font-bold text-gray-800',
          cause: 'text-lg text-gray-700 font-semibold',
          emoji: 'text-8xl animate-pulse'
        };
      case 'middle':
        return {
          title: 'text-xl font-bold text-gray-800',
          cause: 'text-base text-gray-700',
          emoji: 'text-6xl'
        };
      case 'high':
        return {
          title: 'text-lg font-semibold text-gray-800',
          cause: 'text-sm text-gray-600',
          emoji: 'text-5xl'
        };
      case 'adult':
        return {
          title: 'text-lg font-medium text-gray-900',
          cause: 'text-sm text-gray-700',
          emoji: 'text-4xl'
        };
    }
  };

  const styles = getTextStyles();

  return (
    <Card className={`${disaster.color} ${getAgeGroupStyle()} ${className}`}>
      <CardHeader className="text-center">
        <div className={`mb-4 ${styles.emoji}`}>
          {disaster.emoji}
        </div>
        <CardTitle className={styles.title}>
          {disaster.title}
        </CardTitle>
        {isCompleted && (
          <Badge className="mt-2 bg-green-500 text-white font-bold">
            ⭐ Completed!
          </Badge>
        )}
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="why" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="why">Why it Occurs</TabsTrigger>
            <TabsTrigger value="actions">What to Do</TabsTrigger>
            <TabsTrigger value="drill">Practice Drill</TabsTrigger>
          </TabsList>
          
          <TabsContent value="why" className="mt-4">
            <div className="bg-white/60 p-4 rounded-lg">
              <h4 className="font-bold mb-2 text-gray-800">Why {disaster.title.split(' ')[0]}s Happen:</h4>
              <p className={styles.cause}>{content.cause}</p>
            </div>
          </TabsContent>
          
          <TabsContent value="actions" className="mt-4">
            <div className="space-y-3">
              <div className="bg-white/60 p-3 rounded-lg">
                <h5 className="font-bold text-green-700 mb-2">Before:</h5>
                <ul className="text-sm space-y-1">
                  {content.actions.before.map((action, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-2">✓</span>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white/60 p-3 rounded-lg">
                <h5 className="font-bold text-red-700 mb-2">During:</h5>
                <ul className="text-sm space-y-1">
                  {content.actions.during.map((action, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-2">⚠️</span>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white/60 p-3 rounded-lg">
                <h5 className="font-bold text-blue-700 mb-2">After:</h5>
                <ul className="text-sm space-y-1">
                  {content.actions.after.map((action, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-2">🔄</span>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="drill" className="mt-4">
            <div className="bg-white/60 p-4 rounded-lg">
              <h4 className="font-bold mb-3 text-gray-800">Practice Steps:</h4>
              <ol className="space-y-2">
                {content.drillSteps.map((step, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <span className="font-bold text-blue-600 mr-2">{index + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
              
              <Button 
                onClick={() => onStartDrill(disaster.id)}
                className={`w-full mt-4 ${
                  ageGroup === 'primary' 
                    ? 'bg-gradient-to-r from-green-400 to-blue-400 text-white font-bold text-lg py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105'
                    : ageGroup === 'middle'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold'
                    : ageGroup === 'high'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {ageGroup === 'primary' ? 'Start Practice! 🌟' : 'Start Drill Practice'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};