export interface DisasterContent {
  id: string;
  title: string;
  emoji: string;
  color: string;
  causes: {
    primary: string;
    middle: string;
    high: string;
    adult: string;
  };
  actions: {
    before: string[];
    during: string[];
    after: string[];
  };
  drillSteps: {
    primary: string[];
    middle: string[];
    high: string[];
    adult: string[];
  };
}

export const disasterData: DisasterContent[] = [
  {
    id: 'fire',
    title: 'Fire Safety',
    emoji: '🔥',
    color: 'from-red-200 to-orange-200',
    causes: {
      primary: "Fires start when something hot touches things that can burn, like paper or wood. Sometimes people forget to turn off stoves or leave candles burning.",
      middle: "Fires happen when heat, fuel (like wood or paper), and oxygen come together. Common causes include electrical problems, cooking accidents, or leaving heat sources unattended.",
      high: "Fire occurs through a chemical reaction called combustion, requiring heat, fuel, and oxygen (fire triangle). Causes include electrical short circuits, chemical reactions, friction, or human negligence.",
      adult: "Fire is a rapid oxidation process requiring heat, fuel, and oxygen. Common causes include electrical faults, cooking accidents, smoking materials, heating equipment, intentional acts, lightning, and industrial processes."
    },
    actions: {
      before: [
        "Install smoke detectors",
        "Create escape plan",
        "Keep fire extinguishers ready",
        "Check electrical wiring"
      ],
      during: [
        "Stay low to avoid smoke",
        "Feel doors before opening",
        "Use stairs, never elevators",
        "Call 101 immediately"
      ],
      after: [
        "Check for injuries",
        "Stay away from damaged areas",
        "Contact insurance company",
        "Get professional inspection"
      ]
    },
    drillSteps: {
      primary: [
        "🚨 Listen for fire alarm",
        "🚪 Feel the door - if hot, don't open!",
        "🐻 Crawl low like a bear under smoke",
        "🏃‍♀️ Walk quickly to exit door",
        "👨‍👩‍👧‍👦 Meet family at safe spot outside"
      ],
      middle: [
        "Activate fire alarm if you see fire",
        "Check door temperature before opening",
        "Stay low to avoid smoke inhalation",
        "Use primary or secondary escape route",
        "Assist others if safe to do so",
        "Meet at designated assembly point"
      ],
      high: [
        "Assess situation and alert others",
        "Follow RACE protocol (Rescue, Alarm, Contain, Evacuate)",
        "Use appropriate fire extinguisher if trained",
        "Maintain situational awareness",
        "Account for all occupants",
        "Provide information to emergency responders"
      ],
      adult: [
        "Conduct risk assessment",
        "Implement emergency response procedures",
        "Coordinate evacuation of all occupants",
        "Use fire suppression equipment if safe",
        "Communicate with emergency services",
        "Document incident for investigation"
      ]
    }
  },
  {
    id: 'flood',
    title: 'Flood Safety',
    emoji: '🌊',
    color: 'from-blue-200 to-cyan-200',
    causes: {
      primary: "Floods happen when there's too much rain or water that can't go away fast enough. Rivers can overflow and water comes into our homes and streets.",
      middle: "Floods occur when water accumulates faster than it can drain away. Causes include heavy rainfall, river overflow, dam failures, or blocked drainage systems.",
      high: "Flooding results from hydrological imbalances where water input exceeds drainage capacity. Causes include meteorological factors, topographical features, and human activities affecting water flow.",
      adult: "Floods are caused by meteorological events (heavy rainfall, cyclones), hydrological factors (river overflow, dam failure), topographical conditions, urbanization effects, and climate change impacts."
    },
    actions: {
      before: [
        "Create emergency kit",
        "Identify higher ground",
        "Waterproof important documents",
        "Install flood barriers"
      ],
      during: [
        "Move to higher ground immediately",
        "Avoid walking in moving water",
        "Don't drive through flooded roads",
        "Listen to emergency broadcasts"
      ],
      after: [
        "Check for contamination",
        "Document damage with photos",
        "Clean and disinfect everything",
        "Contact authorities for help"
      ]
    },
    drillSteps: {
      primary: [
        "🌧️ Listen for flood warnings",
        "🎒 Grab emergency bag",
        "⬆️ Go to highest floor in house",
        "📱 Tell adults to call for help",
        "🤝 Stay together with family"
      ],
      middle: [
        "Monitor weather alerts and warnings",
        "Gather emergency supplies and family",
        "Move to highest available level",
        "Avoid flooded areas and moving water",
        "Signal for help if trapped",
        "Follow evacuation orders immediately"
      ],
      high: [
        "Monitor meteorological and hydrological data",
        "Implement flood response protocol",
        "Secure property and evacuate if necessary",
        "Assist in community response efforts",
        "Document conditions for authorities",
        "Avoid contaminated flood water"
      ],
      adult: [
        "Implement comprehensive flood management plan",
        "Coordinate with local emergency services",
        "Manage evacuation procedures",
        "Assess infrastructure risks",
        "Document damage for insurance claims",
        "Lead community recovery efforts"
      ]
    }
  },
  {
    id: 'earthquake',
    title: 'Earthquake Safety',
    emoji: '🏚️',
    color: 'from-yellow-200 to-amber-200',
    causes: {
      primary: "Earthquakes happen when big pieces of rock under the ground move and bump into each other. This makes the ground shake.",
      middle: "Earthquakes occur when tectonic plates in Earth's crust move and collide. The sudden release of energy creates seismic waves that make the ground shake.",
      high: "Earthquakes result from sudden release of energy in Earth's lithosphere, primarily due to tectonic plate movement, fault line displacement, and stress accumulation in rock formations.",
      adult: "Earthquakes are caused by tectonic plate interactions, fault line movements, volcanic activity, and human activities like mining or reservoir-induced seismicity, releasing seismic energy through the Earth's crust."
    },
    actions: {
      before: [
        "Secure heavy furniture",
        "Create emergency kits",
        "Identify safe spots",
        "Practice drop drills"
      ],
      during: [
        "Drop, Cover, and Hold On",
        "Stay away from windows",
        "Don't run outside during shaking",
        "Protect head and neck"
      ],
      after: [
        "Check for injuries",
        "Inspect for damage",
        "Be prepared for aftershocks",
        "Listen to emergency broadcasts"
      ]
    },
    drillSteps: {
      primary: [
        "🛡️ DROP to hands and knees",
        "🪑 COVER under desk or table",
        "🤝 HOLD ON tight!",
        "🙈 Protect head with arms if no table",
        "⏰ Count to 60 then carefully get up"
      ],
      middle: [
        "Immediately DROP to hands and knees",
        "Take COVER under sturdy furniture",
        "HOLD ON and protect head/neck",
        "Stay in position until shaking stops",
        "Carefully evacuate if building is damaged",
        "Watch for aftershocks"
      ],
      high: [
        "Execute Drop, Cover, Hold On protocol",
        "Assess structural integrity of building",
        "Coordinate evacuation if necessary",
        "Check for hazards (gas leaks, electrical)",
        "Provide first aid to injured",
        "Prepare for potential aftershocks"
      ],
      adult: [
        "Implement seismic safety procedures",
        "Conduct structural damage assessment",
        "Coordinate emergency response",
        "Shut off utilities if damaged",
        "Organize search and rescue if needed",
        "Establish communication with authorities"
      ]
    }
  },
  {
    id: 'cyclone',
    title: 'Cyclone Safety',
    emoji: '🌪️',
    color: 'from-purple-200 to-pink-200',
    causes: {
      primary: "Cyclones are like giant spinning storms that form over warm ocean water. The warm water makes the air spin faster and faster like a spinning top.",
      middle: "Cyclones form when warm, moist air rises from ocean surfaces, creating low pressure. Earth's rotation causes the air to spin, forming a circular storm system.",
      high: "Cyclones develop through the Coriolis effect acting on low-pressure systems over warm ocean waters (>26.5°C), with atmospheric instability and low wind shear creating rotating storm systems.",
      adult: "Tropical cyclones form when multiple atmospheric and oceanic conditions align: warm sea surface temperatures, low wind shear, sufficient Coriolis force, atmospheric instability, and pre-existing weather disturbances."
    },
    actions: {
      before: [
        "Monitor weather warnings",
        "Stock emergency supplies",
        "Secure outdoor items",
        "Board up windows"
      ],
      during: [
        "Stay indoors away from windows",
        "Go to interior room on lowest floor",
        "Listen to weather updates",
        "Wait for all-clear signal"
      ],
      after: [
        "Wait for authorities' all-clear",
        "Watch for flooding",
        "Avoid downed power lines",
        "Help neighbors safely"
      ]
    },
    drillSteps: {
      primary: [
        "🏠 Go to safe room inside house",
        "🪟 Stay away from windows",
        "📻 Listen to weather radio with adults",
        "🧸 Bring comfort items and stay calm",
        "⏳ Wait until adults say it's safe"
      ],
      middle: [
        "Move to interior room on lowest floor",
        "Avoid windows and glass doors",
        "Monitor weather updates continuously",
        "Prepare for extended sheltering",
        "Stay calm and help family members",
        "Don't go outside until officially safe"
      ],
      high: [
        "Implement cyclone preparedness plan",
        "Secure all outdoor equipment and furniture",
        "Monitor meteorological data and warnings",
        "Coordinate with emergency services",
        "Manage shelter operations effectively",
        "Assess damage only when safe to do so"
      ],
      adult: [
        "Execute comprehensive cyclone response plan",
        "Coordinate community shelter arrangements",
        "Monitor multiple information sources",
        "Manage post-storm damage assessment",
        "Coordinate with emergency management",
        "Lead community recovery efforts"
      ]
    }
  }
];

export const getDisasterContent = (disasterId: string): DisasterContent | undefined => {
  return disasterData.find(disaster => disaster.id === disasterId);
};

export const getAgeAppropriateContent = (disaster: DisasterContent, ageGroup: 'primary' | 'middle' | 'high' | 'adult') => {
  return {
    cause: disaster.causes[ageGroup],
    drillSteps: disaster.drillSteps[ageGroup],
    actions: disaster.actions
  };
};