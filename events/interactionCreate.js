
const { Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const { races, origins, dreams } = require('../data/characterOptions');
const allQuests = require('../data/quests');
const allIslands = require('../data/islands');

// A helper function to get the player's current MSQ object
function getCurrentQuest(player) {
    if (!player || !player.progression || !player.progression.msq) return null;
    const { saga, arc, origin, step } = player.progression.msq;
    return allQuests[saga]?.[arc]?.[origin]?.[step] || null;
}

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		const { client } = interaction;

		// Handle Slash Commands
		if (interaction.isChatInputCommand()) {
            // Ensure player exists before running most commands
            const playerExists = client.players.has(interaction.user.id);
            if (interaction.commandName !== 'start' && !playerExists) {
                return interaction.reply({
                    content: 'You need to create a character first! Use the `/start` command to begin your adventure.',
                    ephemeral: true,
                });
            }
			const command = interaction.client.commands.get(interaction.commandName);
			if (!command) return;
			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
                } else {
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
			}
			return;
		}

		// Character Creation Button Logic
		if (interaction.isButton() && interaction.customId.startsWith('start_')) {
            await interaction.deferUpdate(); // Defer the interaction immediately
            
			if (interaction.customId === 'start_confirm') {
                // Since we store creation data on the player object now, we get it from the DB
				const player = client.players.get(interaction.user.id);
                if (!player?.character?.race || !player?.character?.origin || !player?.character?.dream) {
					return interaction.editReply({ content: 'Your character data is incomplete. Please use `/start` again.', embeds: [], components: [] });
				}

				// Set initial player progression
                player.progression = {
                    msq: {
                        saga: 'East Blue',
                        arc: 'Romance Dawn',
                        origin: player.character.origin,
                        step: 1,
                    },
                    location: '', // Will be set below
                };
                player.stats = { power: 10 }; // Starting power!

                // Set starting location based on origin
                switch (player.character.origin) {
                    case 'marine': player.progression.location = 'Shells Town'; break;
                    case 'pirate': player.progression.location = 'Syrup Village'; break;
                    case 'revolutionary': player.progression.location = 'Ohara Ruins'; break;
                    case 'neutral': player.progression.location = 'The Baratie'; break;
                }

                client.players.set(interaction.user.id, player);

				const embed = new EmbedBuilder()
					.setColor(0x23A55A)
					.setTitle('Welcome to the Great Pirate Era!')
					.setDescription(`Your adventure as a **${player.character.race}** begins now in **${player.progression.location}**!\n\nUse \`/quests\` to see your first objective and \`/island\` to interact with the world.`);
				
				await interaction.editReply({ embeds: [embed], components: [] });
			}
        }

        // Handle Quest-related Buttons
        if (interaction.isButton() && !interaction.customId.startsWith('start_')) {
            await interaction.deferUpdate(); // Defer the interaction immediately
            
            const player = client.players.get(interaction.user.id);
            if (!player) return; // Should not happen if slash command check is working

            // Example: Handling the first quest step for a Marine
            if (interaction.customId === 'marine_base_investigate') {
                const quest = getCurrentQuest(player);
                if (!quest) return; // No active quest

                // Progress the quest
                player.progression.msq.step++;
                player.stats.power += 5; // Reward power for completing a step
                client.players.set(interaction.user.id, player);

                const embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle('Quest Progress!')
                    .setDescription("You sneak around the base and find forged documents in a supply closet, confirming Lt. Rokkaku's suspicions. You've gained some power from the experience!")
                    .setFooter({ text: "Your main story quest has been updated." });
                
                await interaction.editReply({ embeds: [embed], components: [] });
            }
            // ... Add handlers for pirate, revolutionary, and neutral first steps here
        }

		// This part remains largely the same, but now saves to the database
		if (interaction.isStringSelectMenu() && interaction.customId.startsWith('start_')) {
            await interaction.deferUpdate(); // Defer the interaction immediately
            
            // Get or create a temporary player object for character creation
            const player = client.players.ensure(interaction.user.id, { character: {} });

			if (interaction.customId === 'start_select_race') {
				player.character.race = interaction.values[0];
                client.players.set(interaction.user.id, player);

				const originMenu = new StringSelectMenuBuilder()
					.setCustomId('start_select_origin')
					.setPlaceholder('Select your origin story')
					.addOptions(origins.map(o => ({ label: o.label, description: o.description, value: o.value })));
				const row = new ActionRowBuilder().addComponents(originMenu);
				// ... embed logic is the same, no changes needed
                const selectedRaceInfo = races.find(r => r.value === player.character.race);
                const embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle('Character Creation: Step 2')
                    .setDescription(`**Race Selected:** ${selectedRaceInfo.label}\n*${selectedRaceInfo.details}*`)
                    .addFields({ name: 'Next, Choose Your Origin', value: 'Where does your story begin? This sets your starting location and faction.' });
				await interaction.editReply({ embeds: [embed], components: [row] });
			} else if (interaction.customId === 'start_select_origin') {
                player.character.origin = interaction.values[0];
                client.players.set(interaction.user.id, player);
                // ... logic to show dream menu
                const dreamMenu = new StringSelectMenuBuilder()
                    .setCustomId('start_select_dream')
                    .setPlaceholder('Select your ultimate dream')
                    .addOptions(dreams.map(d => ({ label: d.label, description: d.description, value: d.value })));
                const row = new ActionRowBuilder().addComponents(dreamMenu);
                const embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle('Character Creation: Step 3')
                    .setDescription('Your choices so far are shaping your destiny.')
                    .addFields({ name: 'Next, Choose Your Dream', value: 'What is the ultimate goal that drives you? This grants starting skills and equipment.' });
                await interaction.editReply({ embeds: [embed], components: [row] });
            } else if (interaction.customId === 'start_select_dream') {
                player.character.dream = interaction.values[0];
                client.players.set(interaction.user.id, player);
                // ... logic to show confirmation
                const confirmButton = new ButtonBuilder().setCustomId('start_confirm').setLabel('Confirm').setStyle(ButtonStyle.Success);
                const row = new ActionRowBuilder().addComponents(confirmButton);
                const embed = new EmbedBuilder()
                    .setColor(0x1EA400)
                    .setTitle('Character Confirmation')
                    .setDescription('Please review your choices to begin your adventure!')
                    .addFields(
                        { name: 'Race', value: races.find(r => r.value === player.character.race).label },
                        { name: 'Origin', value: origins.find(o => o.value === player.character.origin).label },
                        { name: 'Dream', value: dreams.find(d => d.value === player.character.dream).label }
                    );
                await interaction.editReply({ embeds: [embed], components: [row] });
            }
		}
	},
};
