// commands/rpg/stats.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// Helper function to get power level description
function getPowerLevelDescription(power) {
    if (power < 20) return { name: '🌱 Rookie', color: 0x90EE90 };
    if (power < 50) return { name: '⚡ Rising Star', color: 0xFFD700 };
    if (power < 100) return { name: '🔥 Veteran', color: 0xFF6347 };
    if (power < 200) return { name: '💪 Elite', color: 0x9370DB };
    if (power < 500) return { name: '👑 Legend', color: 0xFF1493 };
    return { name: '🌟 Mythical', color: 0x00BFFF };
}

// Helper function to create progress bar
function createProgressBar(current, max, length = 10) {
    const filledLength = Math.round((current / max) * length);
    const emptyLength = length - filledLength;
    return '█'.repeat(filledLength) + '░'.repeat(emptyLength);
}

// Helper function to calculate stats based on race
function calculateRaceStats(race, basePower) {
    const raceModifiers = {
        human: { power: 1.1, description: 'Adaptable (+10% experience gain)' },
        fishman: { power: 1.2, description: 'Aquatic Master (+20% power, water immunity)' },
        mink: { power: 1.15, description: 'Electro User (+15% power, lightning attacks)' },
        skypiean: { power: 1.0, description: 'Sky Dweller (Dial technology, aerial advantage)' },
        giant: { power: 1.4, description: 'Giant Strength (+40% power, knockback resistance)' }
    };

    const modifier = raceModifiers[race] || raceModifiers.human;
    return {
        effectivePower: Math.floor(basePower * modifier.power),
        description: modifier.description
    };
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('View detailed statistics about your character and progress.'),
    async execute(interaction) {
        try {
            const player = interaction.client.players.get(interaction.user.id);

            if (!player) {
                const embed = new EmbedBuilder()
                    .setColor(0xFF6B35)
                    .setTitle('🚀 No Character Found')
                    .setDescription("You need to create a character first to view stats!")
                    .setThumbnail('https://i.imgur.com/onepiece_logo.png')
                    .addFields({ 
                        name: 'Getting Started', 
                        value: 'Use `/start` to create your character and begin your adventure!' 
                    })
                    .setTimestamp();
                return interaction.reply({ embeds: [embed], ephemeral: true });
            }

            // Validate player data
            if (!player.character || !player.stats || !player.progression) {
                const embed = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTitle('⚠️ Character Data Issue')
                    .setDescription('Your character data seems to be incomplete.')
                    .setThumbnail('https://i.imgur.com/warning.png')
                    .addFields({ 
                        name: 'Solution', 
                        value: 'Please use `/start` to recreate your character.' 
                    })
                    .setTimestamp();
                return interaction.reply({ embeds: [embed], ephemeral: true });
            }

            // Calculate various statistics
            const basePower = player.stats.power || 10;
            const level = Math.floor(basePower / 10) + 1;
            const expForCurrentLevel = (level - 1) * 10;
            const expForNextLevel = level * 10;
            const currentLevelExp = basePower - expForCurrentLevel;
            const expToNext = expForNextLevel - basePower;
            const questsCompleted = Math.max(0, (player.progression.msq?.step || 1) - 1);

            // Get race information and calculate effective power
            const { races, origins, dreams } = require('../../data/characterOptions');
            const raceData = races.find(r => r.value === player.character.race);
            const originData = origins.find(o => o.value === player.character.origin);
            const dreamData = dreams.find(d => d.value === player.character.dream);

            const raceStats = calculateRaceStats(player.character.race, basePower);
            const powerLevel = getPowerLevelDescription(basePower);

            // Create progress bars
            const levelProgressBar = createProgressBar(currentLevelExp, 10);
            const arcProgressBar = createProgressBar(questsCompleted, 10);

            const embed = new EmbedBuilder()
                .setColor(powerLevel.color)
                .setTitle(`📊 ${interaction.user.username}'s Adventure Statistics`)
                .setDescription(`*"${player.character.dream || 'The journey of a thousand miles begins with a single step!'}"*`)
                .setThumbnail('https://i.imgur.com/character_stats.png')
                .addFields(
                    {
                        name: '⚡ Power & Level Analysis',
                        value: [
                            `**Base Power:** ${basePower}`,
                            `**Effective Power:** ${raceStats.effectivePower}`,
                            `**Level:** ${level} ${powerLevel.name}`,
                            `**Level Progress:** ${levelProgressBar} (${currentLevelExp}/10)`,
                            `**EXP to Next Level:** ${expToNext}`
                        ].join('\n'),
                        inline: true
                    },
                    {
                        name: '🎯 Adventure Progress',
                        value: [
                            `**Quests Completed:** ${questsCompleted}`,
                            `**Current Arc:** ${player.progression.msq?.arc || 'Unknown'}`,
                            `**Arc Progress:** ${arcProgressBar} (${questsCompleted}/10)`,
                            `**Current Step:** ${player.progression.msq?.step || 0}`,
                            `**Saga:** ${player.progression.msq?.saga || 'Unknown'}`
                        ].join('\n'),
                        inline: true
                    },
                    {
                        name: '🧬 Character Build',
                        value: [
                            `**Race:** ${raceData?.label || player.character.race}`,
                            `**Origin:** ${originData?.label || player.character.origin}`,
                            `**Dream:** ${dreamData?.label || player.character.dream}`,
                            `**Current Location:** ${player.progression.location || 'Unknown'}`
                        ].join('\n'),
                        inline: false
                    }
                )
                .setTimestamp();

            // Add racial abilities section if available
            if (raceData?.abilities && raceData.abilities.length > 0) {
                const abilitiesText = raceData.abilities
                    .map(ability => `• ${ability.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`)
                    .join('\n');

                embed.addFields({
                    name: '✨ Racial Abilities',
                    value: `${abilitiesText}\n\n*${raceStats.description}*`,
                    inline: false
                });
            }

            // Add journey statistics
            const journeyStarted = new Date(); // You might want to store actual creation date
            embed.addFields({
                name: '🗓️ Journey Timeline',
                value: [
                    `**Adventure Started:** ${journeyStarted.toLocaleDateString()}`,
                    `**Days Active:** ${Math.floor((Date.now() - journeyStarted.getTime()) / (1000 * 60 * 60 * 24))}`,
                    `**Current Status:** Active Adventurer`
                ].join('\n'),
                inline: false
            });

            // Add performance metrics
            const powerGrowthRate = Math.max(1, (basePower - 10) / Math.max(1, questsCompleted));
            embed.addFields({
                name: '📈 Performance Metrics',
                value: [
                    `**Power Growth Rate:** ${powerGrowthRate.toFixed(1)} per quest`,
                    `**Completion Rate:** ${questsCompleted > 0 ? '100%' : 'Just Started'}`,
                    `**Adventure Efficiency:** ${questsCompleted >= 5 ? 'Excellent' : questsCompleted >= 2 ? 'Good' : 'Getting Started'}`
                ].join('\n'),
                inline: false
            });

            embed.setFooter({ 
                text: 'Stats update as you progress • Use /profile for a quick overview' 
            });

            await interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.error('Error in stats command:', error);
            const embed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle('❌ Error')
                .setDescription('An error occurred while fetching your detailed stats. Please try again.')
                .setThumbnail('https://i.imgur.com/warning.png')
                .addFields({
                    name: 'Troubleshooting',
                    value: 'If this error persists:\n• Try using `/profile` for basic stats\n• Use `/start` to recreate your character\n• Contact support if the issue continues'
                })
                .setTimestamp();
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    },
};