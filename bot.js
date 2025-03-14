require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds] // Apenas necessário para Slash Commands
});

const webhookUrlConsole = process.env.WEB_HOOK_AVISO;

client.once('ready', () => {
    console.log(`Bot está online como ${client.user.tag}`);
});


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply("🏓 Pong!");
    }

    if (commandName === 'chikitalismo') {
        await interaction.reply(`Ola <@${interaction.user.id}>, gostaria de uma palavra do Chikitalismo?`);
    }

    if (commandName === 'perfil') {
        const embed = new EmbedBuilder()
            .setTitle(`Fotinha de ${interaction.user.username} 🤭`)
            .setImage(interaction.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setColor("Blue");

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

    if (commandName === 'teste') {
        const data = {
            content: "Teste deu True",
            username: "Console",
        };

        try {
            const response = await fetch(webhookUrlConsole, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Mensagem enviada!');
                await interaction.reply("✅ Webhook enviado com sucesso!");
            } else {
                console.log('Erro ao enviar a mensagem');
                await interaction.reply("❌ Erro ao conectar ao webhook.");
            }
        } catch (error) {
            console.error("Erro ao enviar webhook:", error);
            await interaction.reply("❌ Erro ao conectar ao webhook.");
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
