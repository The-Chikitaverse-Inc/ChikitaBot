require('dotenv').config();
const { REST, Routes } = require('discord.js');

const TOKEN = process.env.DISCORD_TOKEN
const CLIENTID = process.env.CLIENT_ID

const rest = new REST({ version: '10' }).setToken(TOKEN);


(async () => {
    try {
        console.log(' Removendo todos os comandos globais...');
        await rest.put(
            Routes.applicationCommands(CLIENTID),
            { body: [] }
        );
        console.log(' Comandos globais removidos!');
    } catch (error) {
        console.error(' Erro ao remover comandos globais:', error);
    }
})();
