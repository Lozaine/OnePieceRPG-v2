const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const allIslands = require('../../data/islands');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('island')
		.setDescription('View details and actions for your current island.'),
	async execute(interaction) {
		const player = interaction.client.players.get(interaction.user.id);
		const islandName = player.progression.location;
		const islandData = allIslands[islandName];

		if (!islandData) {
			return interaction.reply({ content: "You seem to be lost at sea! Your location is invalid.", ephemeral: true });
		}

		const embed = new EmbedBuilder()
			.setColor(0x32CD32)
			.setTitle(`📍 ${islandData.name}`)
			.setDescription(islandData.description);

		const actionRow = new ActionRowBuilder();
		let hasActions = false;

		// Check for available locations/actions based on player's quest state
		islandData.locations.forEach(location => {
			if (location.condition(player)) {
				actionRow.addComponents(
					new ButtonBuilder()
						.setCustomId(location.id)
						.setLabel(location.label)
						.setStyle(ButtonStyle.Primary)
				);
				hasActions = true;
			}
		});

        if(hasActions){
		    await interaction.reply({ embeds: [embed], components: [actionRow] });
        } else {
            embed.setFooter({text: "There are no special actions for you here right now."});
            await interaction.reply({ embeds: [embed] });
        }
	},
};