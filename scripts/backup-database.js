const Enmap = require('enmap');
const fs = require('fs');
const path = require('path');

console.log('Starting database backup...');

const players = new Enmap({ name: 'players' });
const guildSettings = new Enmap({ name: 'guild_settings' });

const backupDir = path.join(__dirname, '../backups');
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupFile = path.join(backupDir, `backup-${timestamp}.json`);

const backup = {
    timestamp: new Date().toISOString(),
    players: players.array().map(([key, value]) => ({ id: key, data: value })),
    guildSettings: guildSettings.array().map(([key, value]) => ({ id: key, data: value })),
    stats: {
        playerCount: players.size,
        guildCount: guildSettings.size
    }
};

fs.writeFileSync(backupFile, JSON.stringify(backup, null, 2));
console.log(`✅ Backup created: ${backupFile}`);
console.log(`📊 Backed up ${backup.stats.playerCount} players and ${backup.stats.guildCount} guild settings`);