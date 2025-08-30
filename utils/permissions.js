const { PermissionFlagsBits } = require('discord.js');

/**
 * Check if user has required permissions
 */
function hasPermission(member, permission) {
    return member.permissions.has(permission);
}

/**
 * Check if user is bot admin (customize this logic)
 */
function isBotAdmin(userId) {
    const adminIds = process.env.BOT_ADMINS?.split(',') || [];
    return adminIds.includes(userId);
}

/**
 * Check if user can use admin commands
 */
function canUseAdminCommands(interaction) {
    return isBotAdmin(interaction.user.id) || 
           hasPermission(interaction.member, PermissionFlagsBits.Administrator);
}

module.exports = {
    hasPermission,
    isBotAdmin,
    canUseAdminCommands
};