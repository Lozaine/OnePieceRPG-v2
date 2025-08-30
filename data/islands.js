module.exports = {
    'Shells Town': {
        name: 'Shells Town',
        description: 'A town dominated by a foreboding Marine base, ruled by the iron fist of Captain "Axe-Hand" Morgan. The townspeople live in fear, but whispers of change are beginning to spread.',
        atmosphere: 'Oppressive and militaristic',
        dangerLevel: 'Low',
        locations: [
            {
                id: 'marine_base_investigate',
                label: '🔍 Investigate Marine Base',
                description: 'Search for evidence of corruption within the base',
                condition: (player) => {
                    return player.character?.origin === 'marine' && 
                           player.progression?.msq?.step === 1;
                },
                requirements: {
                    minPower: 0,
                    maxPower: 999
                }
            },
            {
                id: 'marine_base_report',
                label: '📋 Report to Lt. Rokkaku',
                description: 'Share your findings with the sympathetic lieutenant',
                condition: (player) => {
                    return player.character?.origin === 'marine' && 
                           player.progression?.msq?.step === 2;
                }
            }
        ],
    },
    'Syrup Village': {
        name: 'Syrup Village',
        description: 'A peaceful, quiet village on the Gecko Islands. Known for its lush vegetation and the grand mansion overlooking the town. The villagers are kind but seem troubled by recent strange occurrences.',
        atmosphere: 'Peaceful but mysterious',
        dangerLevel: 'Low',
        locations: [
            {
                id: 'mansion_visit',
                label: '🏛️ Visit the Mansion',
                description: 'Investigate the grand mansion and meet its inhabitants',
                condition: (player) => {
                    return player.character?.origin === 'pirate' && 
                           player.progression?.msq?.step === 1;
                },
            },
            {
                id: 'mansion_investigate',
                label: '🕵️ Investigate Suspicious Activity',
                description: 'Look deeper into the mansion\'s secrets',
                condition: (player) => {
                    return player.character?.origin === 'pirate' && 
                           player.progression?.msq?.step === 2;
                }
            },
            {
                id: 'village_explore',
                label: '🚶 Explore Village',
                description: 'Talk to locals and gather information',
                condition: (player) => {
                    return player.character?.origin === 'pirate' && 
                           player.progression?.msq?.step >= 1;
                }
            }
        ],
    },
    'Ohara Ruins': {
        name: 'Ohara Ruins',
        description: 'The somber ruins of what was once a center of learning. The massive Tree of Knowledge stands as a silent testament to the tragedy that befell this island. Ancient secrets still lie buried among the rubble.',
        atmosphere: 'Melancholic and mysterious',
        dangerLevel: 'Medium',
        locations: [
            {
                id: 'ruins_search',
                label: '🔍 Search Ancient Ruins',
                description: 'Look for the hidden scholar\'s message',
                condition: (player) => {
                    return player.character?.origin === 'revolutionary' && 
                           player.progression?.msq?.step === 1;
                },
            },
            {
                id: 'tree_of_knowledge',
                label: '🌳 Examine Tree of Knowledge',
                description: 'Study the burned but still standing great tree',
                condition: (player) => {
                    return player.character?.origin === 'revolutionary' && 
                           player.progression?.msq?.step >= 1;
                }
            },
            {
                id: 'preserve_evidence',
                label: '📜 Preserve Evidence',
                description: 'Find a safe way to preserve your discoveries',
                condition: (player) => {
                    return player.character?.origin === 'revolutionary' && 
                           player.progression?.msq?.step === 2;
                }
            }
        ],
    },
    'The Baratie': {
        name: 'The Baratie',
        description: 'A legendary floating restaurant in the shape of a fish, known throughout East Blue for its delicious food and fighting chefs. The sound of clashing pans and swords fills the air as culinary battles rage alongside epic meals.',
        atmosphere: 'Lively and competitive',
        dangerLevel: 'Medium',
        locations: [
            {
                id: 'baratie_apply',
                label: '👨‍🍳 Apply for Kitchen Job',
                description: 'Try to earn a position in the famous kitchen',
                condition: (player) => {
                    return player.character?.origin === 'neutral' && 
                           player.progression?.msq?.step === 1;
                },
            },
            {
                id: 'kitchen_trial',
                label: '⚔️ Kitchen Combat Trial',
                description: 'Prove yourself in both cooking and fighting',
                condition: (player) => {
                    return player.character?.origin === 'neutral' && 
                           player.progression?.msq?.step === 2;
                }
            },
            {
                id: 'dining_area',
                label: '🍽️ Serve Customers',
                description: 'Work in the dining area and meet interesting patrons',
                condition: (player) => {
                    return player.character?.origin === 'neutral' && 
                           player.progression?.msq?.step >= 1;
                }
            }
        ],
    },
};