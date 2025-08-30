const Enmap = require('enmap');
const fs = require('fs');
const path = require('path');

const backupFile = process.argv[2];
if (!backupFile) {
    console.error('❌ Please provide a backup file path');
    console.log('Usage: node scripts/restore-database.js <backup-file-path>');
    process.exit(1);
}

if (!fs.existsSync(backupFile)) {
    console.error(`❌ Backup file not found: ${backupFile}`);
    process.exit(1);
}

console.log(`📥 Restoring from backup: ${backupFile}`);

const players = new Enmap({ name: 'players' });
const guildSettings = new Enmap({ name: 'guild_settings' });

const backup = JSON.parse(fs.readFileSync(backupFile, 'utf8'));

console.log(`📊 Backup contains:`);
console.log(`   - ${backup.stats.playerCount} players`);
console.log(`   - ${backup.stats.guildCount} guild settings`);
console.log(`   - Created: ${backup.timestamp}`);

// Clear existing data
players.clear();
guildSettings.clear();

// Restore players
backup.players.forEach(entry => {
    players.set(entry.id, entry.data);
});

// Restore guild settings
backup.guildSettings.forEach(entry => {
    guildSettings.set(entry.id, entry.data);
});

console.log('✅ Database restored successfully');
