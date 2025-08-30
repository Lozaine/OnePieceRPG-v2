// commands/utility/help.js
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get help with bot commands and features.')
        .addStringOption(option =>
            option.setName('command')
                .setDescription('Get specific help for a command')
                .setRequired(false)
                .addChoices(
                    { name: 'start', value: 'start' },
                    { name: 'profile', value: 'profile' },
                    { name: 'quests', value: 'quests' },
                    { name: 'island', value: 'island' },
                    { name: 'stats', value: 'stats' },
                    { name: 'ping', value: 'ping' }
                )
        ),
    async execute(interaction) {
        try {
            const specificCommand = interaction.options.getString('command');

            if (specificCommand) {
                return await showCommandHelp(interaction, specificCommand);
            }

            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('🏴‍☠️ One Piece Bot Commands')
                .setDescription('Welcome to your One Piece adventure! Here are all available commands:')
                .setThumbnail('https://i.imgur.com/onepiece_logo.png')
                .addFields(
                    {
                        name: '🚀 Getting Started',
                        value: '`/start` - Create your character and begin your adventure\n`/profile` - View your character stats and information\n`/help [command]` - Get detailed help for specific commands',
                        inline: false
                    },
                    {
                        name: '⚔️ Adventure Commands',
                        value: '`/quests` - View your active quests and objectives\n`/island` - Explore your current location and available actions\n`/stats` - View detailed character statistics',
                        inline: false
                    },
                    {
                        name: '🛠️ Utility Commands',
                        value: '`/ping` - Check bot response time and status',
                        inline: false
                    },
                    {
                        name: '🎯 Quick Start Guide',
                        value: '1. Use `/start` to create your character\n2. Choose your race, origin, and dream\n3. Use `/quests` to see your objectives\n4. Use `/island` to explore and progress\n5. Use `/profile` to track your growth',
                        inline: false
                    }
                )
                .setFooter({ 
                    text: 'Use /help [command] for detailed information about specific commands' 
                })
                .setTimestamp();

            const supportButton = new ButtonBuilder()
                .setCustomId('help_support')
                .setLabel('Need More Help?')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('❓');

            const actionRow = new ActionRowBuilder().addComponents(supportButton);

            await interaction.reply({ 
                embeds: [embed], 
                components: [actionRow],
                ephemeral: true 
            });
        } catch (error) {
            console.error('Error in help command:', error);
            const embed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle('❌ Error')
                .setDescription('An error occurred while loading help information.')
                .setThumbnail('https://i.imgur.com/warning.png')
                .setTimestamp();
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    },
};

async function showCommandHelp(interaction, commandName) {
    const helpInfo = {
        start: {
            title: '🚀 /start Command',
            description: 'Begin your One Piece adventure by creating your character.',
            usage: '`/start`',
            details: '• Creates a new character (overwrites existing)\n• Choose from 5 unique races\n• Select your origin story\n• Pick your ultimate dream\n• Determines starting location and abilities',
            tips: 'Each choice affects your journey differently. Choose wisely!',
            thumbnail: 'https://i.imgur.com/start_command.png'
        },
        profile: {
            title: '📊 /profile Command',
            description: 'View your character stats, progress, and information.',
            usage: '`/profile`',
            details: '• Shows power level and rank\n• Displays current location\n• Shows quest progression\n• Lists character details (race, origin, dream)',
            tips: 'Use this to track your growth and see how far you\'ve come!',
            thumbnail: 'https://i.imgur.com/profile_command.png'
        },
        quests: {
            title: '📜 /quests Command',
            description: 'View your active quests and current objectives.',
            usage: '`/quests`',
            details: '• Shows main story quest details\n• Displays current objective\n• Shows progression through current arc\n• Indicates next steps to take',
            tips: 'Always check your quests when unsure what to do next!',
            thumbnail: 'https://i.imgur.com/quest_command.png'
        },
        island: {
            title: '🏝️ /island Command',
            description: 'Explore your current location and take actions.',
            usage: '`/island`',
            details: '• Shows current island information\n• Lists available actions and locations\n• Allows quest progression\n• Reveals exploration opportunities',
            tips: 'This is where most of your adventure happens - explore thoroughly!',
            thumbnail: 'https://i.imgur.com/island_command.png'
        },
        stats: {
            title: '📈 /stats Command',
            description: 'View detailed statistics about your character and progress.',
            usage: '`/stats`',
            details: '• Shows detailed power breakdown\n• Displays level and experience\n• Lists racial abilities\n• Shows quest completion stats',
            tips: 'Use this for a comprehensive overview of your character\'s development!',
            thumbnail: 'https://i.imgur.com/stats_command.png'
        },
        ping: {
            title: '🏓 /ping Command',
            description: 'Check bot response time and connection status.',
            usage: '`/ping`',
            details: '• Shows bot latency\n• Displays API response time\n• Indicates connection quality\n• Confirms bot is responsive',
            tips: 'Use this if the bot seems slow or unresponsive.',
            thumbnail: 'https://i.imgur.com/ping_command.png'
        }
    };

    const info = helpInfo[commandName];
    if (!info) {
        return await interaction.reply({
            content: 'Command help not found for that command.',
            ephemeral: true
        });
    }

    const embed = new EmbedBuilder()
        .setColor(0x00FF7F)
        .setTitle(info.title)
        .setDescription(info.description)
        .setThumbnail(info.thumbnail)
        .addFields(
            { name: '📝 Usage', value: info.usage, inline: false },
            { name: '📋 Details', value: info.details, inline: false },
            { name: '💡 Tips', value: info.tips, inline: false }
        )
        .setFooter({ text: 'Use /help to see all commands' })
        .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
}