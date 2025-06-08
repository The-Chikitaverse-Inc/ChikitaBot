const { REST, Routes } = require('discord.js')
const fs = require('fs')
const path = require('path')

const registerCommands = async () => {
    const commands = []

    const commandsPath = path.join(__dirname, '..', 'commands')
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

    for (const file of commandFiles) {
        const command = require(`../commands/${file}`)
        commands.push(command.data.toJSON())
    }

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN)

    try {
        console.log('🔄 Registrando Slash Commands...')
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )
        console.log('✅ Slash Commands registrados com sucesso!')
    } catch (error) {
        console.error('❌ Erro ao registrar comandos:', error)
    }
}

module.exports = { registerCommands }