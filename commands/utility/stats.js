const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

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

            // Calculate various statistics
            const level = Math.floor(player.stats.power / 10) + 1;
            const expToNext = (level * 10) - player.stats.power;
            const questsCompleted = player.progression?.msq?.step - 1 || 0;

            // Get race bonuses
            const { races } = require('../../data/characterOptions');
            const raceData = races.find(r => r.value === player.character.race);

            const embed = new EmbedBuilder()
                .setColor(0x7289DA)
                .setTitle(`📊 ${interaction.user.username}'s Detailed Stats`)
                .setDescription('Comprehensive overview of your character\'s progress and abilities')
                .setThumbnail('https://i.imgur.com/character_stats.png')
                .addFields(
                    {
                        name: '⚡ Power & Level',
                        value: `**Power:** ${player.stats.power}\n**Level:** ${level}\n**EXP to Next:** ${expToNext}`,
                        inline: true
                    },
                    {
                        name: '🎯 Quest Progress',
                        value: `**Quests Completed:** ${questsCompleted}\n**Current Arc:** ${player.progression?.msq?.arc || 'None'}\n**Current Step:** ${player.progression?.msq?.step || 0}`,
                        inline: true
                    },
                    {
                        name: '🧬 Character Details',
                        value: `**Race:** ${raceData?.label || player.character.race}\n**Origin:** ${player.character.origin}\n**Dream:** ${player.character.dream}`,
                        inline: true
                    },
                    {
                        name: '🌍 Journey Info',
                        value: `**Current Location:** ${player.progression?.location || 'Unknown'}\n**Saga:** ${player.progression?.msq?.saga || 'None'}`,
                        inline: false
                    }
                )
                .setFooter({ 
                    text: 'Stats update as you progress through your adventure' 
                })
                .setTimestamp();

            // Add racial abilities if available
            if (raceData?.abilities) {
                embed.addFields({
                    name: '✨ Racial Abilities',
                    value: raceData.abilities.map(ability => `• ${ability.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}`).join('\n'),
                    inline: false
                });
            }

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error in stats command:', error);
            const embed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle('❌ Error')
                .setDescription('An error occurred while fetching your stats.')
                .setTimestamp();
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    },
};