require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});


const token = process.env.DISCORD_TOKEN;

client.once('ready', () => {
    console.log(`Bot conectado como ${client.user.tag}`);
});

// Testa se ele esta funcionando de acordo
client.on('messageCreate', message => {
    if (message.content === "$ping") {
        message.reply("Pong!");
    }
});

// Faz uma saudação aos religiosos de Chikita
client.on('messageCreate', message => {
    if (message.content === "$chikitalismo") {
        message.reply(`Ola <@${message.author.id}> gostaria de uma palavra do Chikitalismo?`);
    }
});

// Mostra o rosto feio do que executou o comando
client.on('messageCreate', message => {
    if (message.content === "$perfil") {
        const embed = new EmbedBuilder()
            .setTitle(`Fotinha de ${message.author.username} 🤭`)
            .setImage(message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setColor("Blue");

        message.reply({ embeds: [embed] });
    }
});

  // Chikita da um fora de forma aleatoria
  client.on('messageCreate', message => {
    if (message.content.toLowerCase() === '$sedeclara') {
       // Respostas do comando $ch teamo
       const respostas = [
        {  texto: "Eu tambem me amo! ♥️",imagem: 'img/chikitailove.jpg' },
        {  texto: "Todas dizem isso", imagem: 'img/chikitaomg.jpg' },
        {  texto: "Ah mais um(a) querendo >:(", imagem: 'img/chikitaestoysaindo.jpg'},
        {  texto: "Literalmente Você, 👇 Tarado(a)!", imagem: 'img/chikitatarados.jpg'}
        
      ];
  
      const respostaAleatoria = respostas[Math.floor(Math.random() * respostas.length)];
  
      message.channel.send({
        content: respostaAleatoria.texto,
        files: [respostaAleatoria.imagem]
      });
    }
  });

  // Tentativa de Bater em chikita
  client.on('messageCreate', message => {
    if (message.content.startsWith('$bater')) {
      // Caminho da imagem local
      const imagemLocal = 'img/chikitatente.jpg';
  
      // Envia a imagem
      message.channel.send({
        content: `Tente <@${message.author.id}>, apenas tente..`,
        files: [imagemLocal]
      });
    }
  });

  // Provas do Chikitaverso
  client.on('messageCreate', message => {
    if (message.content.startsWith('$chikitaverso')) {
      // Caminho da imagem local
      const imagemLocal = 'img/chikitaverso.jpg';
  
      // Envia a imagem
      message.channel.send({
        content: `O Chikitaverso e real <@${message.author.id}>, to te falando aqui a prova: `,
        files: [imagemLocal]
      });
    }
  });

client.login(token);

