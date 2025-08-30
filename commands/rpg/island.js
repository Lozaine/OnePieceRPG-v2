const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const allIslands = require('../../data/islands');

// Helper function to get island-specific thumbnails
function getIslandThumbnail(islandName) {
		const thumbnails = {
				'Shells Town': 'https://i.imgur.com/shells_town.png',
				'Syrup Village': 'https://i.imgur.com/syrup_village.png',
				'Ohara Ruins': 'https://i.imgur.com/ohara_ruins.png',
				'The Baratie': 'https://i.imgur.com/baratie.png'
		};
		return thumbnails[islandName] || 'https://i.imgur.com/island_default.png';
}

module.exports = {
		data: new SlashCommandBuilder()
				.setName('island')
				.setDescription('View details and available actions for your current island.'),
		async execute(interaction) {
				try {
						const player = interaction.client.players.get(interaction.user.id);
						if (!player) {
								const embed = new EmbedBuilder()
										.setColor(0xFF6B35)
										.setTitle('🚀 No Character Found')
										.setDescription("You need to create a character first to explore islands!")
										.setThumbnail('https://i.imgur.com/onepiece_logo.png')
										.addFields({ 
												name: 'Getting Started', 
												value: 'Use `/start` to create your character and begin your adventure!' 
										})
										.setTimestamp();
								return interaction.reply({ embeds: [embed], ephemeral: true });
						}

						if (!player.progression?.location) {
								const embed = new EmbedBuilder()
										.setColor(0xFF0000)
										.setTitle('🌊 Lost at Sea')
										.setDescription('Your location data is missing. You seem to be adrift!')
										.setThumbnail('https://i.imgur.com/lost_at_sea.png')
										.addFields({ 
												name: 'Solution', 
												value: 'Please use `/start` to recreate your character or contact support.' 
										})
										.setTimestamp();
								return interaction.reply({ embeds: [embed], ephemeral: true });
						}

						const islandName = player.progression.location;
						const islandData = allIslands[islandName];

						if (!islandData) {
								const embed = new EmbedBuilder()
										.setColor(0xFF0000)
										.setTitle('🌊 Uncharted Waters')
										.setDescription("You seem to be lost at sea! Your current location is invalid.")
										.setThumbnail('https://i.imgur.com/lost_at_sea.png')
										.addFields(
												{ name: '📍 Invalid Location', value: islandName || 'Unknown' },
												{ name: 'Solution', value: 'Please contact support or use `/start` to recreate your character.' }
										)
										.setTimestamp();
								return interaction.reply({ embeds: [embed], ephemeral: true });
						}

						const embed = new EmbedBuilder()
								.setColor(0x32CD32)
								.setTitle(`📍 ${islandData.name}`)
								.setDescription(islandData.description)
								.setThumbnail(getIslandThumbnail(islandName))
								.addFields(
										{ 
												name: '💪 Your Power', 
												value: `${player.stats?.power || 0}`, 
												inline: true 
										},
										{ 
												name: '📊 Quest Progress', 
												value: `${player.progression.msq?.saga || 'Unknown'}: ${player.progression.msq?.step || 0}`, 
												inline: true 
										}
								)
								.setTimestamp();

						const actionRow = new ActionRowBuilder();
						let hasActions = false;

						// Check for available locations/actions based on player's quest state
						if (islandData.locations) {
								islandData.locations.forEach(location => {
										if (location.condition && typeof location.condition === 'function') {
												try {
														if (location.condition(player)) {
																actionRow.addComponents(
																		new ButtonBuilder()
																				.setCustomId(location.id)
																				.setLabel(location.label)
																				.setStyle(ButtonStyle.Primary)
																);
																hasActions = true;
														}
												} catch (error) {
														console.error('Error checking location condition:', error);
												}
										}
								});
						}

						if (hasActions) {
								embed.addFields({ 
										name: '🎯 Available Actions', 
										value: 'Choose an action below to progress your adventure!' 
								});
								await interaction.reply({ embeds: [embed], components: [actionRow] });
						} else {
								embed.addFields({ 
										name: '🏝️ Peaceful Island', 
										value: 'There are no special actions available for you here right now. Try checking your `/quests` or explore other areas as you progress!' 
								});
								embed.setFooter({ text: 'New opportunities may appear as you progress in your adventure!' });
								await interaction.reply({ embeds: [embed] });
						}
				} catch (error) {
						console.error('Error in island command:', error);
						const embed = new EmbedBuilder()
								.setColor(0xFF0000)
								.setTitle('❌ Error')
								.setDescription('An error occurred while exploring the island. Please try again.')
								.setThumbnail('https://i.imgur.com/warning.png')
								.setTimestamp();
						await interaction.reply({ embeds: [embed], ephemeral: true });
				}
		},
};
