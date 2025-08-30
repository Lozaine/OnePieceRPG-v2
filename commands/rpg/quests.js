const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const allQuests = require('../../data/quests');

// Helper function to get quest-specific thumbnails
function getQuestThumbnail(saga, arc) {
		const thumbnails = {
				'East Blue': {
						'Romance Dawn': 'https://i.imgur.com/romance_dawn.png'
				}
		};
		return thumbnails[saga]?.[arc] || 'https://i.imgur.com/quest_scroll.png';
}

// Helper function to get progress bar
function getProgressBar(currentStep, maxSteps = 10) {
		const filled = Math.min(currentStep, maxSteps);
		const empty = maxSteps - filled;
		return '█'.repeat(filled) + '░'.repeat(empty);
}

module.exports = {
		data: new SlashCommandBuilder()
				.setName('quests')
				.setDescription('View your active quests and progression.'),
		async execute(interaction) {
				try {
						const player = interaction.client.players.get(interaction.user.id);
						if (!player) {
								const embed = new EmbedBuilder()
										.setColor(0xFF6B35)
										.setTitle('🚀 No Character Found')
										.setDescription("You need to create a character first to view quests!")
										.setThumbnail('https://i.imgur.com/onepiece_logo.png')
										.addFields({ 
												name: 'Getting Started', 
												value: 'Use `/start` to create your character and begin your adventure!' 
										})
										.setTimestamp();
								return interaction.reply({ embeds: [embed], ephemeral: true });
						}

						if (!player.progression?.msq) {
								const embed = new EmbedBuilder()
										.setColor(0xFF0000)
										.setTitle('⚠️ Quest Data Missing')
										.setDescription('Your quest progression data is missing or corrupted.')
										.setThumbnail('https://i.imgur.com/warning.png')
										.addFields({ 
												name: 'Solution', 
												value: 'Please contact support or use `/start` to recreate your character.' 
										})
										.setTimestamp();
								return interaction.reply({ embeds: [embed], ephemeral: true });
						}

						const { saga, arc, origin, step } = player.progression.msq;
						const currentQuest = allQuests[saga]?.[arc]?.[origin]?.[step];

						if (!currentQuest) {
								const embed = new EmbedBuilder()
										.setColor(0x6A7482)
										.setTitle('📜 Quest Log')
										.setDescription('You have no active quests at the moment. Your current arc may be complete!')
										.setThumbnail('https://i.imgur.com/completed_quest.png')
										.addFields(
												{ 
														name: '📊 Current Progress', 
														value: `**${saga}:** ${arc}\n*Origin:* ${origin}\n*Step:* ${step}` 
												},
												{ 
														name: '🎯 What\'s Next?', 
														value: 'New quests may become available soon. Check back later or explore your current location with `/island`!' 
												}
										)
										.setTimestamp();
								return interaction.reply({ embeds: [embed] });
						}

						// Calculate quest progress
						const progressPercent = Math.min((step / 10) * 100, 100); // Assuming max 10 steps per arc
						const progressBar = getProgressBar(step, 10);

						const embed = new EmbedBuilder()
								.setColor(0xFFD700)
								.setTitle('📋 Main Story Quest')
								.setDescription(`Your current adventure in the world of One Piece`)
								.setThumbnail(getQuestThumbnail(saga, arc))
								.addFields(
										{ 
												name: `📘 ${saga}: ${arc}`, 
												value: `**${currentQuest.title}**`, 
												inline: false 
										},
										{ 
												name: '📖 Description', 
												value: currentQuest.description, 
												inline: false 
										},
										{ 
												name: '🎯 Current Objective', 
												value: `*${currentQuest.objective}*`, 
												inline: false 
										},
										{ 
												name: '📊 Arc Progress', 
												value: `${progressBar} ${progressPercent.toFixed(0)}%\nStep ${step}`, 
												inline: true 
										},
										{ 
												name: '📍 Location', 
												value: player.progression.location || 'Unknown', 
												inline: true 
										},
										{ 
												name: '⚡ Power Level', 
												value: `${player.stats?.power || 0}`, 
												inline: true 
										}
								)
								.setFooter({ 
										text: 'Use /island to interact with your current location and progress!' 
								})
								.setTimestamp();

						await interaction.reply({ embeds: [embed] });
				} catch (error) {
						console.error('Error in quests command:', error);
						const embed = new EmbedBuilder()
								.setColor(0xFF0000)
								.setTitle('❌ Error')
								.setDescription('An error occurred while fetching your quests. Please try again.')
								.setThumbnail('https://i.imgur.com/warning.png')
								.setTimestamp();
						await interaction.reply({ embeds: [embed], ephemeral: true });
				}
		},
};