require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder, REST, Routes } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

//* Comandos Registrados
const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Responde com Pong!'),
    new SlashCommandBuilder().setName('chikitalismo').setDescription('Receba uma palavra do Chikitalismo'),
    new SlashCommandBuilder().setName('perfil').setDescription('Mostra sua foto de perfil'),
    new SlashCommandBuilder().setName('teamo').setDescription('Chikita reage ao seu amor'),
    new SlashCommandBuilder().setName('bater').setDescription('Tente bater no Chikita'),
    new SlashCommandBuilder().setName('chikitaverso').setDescription('Provas do Chikitaverso'),
    new SlashCommandBuilder().setName('help').setDescription('Comando Para ver toda a lista de Comandos')
].map(command => command.toJSON());

//* Registrar comandos na API do Discord
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Registrando Slash Commands no Servidor...');
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );
        console.log('✅ Slash Commands registrados!');
    } catch (error) {
        console.error('Erro ao registrar comandos:', error);
    }
})();

//* Quando o bot for ligado
client.once('ready', () => {
    console.log(`🤖 Bot está online como ${client.user.tag}`);
});

//* Comandos 
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply("🏓 Pong!");
    }

    if (commandName === 'chikitalismo') {
        await interaction.reply(`Ola <@${interaction.user.id}>, gostaria de uma palavra do Chikitalismo?`);
    }

    if (commandName === 'perfil') {
        const embed = new EmbedBuilder()
            .setTitle(`Fotinha de <@${interaction.user.id}>`)
            .setThumbnail(interaction.user.displayAvatarURL())
            .setFields(
                {
                    name: 'Nome:', 
                    value: `${interaction.user.username} 
                            \n Apelido: ${interaction.member.nick} 
                            \n Tag: ${interaction.user.tag}`,
                    inline: true
                },
                {
                    name: 'Info Serve:',
                    value: `Esta no Servidor ${interaction.guild.name} com ${interaction.guild.memberCount} membros
                     Entrou em ${interaction.member.joinedAt}. \n
                     Seus cargos são ${interaction.roles.cache} \n
                     `
                }
                
            )
            .setColor('Aqua');

        await interaction.reply({ embeds: [embed] });
    }

    if (commandName === 'teamo') {
        const respostas = [
            { texto: "Eu também me amo! ♥️", imagem: 'img/chikitailove.jpg' },
            { texto: "Todas dizem isso", imagem: 'img/chikitaomg.jpg' },
            { texto: "Ah, mais um(a) enchendo o saco!", imagem: 'img/chikitaestoysaindo.jpg' },
            { texto: "Literalmente Você: 👇", imagem: 'img/chikitatarados.jpg' }
        ];

        const respostaAleatoria = respostas[Math.floor(Math.random() * respostas.length)];

        await interaction.reply({
            content: respostaAleatoria.texto,
            files: [respostaAleatoria.imagem]
        });
    }

    if (commandName === 'bater') {
        const imagemLocal = 'img/chikitatente.jpg';
        await interaction.reply({
            content: `Tente <@${interaction.user.id}>, apenas tente..`,
            files: [imagemLocal]
        });
    }

    if (commandName === 'chikitaverso') {
        const imagemLocal = 'img/chikitaverso.jpg';
        await interaction.reply({
            content: `O Chikitaverso é real <@${interaction.user.id}>, aqui está a prova: `,
            files: [imagemLocal]
        });
    }

    if (commandName === 'help') {
        const embed = new EmbedBuilder()
            .setTitle("Comandos de Chikita Bot:")
            .setColor('Aqua')
            .addFields(
                { name: "/ping", value: "Responde com pong para verificar se bot está funcionando corretamente." },
                { name: "/chikitalismo", value: "Tenta converter você ao Chikitalismo com uma simples frase." },
                { name: "/perfil", value: "Mostra sobre o seu perfil." },
                { name: "/teamo", value: "ChikitaBot te rejeita por estar querendo namorar um bot." },
                { name: "/bater", value: "Faz uma ameaça por estar brincando com o que não deve." },
                { name: "/chikitaverso", value: "Ela mostra uma prova de que o Chikitaverso é real." },
                { name: "/help", value: "Mostra os comandos." }
            )
            .setFooter({ text: "Mensagem direta do The Chikitaverse Inc." });

        await interaction.reply({
            content: `Aqui estão os comandos, meu caro(a) <@${interaction.user.id}>:`,
            embeds: [embed]
        });
    }
});

client.login(process.env.DISCORD_TOKEN);
