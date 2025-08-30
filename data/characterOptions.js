module.exports = {
    races: [
        {
            label: 'Human',
            description: 'Versatile and adaptable, gaining experience faster.',
            value: 'human',
            details: 'Starting Bonus: +1 to all stats.\nRacial Ability (Adaptability): Gain 10% more experience.'
        },
        {
            label: 'Fish-Man / Mermaid',
            description: 'Masters of the sea with superior strength.',
            value: 'fishman',
            details: 'Starting Bonus: +2 Strength, +1 Durability.\nRacial Ability (Water Breathing): No penalties underwater.'
        },
        {
            label: 'Mink',
            description: 'A proud tribe wielding the power of Electro.',
            value: 'mink',
            details: 'Starting Bonus: +2 Agility, +1 Strength.\nRacial Ability (Electro): A basic lightning attack.'
        },
        {
            label: 'Skypiean',
            description: 'Dwellers of the sky islands with knowledge of Dials.',
            value: 'skypiean',
            details: 'Starting Bonus: +2 Intelligence, +1 Agility.\nRacial Ability (Sky-Dweller): Starts with a basic Dial.'
        },
        {
            label: 'Giant',
            description: 'Beings of immense power and size.',
            value: 'giant',
            details: 'Starting Bonus: +4 Strength, +2 Durability, -2 Agility.\nRacial Ability (Giant\'s Strength): High knockback resistance.'
        }
    ],
    origins: [
        {
            label: 'Shells Town - Marine Recruit',
            description: 'Begin your journey enforcing justice.',
            value: 'marine'
        },
        {
            label: 'Syrup Village - Pirate Hopeful',
            description: 'Seek freedom and adventure on the high seas.',
            value: 'pirate'
        },
        {
            label: 'Ohara (Post-Buster Call) - Revolutionary Seed',
            description: 'Fight against the corruption of the World Government.',
            value: 'revolutionary'
        },
        {
            label: 'Baratie - Neutral (Cook/Brawler)',
            description: 'Your life revolves around the kitchen and a good fight.',
            value: 'neutral'
        }
    ],
    dreams: [
        {
            label: 'To be the World\'s Greatest Swordsman',
            description: 'Start with a Katana and a swordsman skill.',
            value: 'swordsman'
        },
        {
            label: 'To Find the All Blue',
            description: 'Start with cooking recipes and crafting bonuses.',
            value: 'cook'
        },
        {
            label: 'To Map the World',
            description: 'Start with a Log Pose and find hidden locations easier.',
            value: 'navigator'
        },
        {
            label: 'To Become a Brave Warrior of the Sea',
            description: 'Start with higher base health and a combat skill.',
            value: 'warrior'
        }
    ]
};