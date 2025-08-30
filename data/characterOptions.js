module.exports = {
    races: [
        {
            label: 'Human',
            description: 'Versatile and adaptable, gaining experience faster.',
            value: 'human',
            details: 'Starting Bonus: +1 to all stats.\nRacial Ability (Adaptability): Gain 10% more experience from all activities.\n\n*Humans are the most common race in the world, known for their remarkable adaptability and potential for growth.*',
            startingStats: {
                power: 11, // +1 bonus
                health: 100,
                stamina: 100
            },
            abilities: ['adaptability']
        },
        {
            label: 'Fish-Man / Mermaid',
            description: 'Masters of the sea with superior strength underwater.',
            value: 'fishman',
            details: 'Starting Bonus: +2 Strength, +1 Durability.\nRacial Ability (Aquatic Master): No penalties underwater, +50% combat effectiveness in water.\n\n*Fish-Men are 10 times stronger than humans and can breathe underwater, making them formidable opponents in aquatic environments.*',
            startingStats: {
                power: 12, // +2 strength equivalent
                health: 110, // +1 durability
                stamina: 100
            },
            abilities: ['water_breathing', 'aquatic_combat']
        },
        {
            label: 'Mink',
            description: 'A proud warrior tribe wielding the power of Electro.',
            value: 'mink',
            details: 'Starting Bonus: +2 Agility, +1 Strength.\nRacial Ability (Electro): Basic lightning-based attacks that can paralyze enemies.\n\n*The Mink Tribe are natural-born warriors with the innate ability to generate and control electricity.*',
            startingStats: {
                power: 11, // +1 strength, +2 agility
                health: 100,
                stamina: 110 // agility bonus
            },
            abilities: ['electro', 'enhanced_agility']
        },
        {
            label: 'Skypiean',
            description: 'Dwellers of the sky islands with knowledge of ancient Dials.',
            value: 'skypiean',
            details: 'Starting Bonus: +2 Intelligence, +1 Agility.\nRacial Ability (Sky-Dweller): Starts with a basic Dial and knowledge of sky island technology.\n\n*Skypieans have adapted to life 10,000 meters above sea level and possess unique technology.*',
            startingStats: {
                power: 10,
                health: 100,
                stamina: 110 // intelligence/agility bonus
            },
            abilities: ['dial_usage', 'sky_navigation'],
            startingItems: ['basic_dial']
        },
        {
            label: 'Giant',
            description: 'Beings of immense power and size with incredible strength.',
            value: 'giant',
            details: 'Starting Bonus: +4 Strength, +2 Durability, -2 Agility.\nRacial Ability (Giant\'s Might): High knockback resistance and devastating physical attacks.\n\n*Giants are massive humanoids known for their incredible strength and warrior culture.*',
            startingStats: {
                power: 14, // +4 strength
                health: 120, // +2 durability
                stamina: 80 // -2 agility
            },
            abilities: ['giant_strength', 'knockback_resistance'],
            drawbacks: ['reduced_speed']
        }
    ],
    origins: [
        {
            label: 'Shells Town - Marine Recruit',
            description: 'Uphold justice and order across the seas.',
            value: 'marine',
            details: 'As a Marine, you begin your journey in the structured world of military service, but corruption and moral dilemmas await.',
            startingLocation: 'Shells Town',
            faction: 'World Government',
            benefits: ['marine_authority', 'structured_training'],
            startingItems: ['marine_uniform', 'basic_sword']
        },
        {
            label: 'Syrup Village - Aspiring Pirate',
            description: 'Seek freedom and adventure on the high seas.',
            value: 'pirate',
            details: 'The pirate\'s life offers ultimate freedom but comes with constant danger and the need to forge your own path.',
            startingLocation: 'Syrup Village',
            faction: 'Independent',
            benefits: ['freedom_of_action', 'treasure_hunting'],
            startingItems: ['basic_cutlass', 'treasure_map_fragment']
        },
        {
            label: 'Ohara Ruins - Revolutionary Seed',
            description: 'Fight against the World Government\'s corruption.',
            value: 'revolutionary',
            details: 'Born from tragedy, revolutionaries work in shadows to expose the truth and fight systemic oppression.',
            startingLocation: 'Ohara Ruins',
            faction: 'Revolutionary Army',
            benefits: ['stealth_operations', 'information_network'],
            startingItems: ['encrypted_documents', 'disguise_kit']
        },
        {
            label: 'Baratie - Neutral Wanderer',
            description: 'Follow your own path between law and chaos.',
            value: 'neutral',
            details: 'Not bound by faction loyalty, you can choose your own alliances and forge unique relationships.',
            startingLocation: 'The Baratie',
            faction: 'Independent',
            benefits: ['versatile_relationships', 'unique_opportunities'],
            startingItems: ['cooking_knife', 'recipe_book']
        }
    ],
    dreams: [
        {
            label: 'World\'s Greatest Swordsman',
            description: 'Master the way of the sword above all others.',
            value: 'swordsman',
            details: 'The path of the sword is one of discipline, honor, and relentless pursuit of perfection in combat.',
            benefits: ['enhanced_sword_skills', 'sword_techniques'],
            startingItems: ['quality_katana', 'sword_maintenance_kit'],
            skillTree: 'swordsmanship'
        },
        {
            label: 'Find the All Blue',
            description: 'Discover the legendary sea where all fish swim together.',
            value: 'cook',
            details: 'The culinary arts combined with adventure, seeking the ultimate ingredient paradise.',
            benefits: ['cooking_mastery', 'ingredient_knowledge'],
            startingItems: ['chef_knives', 'spice_collection'],
            skillTree: 'culinary'
        },
        {
            label: 'Map the Entire World',
            description: 'Chart every island and sea route across the globe.',
            value: 'navigator',
            details: 'Navigation, weather prediction, and cartography will guide your crew to victory.',
            benefits: ['enhanced_navigation', 'weather_prediction'],
            startingItems: ['log_pose', 'weather_instruments'],
            skillTree: 'navigation'
        },
        {
            label: 'Become a Brave Warrior of the Sea',
            description: 'Prove your courage in battles across the Grand Line.',
            value: 'warrior',
            details: 'Raw combat prowess and unwavering courage in the face of any challenge.',
            benefits: ['combat_mastery', 'battle_tactics'],
            startingItems: ['reinforced_armor', 'battle_axe'],
            skillTree: 'combat'
        },
        {
            label: 'Uncover the True History',
            description: 'Reveal the secrets the World Government wants hidden.',
            value: 'scholar',
            details: 'Knowledge is power, and the truth behind the Void Century awaits discovery.',
            benefits: ['research_skills', 'ancient_knowledge'],
            startingItems: ['research_tools', 'ancient_texts'],
            skillTree: 'archaeology'
        }
    ]
};