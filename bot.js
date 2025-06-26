require('dotenv').config()
const { Client, GatewayIntentBits, Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags} = require('discord.js')
const fs = require('fs')
const path = require('path')
const { registerCommands } = require('./config/registerBotCmd')
const { error } = require('console')

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

client.on('ready', () => {
    //* Configura o intervalo para enviar a mensagem a cada 15 minutos
    const chanellID = '1387864623197196448'
    const time = 150 * 60 * 1000

    //* Envia a mensagem com botão a cada 15 minutos
    const intervaloAchocolatado = setInterval(async () => {
        try {
            const canal = await client.channels.fetch(chanellID);
            if (!canal) {
                console.error('Canal não encontrado!')
                return;
            }

            //* Cria o botão "Pegar achocolatado"
            const botao = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('pegar_achocolatado')
                    .setLabel('Pegar ☕')
                    .setStyle(ButtonStyle.Primary)
            );

            //* Envia a mensagem automática com o botão
            await canal.send({
                content: 'Achocolatado pronto! Pegue o seu  <:chocomilk:1377028617954918571>  @here',
                components: [botao]
            });
        } catch (error) {
            console.error('Erro ao enviar mensagem automática:', error)
        }
    }, time)
})

//* Resposta da messagem acima
client.on('interactionCreate', async (interaction) => { 
    if (!interaction.isButton()) return;

    if (interaction.customId === 'pegar_achocolatado') {
        try {
            const originMessage = await interaction.channel.messages.fetch(interaction.message.id)
            await originMessage.react('<:chocomilk:1387877957917348064>')

            //* Enviea uma messagem so pra pessoa que clicou
            await interaction.reply({
                content: `<@${interaction.user.id}> pegou o achocolatado! 🍫☕`,
                flags: MessageFlags.Ephemeral
            })
        } catch (err) {
            console.error(`Erro ao enviar a messagem: ${err}`)
                await interaction.reply({
                    content: 'Erro ao nessa interação',
                    flags: MessageFlags.Ephemeral
                })
        }

    }
})

client.login(process.env.DISCORD_TOKEN)