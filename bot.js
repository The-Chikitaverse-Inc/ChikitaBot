require('dotenv').config()
const { Client, GatewayIntentBits, Collection } = require('discord.js')
const fs = require('fs')
const path = require('path')
const { registerCommands } = require('./config/registerBotCmd')

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
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

client.login(process.env.DISCORD_TOKEN)