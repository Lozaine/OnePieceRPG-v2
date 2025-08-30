module.exports = {
    'Shells Town': {
        name: 'Shells Town',
        description: 'A town dominated by a foreboding Marine base, ruled by Captain Morgan.',
        locations: [
            {
                id: 'marine_base_investigate',
                label: 'Investigate the Marine Base',
                // This interaction is only available for a marine on the first quest step
                condition: (player) => player.character.origin === 'marine' && player.progression.msq.step === 1,
            },
        ],
    },
    'Syrup Village': {
        name: 'Syrup Village',
        description: 'A peaceful, quiet village on the Gecko Islands.',
        locations: [
            {
                id: 'mansion_visit',
                label: 'Visit the Mansion',
                condition: (player) => player.character.origin === 'pirate' && player.progression.msq.step === 1,
            },
        ],
    },
    'Ohara Ruins': {
        name: 'Ohara Ruins',
        description: 'The somber, tree-like library stands as a silent testament to a forgotten history.',
        locations: [
            {
                id: 'ruins_search',
                label: 'Search the Ancient Ruins',
                condition: (player) => player.character.origin === 'revolutionary' && player.progression.msq.step === 1,
            },
        ],
    },
    'The Baratie': {
        name: 'The Baratie',
        description: 'A legendary floating restaurant known for its delicious food and fighting chefs.',
        locations: [
            {
                id: 'baratie_apply',
                label: 'Apply for a Job',
                condition: (player) => player.character.origin === 'neutral' && player.progression.msq.step === 1,
            },
        ],
    },
};