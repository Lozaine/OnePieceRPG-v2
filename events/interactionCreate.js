// events/interactionCreate.js - Complete enhanced version
const { Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const { races, origins, dreams } = require('../data/characterOptions');
const allQuests = require('../data/quests');
const allIslands = require('../data/islands');

// Helper function to get quest thumbnails based on context
function getQuestThumbnail(player, context = 'default') {
    const thumbnails = {
        marine: 'https://i.imgur.com/NJbOWWe.png',
        pirate: 'https://i.imgur.com/LXdmGSh.png',
        revolutionary: 'https://i.imgur.com/xJGXwAk.png',
        neutral: 'https://i.imgur.com/baratie.png',
        default: 'https://i.imgur.com/onepiece_logo.png',
        success: 'https://i.imgur.com/treasure.png',
        error: 'https://i.imgur.com/warning.png',
        support: 'https://i.imgur.com/support_icon.png'
    };

    if (context === 'success') return thumbnails.success;
    if (context === 'error') return thumbnails.error;
    if (context === 'support') return thumbnails.support;
    return thumbnails[player?.character?.origin] || thumbnails.default;
}

// Enhanced helper function to get the player's current MSQ object with validation
function getCurrentQuest(player) {
    try {
        if (!player || !player.progression || !player.progression.msq) {
            console.warn('Player missing progression data');
            return null;
        }

        const { saga, arc, origin, step } = player.progression.msq;
        if (!saga || !arc || !origin || !step) {
            console.warn('Incomplete MSQ data:', player.progression.msq);
            return null;
        }

        const quest = allQuests[saga]?.[arc]?.[origin]?.[step];
        if (!quest) {
            console.warn('Quest not found for:', { saga, arc, origin, step });
        }

        return quest || null;
    } catch (error) {
        console.error('Error getting current quest:', error);
        return null;
    }
}

// Helper function to validate player state
function validatePlayerState(player) {
    const errors = [];

    if (!player) {
        errors.push('Player data not found');
        return errors;
    }

    if (!player.character) {
        errors.push('Character data missing');
    } else {
        if (!player.character.race) errors.push('Race not selected');
        if (!player.character.origin) errors.push('Origin not selected');
        if (!player.character.dream) errors.push('Dream not selected');
    }

    if (!player.progression) {
        errors.push('Progression data missing');
    } else {
        if (!player.progression.location) errors.push('Location not set');
        if (!player.progression.msq) errors.push('MSQ data missing');
    }

    if (!player.stats) {
        errors.push('Stats data missing');
    }

    return errors;
}

// Enhanced error response function
async function sendErrorResponse(interaction, message, isUpdate = false) {
    const embed = new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle('❌ Error')
        .setDescription(message)
        .setThumbnail(getQuestThumbnail(null, 'error'))
        .setTimestamp();

    const method = isUpdate ? 'update' : 'reply';
    return await interaction[method]({ 
        embeds: [embed], 
        components: [], 
        ephemeral: true 
    });
}

// Enhanced success response function
async function sendSuccessResponse(interaction, title, message, player = null, isUpdate = false) {
    const embed = new EmbedBuilder()
        .setColor(0x00FF00)
        .setTitle(`✅ ${title}`)
        .setDescription(message)
        .setThumbnail(getQuestThumbnail(player, 'success'))
        .setTimestamp();

    const method = isUpdate ? 'update' : 'reply';
    return await interaction[method]({ 
        embeds: [embed], 
        components: [], 
        ephemeral: true 
    });
}

// Quest progression handler
async function progressQuest(interaction, player, questId, customMessage = null) {
    try {
        const currentQuest = getCurrentQuest(player);
        if (!currentQuest) {
            return await sendErrorResponse(interaction, 'No active quest found. Please check your quest log with `/quests`.', true);
        }

        // Check if player meets quest requirements (can be expanded)
        if (!validateQuestRequirements(player, currentQuest)) {
            return await sendErrorResponse(interaction, 'You do not meet the requirements for this quest step.', true);
        }

        // Progress the quest
        const oldStep = player.progression.msq.step;
        player.progression.msq.step++;

        // Calculate rewards
        const powerReward = calculatePowerReward(currentQuest, player);
        player.stats.power += powerReward;

        // Save player data
        interaction.client.players.set(interaction.user.id, player);

        // Check if there's a next quest
        const nextQuest = getCurrentQuest(player);
        const isQuestComplete = !nextQuest;

        const embed = new EmbedBuilder()
            .setColor(0x23A55A)
            .setTitle('🎯 Quest Progress!')
            .setDescription(customMessage || `You've successfully completed step ${oldStep} of your current quest!`)
            .setThumbnail(getQuestThumbnail(player, 'success'))
            .addFields(
                { name: '💪 Power Gained', value: `+${powerReward}`, inline: true },
                { name: '💪 Total Power', value: `${player.stats.power}`, inline: true },
                { name: '📍 Current Location', value: player.progression.location, inline: true }
            )
            .setTimestamp();

        if (isQuestComplete) {
            embed.addFields({
                name: '🏆 Quest Arc Complete!',
                value: 'Use `/quests` to see if new adventures await you!'
            });
        } else {
            embed.setFooter({ text: 'Use /quests to see your next objective!' });
        }

        await interaction.update({ embeds: [embed], components: [] });

    } catch (error) {
        console.error('Error progressing quest:', error);
        await sendErrorResponse(interaction, 'An error occurred while progressing your quest. Please try again.', true);
    }
}

// Validate quest requirements (can be expanded with more complex logic)
function validateQuestRequirements(player, quest) {
    // Basic validation - can be expanded
    if (quest.requirements) {
        if (quest.requirements.minPower && player.stats.power < quest.requirements.minPower) {
            return false;
        }
        // Add more requirement checks here
    }
    return true;
}

// Calculate power reward based on quest difficulty and player level
function calculatePowerReward(quest, player) {
    const baseReward = 5;
    const questMultiplier = quest.powerMultiplier || 1;
    const playerLevel = Math.floor(player.stats.power / 10) + 1;

    return Math.floor(baseReward * questMultiplier * (1 + playerLevel * 0.1));
}

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        const { client } = interaction;

        // Handle Slash Commands
        if (interaction.isChatInputCommand()) {
            // Enhanced player existence check
            const playerExists = client.players.has(interaction.user.id);
            if (interaction.commandName !== 'start' && interaction.commandName !== 'ping' && interaction.commandName !== 'help' && !playerExists) {
                const embed = new EmbedBuilder()
                    .setColor(0xFF6B35)
                    .setTitle('🚀 Adventure Awaits!')
                    .setDescription('You need to create a character first to begin your One Piece adventure!')
                    .setThumbnail(getQuestThumbnail(null, 'default'))
                    .addFields({ 
                        name: 'Getting Started', 
                        value: 'Use the `/start` command to create your character and begin your journey!' 
                    })
                    .setTimestamp();

                return interaction.reply({ embeds: [embed], ephemeral: true });
            }

            // Validate player state for commands that require character data
            if (playerExists && ['profile', 'quests', 'island', 'stats'].includes(interaction.commandName)) {
                const player = client.players.get(interaction.user.id);
                const validationErrors = validatePlayerState(player);

                if (validationErrors.length > 0) {
                    const embed = new EmbedBuilder()
                        .setColor(0xFF0000)
                        .setTitle('⚠️ Character Data Issue')
                        .setDescription('There seems to be an issue with your character data.')
                        .setThumbnail(getQuestThumbnail(null, 'error'))
                        .addFields({ 
                            name: 'Issues Found', 
                            value: validationErrors.join('\n') 
                        })
                        .addFields({ 
                            name: 'Solution', 
                            value: 'Please use `/start` to recreate your character.' 
                        })
                        .setTimestamp();

                    return interaction.reply({ embeds: [embed], ephemeral: true });
                }
            }

            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) {
                return await sendErrorResponse(interaction, 'Command not found.');
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(`Error executing command ${interaction.commandName}:`, error);
                const errorMessage = error.message || 'An unexpected error occurred while executing this command.';
                await sendErrorResponse(interaction, errorMessage);
            }
            return;
        }

        // Enhanced Button Handler
        if (interaction.isButton()) {
            try {
                await handleButtonInteraction(interaction);
            } catch (error) {
                console.error('Button interaction error:', error);
                await sendErrorResponse(interaction, 'An error occurred while processing your button click.', true);
            }
            return;
        }

        // Enhanced Select Menu Handler  
        if (interaction.isStringSelectMenu()) {
            try {
                await handleSelectMenuInteraction(interaction);
            } catch (error) {
                console.error('Select menu interaction error:', error);
                await sendErrorResponse(interaction, 'An error occurred while processing your selection.', true);
            }
            return;
        }
    },
};

// Separate button interaction handler
async function handleButtonInteraction(interaction) {
    const { client } = interaction;

    // Help Support Button
    if (interaction.customId === 'help_support') {
        const embed = new EmbedBuilder()
            .setColor(0x7289DA)
            .setTitle('🆘 Additional Help & Support')
            .setDescription('Need more assistance with your One Piece adventure?')
            .setThumbnail(getQuestThumbnail(null, 'support'))
            .addFields(
                {
                    name: '📚 Common Issues',
                    value: '• **Commands not working?** Make sure you\'ve created a character with `/start`\n• **Character data missing?** Use `/start` to recreate your character\n• **Quest stuck?** Check `/quests` for current objectives\n• **Can\'t progress?** Use `/island` to see available actions',
                    inline: false
                },
                {
                    name: '🎮 Gameplay Tips',
                    value: '• Always check `/quests` when unsure what to do next\n• Use `/island` frequently to discover new opportunities\n• Your choices in character creation affect your entire journey\n• Power grows through completing quest objectives',
                    inline: false
                },
                {
                    name: '🔧 Technical Support',
                    value: '• Bot not responding? Use `/ping` to check connection\n• Commands missing? Contact server administrator\n• Data lost? Character recreation may be necessary\n• Report bugs to the development team',
                    inline: false
                },
                {
                    name: '🌟 Getting the Most Out of Your Adventure',
                    value: '• Read quest descriptions carefully for lore and context\n• Each race offers unique advantages and storylines\n• Explore different origin paths for varied experiences\n• Progress is saved automatically after each action',
                    inline: false
                }
            )
            .setFooter({ 
                text: 'Still need help? Contact the server administrators or development team' 
            })
            .setTimestamp();

        await interaction.update({ embeds: [embed], components: [] });
        return;
    }

    // Character Creation Confirmation
    if (interaction.customId === 'start_confirm') {
        const player = client.players.get(interaction.user.id);
        const validationErrors = validatePlayerState(player);

        if (validationErrors.length > 0) {
            return await sendErrorResponse(interaction, 
                `Character creation incomplete: ${validationErrors.join(', ')}. Please use \`/start\` again.`, true);
        }

        // Initialize player progression
        player.progression = {
            msq: {
                saga: 'East Blue',
                arc: 'Romance Dawn',
                origin: player.character.origin,
                step: 1,
            },
            location: getStartingLocation(player.character.origin),
        };
        player.stats = { power: 10 };

        client.players.set(interaction.user.id, player);

        const embed = new EmbedBuilder()
            .setColor(0x23A55A)
            .setTitle('⚓ Welcome to the Great Pirate Era!')
            .setDescription(`Your adventure as a **${getRaceDisplayName(player.character.race)}** begins now in **${player.progression.location}**!`)
            .setThumbnail(getQuestThumbnail(player))
            .addFields(
                { name: '🎯 Next Steps', value: 'Use `/quests` to see your first objective\nUse `/island` to interact with the world\nUse `/profile` to view your character' },
                { name: '💪 Starting Power', value: `${player.stats.power}`, inline: true },
                { name: '📍 Location', value: player.progression.location, inline: true }
            )
            .setTimestamp();

        await interaction.update({ embeds: [embed], components: [] });
        return;
    }

    // Quest-related buttons
    if (!interaction.customId.startsWith('start_')) {
        const player = client.players.get(interaction.user.id);
        if (!player) {
            return await sendErrorResponse(interaction, 'Player data not found. Please use `/start` to create a character.', true);
        }

        await handleQuestButton(interaction, player);
    }
}

// Quest button handler
async function handleQuestButton(interaction, player) {
    const questHandlers = {
        'marine_base_investigate': {
            message: "You carefully investigate the Marine base and discover forged documents in Captain Morgan's office, confirming Lt. Rokkaku's suspicions about the corruption.",
            nextLocation: null // stays in same location
        },
        'marine_base_report': {
            message: "You report your findings to Lt. Rokkaku, who thanks you for your courage. Together, you begin planning how to expose Morgan's corruption to Marine Headquarters.",
            nextLocation: null
        },
        'mansion_visit': {
            message: "You visit the grand mansion and meet Kaya, the wealthy heiress. Her butler Klahadore seems suspicious, and you sense an opportunity for adventure.",
            nextLocation: null
        },
        'mansion_investigate': {
            message: "Your investigation reveals that Klahadore is actually Captain Kuro, a notorious pirate! You must find a way to protect Kaya and expose his true identity.",
            nextLocation: null
        },
        'village_explore': {
            message: "You explore the village and meet the locals, including the young storyteller Usopp. The villagers share rumors about strange activities at the mansion.",
            nextLocation: null
        },
        'ruins_search': {
            message: "Among the ancient ruins, you find a hidden scholar's message that reveals crucial evidence of the World Government's cover-up of Ohara's true purpose.",
            nextLocation: null
        },
        'tree_of_knowledge': {
            message: "You examine the burned Tree of Knowledge, feeling the weight of lost history. The ancient texts hidden within contain fragments of the truth.",
            nextLocation: null
        },
        'preserve_evidence': {
            message: "You carefully preserve the evidence you've found, knowing it could change the world. The Revolutionary Army will be very interested in these discoveries.",
            nextLocation: null
        },
        'baratie_apply': {
            message: "You impress the fighting chefs with your determination and earn a place in the Baratie's kitchen. Chef Zeff sees potential in you.",
            nextLocation: null
        },
        'kitchen_trial': {
            message: "You prove yourself in both cooking and combat, earning the respect of the Baratie's crew. Your skills grow stronger through their unique training methods.",
            nextLocation: null
        },
        'dining_area': {
            message: "Working in the dining area, you meet many interesting pirates and Marines. Each encounter teaches you more about the world beyond these floating seas.",
            nextLocation: null
        }
    };

    const handler = questHandlers[interaction.customId];
    if (handler) {
        if (handler.nextLocation) {
            player.progression.location = handler.nextLocation;
        }
        await progressQuest(interaction, player, interaction.customId, handler.message);
    } else {
        await sendErrorResponse(interaction, 'Unknown quest action. This might be a bug - please report it!', true);
    }
}

// Select menu interaction handler
async function handleSelectMenuInteraction(interaction) {
    const { client } = interaction;

    if (!interaction.customId.startsWith('start_')) return;

    const player = client.players.ensure(interaction.user.id, { character: {} });

    if (interaction.customId === 'start_select_race') {
        // Reset character object to ensure a clean slate
        player.character = { race: interaction.values[0] };
        client.players.set(interaction.user.id, player);

        const selectedRaceInfo = races.find(r => r.value === player.character.race);
        const originMenu = new StringSelectMenuBuilder()
            .setCustomId('start_select_origin')
            .setPlaceholder('Select your origin story')
            .addOptions(origins.map(o => ({ 
                label: o.label, 
                description: o.description, 
                value: o.value 
            })));

        const row = new ActionRowBuilder().addComponents(originMenu);
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('🏴‍☠️ Character Creation: Step 2')
            .setDescription(`**Race Selected:** ${selectedRaceInfo.label}\n*${selectedRaceInfo.details}*`)
            .setThumbnail(getQuestThumbnail(player))
            .addFields({ 
                name: 'Next: Choose Your Origin', 
                value: 'Where does your story begin? This sets your starting location and faction.' 
            })
            .setTimestamp();

        await interaction.update({ embeds: [embed], components: [row] });

    } else if (interaction.customId === 'start_select_origin') {
        player.character.origin = interaction.values[0];
        // Clear dream selection in case user is changing their origin
        delete player.character.dream;
        client.players.set(interaction.user.id, player);

        const dreamMenu = new StringSelectMenuBuilder()
            .setCustomId('start_select_dream')
            .setPlaceholder('Select your ultimate dream')
            .addOptions(dreams.map(d => ({ 
                label: d.label, 
                description: d.description, 
                value: d.value 
            })));

        const row = new ActionRowBuilder().addComponents(dreamMenu);
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('⭐ Character Creation: Step 3')
            .setDescription('Your choices are shaping your destiny on the Grand Line.')
            .setThumbnail(getQuestThumbnail(player))
            .addFields({ 
                name: 'Final Step: Choose Your Dream', 
                value: 'What ultimate goal drives you? This grants starting skills and equipment.' 
            })
            .setTimestamp();

        await interaction.update({ embeds: [embed], components: [row] });

    } else if (interaction.customId === 'start_select_dream') {
        player.character.dream = interaction.values[0];
        client.players.set(interaction.user.id, player);

        const confirmButton = new ButtonBuilder()
            .setCustomId('start_confirm')
            .setLabel('Begin Adventure!')
            .setStyle(ButtonStyle.Success);

        const row = new ActionRowBuilder().addComponents(confirmButton);
        const embed = new EmbedBuilder()
            .setColor(0x1EA400)
            .setTitle('🎯 Character Confirmation')
            .setDescription('Review your choices and begin your legendary adventure!')
            .setThumbnail(getQuestThumbnail(player))
            .addFields(
                { name: '🧬 Race', value: getRaceDisplayName(player.character.race), inline: true },
                { name: '⚓ Origin', value: getOriginDisplayName(player.character.origin), inline: true },
                { name: '⭐ Dream', value: getDreamDisplayName(player.character.dream), inline: true }
            )
            .setFooter({ text: 'Click "Begin Adventure!" to start your journey!' })
            .setTimestamp();

        await interaction.update({ embeds: [embed], components: [row] });
    }
}

// Helper functions for display names
function getRaceDisplayName(raceValue) {
    return races.find(r => r.value === raceValue)?.label || raceValue;
}

function getOriginDisplayName(originValue) {
    return origins.find(o => o.value === originValue)?.label || originValue;
}

function getDreamDisplayName(dreamValue) {
    return dreams.find(d => d.value === dreamValue)?.label || dreamValue;
}

function getStartingLocation(origin) {
    const locationMap = {
        marine: 'Shells Town',
        pirate: 'Syrup Village',
        revolutionary: 'Ohara Ruins',
        neutral: 'The Baratie'
    };
    return locationMap[origin] || 'Unknown Location';
}