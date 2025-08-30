// Enhanced commands/rpg/profile.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// Helper function to get race-specific thumbnails
function getRaceThumbnail(race) {
		const thumbnails = {
				human: 'https://i.imgur.com/human_avatar.png',
				fishman: 'https://i.imgur.com/fishman_avatar.png',
				mink: 'https://i.imgur.com/mink_avatar.png',
				skypiean: 'https://i.imgur.com/skypiean_avatar.png',
				giant: 'https://i.imgur.com/giant_avatar.png'
		};
		return thumbnails[race] || 'https://i.imgur.com/default_avatar.png';
}

// Helper function to get power level description
function getPowerLevelDescription(power) {
		if (power < 20) return '🌱 Rookie';
		if (power < 50) return '⚡ Rising Star';
		if (power < 100) return '🔥 Veteran';
		if (power < 200) return '💪 Elite';
		if (power < 500) return '👑 Legend';
		return '🌟 Mythical';
}

// Helper function to format race display name
function formatRaceName(race) {
		const raceNames = {
				human: 'Human',
				fishman: 'Fish-Man/Mermaid',
				mink: 'Mink Tribe',
				skypiean: 'Sky Islander',
				giant: 'Giant'
		};
		return raceNames[race] || race;
}

module.exports = {
		data: new SlashCommandBuilder()
				.setName('profile')
				.setDescription('View your character profile and stats.'),
		async execute(interaction) {
				try {
						const player = interaction.client.players.get(interaction.user.id);
						if (!player) {
								const embed = new EmbedBuilder()
										.setColor(0xFF6B35)
										.setTitle('🚀 No Character Found')
										.setDescription("You don't have a character yet. Your adventure awaits!")
										.setThumbnail('https://i.imgur.com/onepiece_logo.png')
										.addFields({ 
												name: 'Getting Started', 
												value: 'Use `/start` to create your character and begin your One Piece adventure!' 
										})
										.setTimestamp();
								return interaction.reply({ embeds: [embed], ephemeral: true });
						}

						// Validate player data
						if (!player.stats || !player.character || !player.progression) {
								const embed = new EmbedBuilder()
										.setColor(0xFF0000)
										.setTitle('⚠️ Character Data Corrupted')
										.setDescription('Your character data seems to be incomplete or corrupted.')
										.setThumbnail('https://i.imgur.com/warning.png')
										.addFields({ 
												name: 'Solution', 
												value: 'Please use `/start` to recreate your character. Sorry for the inconvenience!' 
										})
										.setTimestamp();
								return interaction.reply({ embeds: [embed], ephemeral: true });
						}

						// Calculate additional stats
						const powerLevel = getPowerLevelDescription(player.stats.power);
						const level = Math.floor(player.stats.power / 10) + 1;

						const embed = new EmbedBuilder()
								.setColor(0x1E90FF)
								.setTitle(`⚓ ${interaction.user.username}'s Adventure Profile`)
								.setDescription(`*"${player.character.dream || 'A pirate with no dream is just a criminal!'}"*`)
								.setThumbnail(getRaceThumbnail(player.character.race))
								.addFields(
										{ 
												name: '💪 Power Level', 
												value: `**${player.stats.power}** ${powerLevel}\n*Level ${level}*`, 
												inline: true 
										},
										{ 
												name: '🌏 Current Location', 
												value: player.progression.location || 'Unknown', 
												inline: true 
										},
										{ 
												name: '📊 Progress', 
												value: `${player.progression.msq?.saga || 'Unknown'}: ${player.progression.msq?.arc || 'Unknown'}`, 
												inline: true 
										},
										{ 
												name: '📜 Origin Story', 
												value: player.character.origin || 'Unknown', 
												inline: false 
										},
										{ 
												name: '✨ Ultimate Dream', 
												value: player.character.dream || 'Unset', 
												inline: false 
										},
										{ 
												name: '🧬 Race', 
												value: formatRaceName(player.character.race) || 'Unknown', 
												inline: false 
										}
								)
								.setFooter({ 
										text: `Adventure started • Use /quests to see your current objectives` 
								})
								.setTimestamp();

						await interaction.reply({ embeds: [embed] });
				} catch (error) {
						console.error('Error in profile command:', error);
						const embed = new EmbedBuilder()
								.setColor(0xFF0000)
								.setTitle('❌ Error')
								.setDescription('An error occurred while fetching your profile. Please try again.')
								.setThumbnail('https://i.imgur.com/warning.png')
								.setTimestamp();
						await interaction.reply({ embeds: [embed], ephemeral: true });
				}
		},
};