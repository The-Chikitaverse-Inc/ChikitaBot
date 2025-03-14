require('dotenv').config();
const { REST, Routes } = require('discord.js');

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('🗑️ Removendo todos os comandos globais...');
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: [] } // Passa um array vazio para deletar todos
        );
        console.log('✅ Comandos globais removidos!');

        console.log('🗑️ Removendo todos os comandos do servidor...');
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: [] } // Passa um array vazio para deletar todos os comandos do servidor
        );
        console.log('✅ Comandos do servidor removidos!');
    } catch (error) {
        console.error('❌ Erro ao remover comandos:', error);
    }
})();
