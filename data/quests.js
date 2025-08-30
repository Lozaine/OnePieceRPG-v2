module.exports = {
    'East Blue': {
        'Romance Dawn': {
            marine: {
                1: {
                    title: "Morgan's Tyranny",
                    description: "You're a new Marine recruit stationed at Shells Town. A sympathetic officer, Lt. Rokkaku, has noticed your potential and pulls you aside. He suspects the base commander, Captain 'Axe-Hand' Morgan, is corrupt and asks you to discreetly investigate the base for evidence.",
                    objective: "Use the `/island` command and find a way to investigate the Marine Base.",
                    powerMultiplier: 1.2,
                    requirements: {
                        minPower: 0
                    }
                },
                2: {
                    title: "Evidence Gathered",
                    description: "With the evidence of Morgan's corruption in hand, you must now decide how to proceed. Lt. Rokkaku suggests contacting Marine Headquarters, but the situation is delicate. You'll need to be careful about who you trust.",
                    objective: "Report your findings to Lt. Rokkaku and plan your next move.",
                    powerMultiplier: 1.3,
                    requirements: {
                        minPower: 5
                    }
                },
            },
            pirate: {
                1: {
                    title: "A Shipwright's Dream",
                    description: "You've arrived in Syrup Village with one goal: to acquire a ship and start your pirate crew. You hear whispers of a local wealthy family, the owners of a large mansion. Perhaps you can find work or a lead there. You also notice a group of local kids playing pirates, led by a long-nosed boy.",
                    objective: "Use the `/island` command and visit the Mansion to look for opportunities.",
                    powerMultiplier: 1.1,
                    requirements: {
                        minPower: 0
                    }
                },
                2: {
                    title: "The Mansion's Secret",
                    description: "Your visit to the mansion has revealed more than you bargained for. Kaya, the heiress, is kind but frail, and her butler Klahadore gives you an uneasy feeling. The local storyteller Usopp seems to know more about the mansion than he lets on.",
                    objective: "Investigate the suspicious activities around the mansion.",
                    powerMultiplier: 1.2,
                    requirements: {
                        minPower: 5
                    }
                },
            },
            revolutionary: {
                1: {
                    title: 'The Echoes of Ohara',
                    description: "As a survivor connected to the tragedy of Ohara, you carry a heavy burden. Your mission is to find a hidden message left by a scholar that proves the World Government's cover-up. Your search begins on a nearby, sparsely populated island known for its ancient ruins.",
                    objective: "Use the `/island` command to search the Ancient Ruins for the hidden message.",
                    powerMultiplier: 1.3,
                    requirements: {
                        minPower: 0
                    }
                },
                2: {
                    title: 'The Scholar\'s Legacy',
                    description: "The hidden message you found reveals crucial information about the World Government's true intentions regarding Ohara. This evidence could change everything, but it also makes you a target. You must decide how to use this dangerous knowledge.",
                    objective: "Find a way to safely preserve and share the evidence you've discovered.",
                    powerMultiplier: 1.4,
                    requirements: {
                        minPower: 8
                    }
                },
            },
            neutral: {
                1: {
                    title: 'The Smell of the Sea',
                    description: "Your journey has led you to the floating restaurant, the Baratie. It's the perfect place for a brawler and aspiring cook to find work and a good meal. You need to prove your worth to the head chef, Zeff, to earn a spot in the kitchen.",
                    objective: "Use the `/island` command and apply for a job at the Baratie's Kitchen.",
                    powerMultiplier: 1.0,
                    requirements: {
                        minPower: 0
                    }
                },
                2: {
                    title: 'Kitchen Combat',
                    description: "You've proven yourself in the Baratie's kitchen, but the restaurant life isn't just about cooking. Pirates and Marines frequent this establishment, and conflicts are inevitable. You'll need to learn the ways of both the kitchen and combat.",
                    objective: "Prove your worth in both cooking and fighting at the Baratie.",
                    powerMultiplier: 1.1,
                    requirements: {
                        minPower: 5
                    }
                },
            },
        },
    },
};