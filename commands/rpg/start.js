const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { races } = require('../../data/characterOptions');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription('Begin your One Piece adventure by creating your character.'),
    async execute(interaction) {
        try {
            // Check if user already has a character
            const existingPlayer = interaction.client.players.get(interaction.user.id);
            if (existingPlayer && existingPlayer.character && existingPlayer.progression) {
                const embed = new EmbedBuilder()
                    .setColor(0xFFB000)
                    .setTitle('⚠️ Character Already Exists')
                    .setDescription('You already have an active character! Starting a new character will overwrite your current progress.')
                    .setThumbnail('https://i.imgur.com/warning.png')
                    .addFields(
                        { 
                            name: '📊 Current Character', 
                            value: `**Race:** ${existingPlayer.character.race}\n**Power:** ${existingPlayer.stats?.power || 0}\n**Location:** ${existingPlayer.progression?.location || 'Unknown'}` 
                        },
                        { 
                            name: '🎯 Options', 
                            value: 'Use `/profile` to view your current character\nUse `/quests` to see your current objectives\nUse `/island` to continue your adventure' 
                        }
                    )
                    .setFooter({ text: 'If you really want to restart, use this command again.' })
                    .setTimestamp();

                // If they've used start recently, warn them but don't block
                return interaction.reply({ embeds: [embed], ephemeral: true });
            }

            // Create or clear the character data for a fresh start
            interaction.client.players.set(interaction.user.id, { character: {} });

            const raceMenu = new StringSelectMenuBuilder()
                .setCustomId('start_select_race')
                .setPlaceholder('🧬 Select your race to begin...')
                .addOptions(races.map(race => ({
                    label: race.label,
                    description: race.description,
                    value: race.value,
                    emoji: getRaceEmoji(race.value)
                })));

            const row = new ActionRowBuilder().addComponents(raceMenu);

            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('🏴‍☠️ Choose Your Destiny')
                .setDescription('Welcome to the world of **One Piece**! Your legend is about to begin.\n\nThe Grand Line awaits, and your adventure starts here. Every choice you make will shape your journey through this vast ocean of possibilities.')
                .setThumbnail('https://i.imgur.com/onepiece_logo.png')
                .addFields(
                    { 
                        name: '🎯 Step 1: Choose Your Race', 
                        value: 'Each race offers unique starting bonuses and abilities that will define your path through the world. Choose wisely!' 
                    },
                    { 
                        name: '⚡ What to Expect', 
                        value: '• Unique racial abilities and bonuses\n• Different starting storylines\n• Varied interaction opportunities\n• Personalized adventure experience' 
                    }
                )
                .setFooter({ text: 'Your adventure awaits • Character creation takes about 2 minutes' })
                .setTimestamp();

            await interaction.reply({
                embeds: [embed],
                components: [row],
                ephemeral: true
            });
        } catch (error) {
            console.error('Error in start command:', error);
            const embed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle('❌ Error')
                .setDescription('An error occurred while starting character creation. Please try again.')
                .setThumbnail('https://i.imgur.com/warning.png')
                .setTimestamp();
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    },
};

function getRaceEmoji(race) {
    const emojis = {
        human: '🧑',
        fishman: '🐠',
        mink: '🐺',
        skypiean: '☁️',
        giant: '🏔️'
    };
    return emojis[race] || '⚔️';
}