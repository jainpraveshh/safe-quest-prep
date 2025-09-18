import { createContext, useContext, useState, ReactNode } from 'react';

export type AgeGroup = 'primary' | 'middle' | 'high' | 'adults' | null;

interface AgeGroupContextType {
  ageGroup: AgeGroup;
  setAgeGroup: (group: AgeGroup) => void;
  theme: string;
}

const AgeGroupContext = createContext<AgeGroupContextType | undefined>(undefined);

const getThemeClass = (ageGroup: AgeGroup): string => {
  switch (ageGroup) {
    case 'primary': return 'theme-kids';
    case 'middle': return 'theme-middle';
    case 'high': return 'theme-high';
    case 'adults': return 'theme-adults';
    default: return '';
  }
};

export const AgeGroupProvider = ({ children }: { children: ReactNode }) => {
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(null);
  const theme = getThemeClass(ageGroup);

  return (
    <AgeGroupContext.Provider value={{ ageGroup, setAgeGroup, theme }}>
      <div className={theme}>
        {children}
      </div>
    </AgeGroupContext.Provider>
  );
};

export const useAgeGroup = () => {
  const context = useContext(AgeGroupContext);
  if (!context) {
    throw new Error('useAgeGroup must be used within AgeGroupProvider');
  }
  return context;
};