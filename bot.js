require('dotenv').config()
const { Client, GatewayIntentBits, Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags} = require('discord.js')
const fs = require('fs')
const path = require('path')
const { registerCommands } = require('./config/registerBotCmd')
const { error } = require('console')
const express = require('express')

const app = express()
const PORT = 1995
app.use(express.json())

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
})

app.get('/', (req, res) => {
    res.json({
        message: 'Bot successfully online',
        code: 200
    })
})

//* Coleção de comandos
client.commands = new Collection()

//* Carrega os comandos da pasta
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.data.name, command)
}

//* Registra comandos na guild
registerCommands()

client.once('ready', () => {
    console.log(`🤖 Bot online como ${client.user.tag}`)
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return

    const command = client.commands.get(interaction.commandName)
    if (!command) return

    try {
        await command.execute(interaction)
    } catch (err) {
        console.error(err)
        await interaction.reply({ content: '❌ Erro ao executar comando', ephemeral: true })
    }
})

const idsChanell = {
    test: '1345534530253226054',
    prod: '1387864623197196448',
}

const activeIntervals = new Map()

client.on('ready', () => {
    
    const channelID = idsChanell.prod
    const time = 240 * 60 * 1000

    if (activeIntervals.has(channelID)) {
        clearInterval(activeIntervals.get(channelID))
    }

    const intervaloAchocolatado = setInterval(async () => {
        try {
            const canal = await client.channels.fetch(channelID);
            if (!canal) {
                console.error('Canal não encontrado!');
                return;
            }

            const botao = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('pegar_achocolatado')
                    .setLabel('Pegar ☕')
                    .setStyle(ButtonStyle.Primary)
            );

            await canal.send({
                content: 'Achocolatado pronto! Pegue o seu <:chocomilk:1377028617954918571> @here',
                components: [botao]
            });
        } catch (error) {
            console.error('Erro ao enviar mensagem automática:', error);
        }
    }, time);

    activeIntervals.set(channelID, intervaloAchocolatado);
})

client.on('interactionCreate', async (interaction) => { 
    if (!interaction.isButton()) return;

    if (interaction.customId === 'pegar_achocolatado') {
        try {
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: `<@${interaction.user.id}> já pegou seu achocolatado! 🍫☕`,
                });
                return;
            }

            await interaction.reply({
                content: `<@${interaction.user.id}> pegou o achocolatado! 🍫☕`,
            });

        } catch (err) {
            console.error('Erro ao processar interação:', err);
            
            // Se ainda não respondeu, envia mensagem de erro
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({
                    content: '❌ Erro ao processar seu pedido',
                    flags: MessageFlags.Ephemeral
                });
            }
        }
    }
})


process.on('SIGINT', () => {
    activeIntervals.forEach(interval => clearInterval(interval));
    process.exit();
})

client.login(process.env.DISCORD_TOKEN)
app.listen(PORT, () => {
    console.log(`Bot em ${PORT}`)
})