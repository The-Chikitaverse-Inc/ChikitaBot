require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Responde com Pong!'),

    new SlashCommandBuilder()
        .setName('chikitalismo')
        .setDescription('Receba uma palavra do Chikitalismo'),

    new SlashCommandBuilder()
        .setName('perfil')
        .setDescription('Mostra sua foto de perfil'),

    new SlashCommandBuilder()
        .setName('teamo')
        .setDescription('Chikita reage ao seu amor'),

    new SlashCommandBuilder()
        .setName('bater')
        .setDescription('Tente bater no Chikita'),

    new SlashCommandBuilder()
        .setName('chikitaverso')
        .setDescription('Provas do Chikitaverso'),

    new SlashCommandBuilder()
        .setName('teste')
        .setDescription('Envia um webhook de teste'),
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('🔄 Registrando Slash Commands no Servidor...');
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );
        console.log('✅ Slash Commands registrados no servidor!');
    } catch (error) {
        console.error('❌ Erro ao registrar comandos:', error);
    }
})();
