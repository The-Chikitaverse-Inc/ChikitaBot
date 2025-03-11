require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});


const token = process.env.DISCORD_TOKEN;
const webhookUrlConsole = process.env.WEB_HOOK_AVISO

// WebHooks
const data = {
  content: "Bot iniciado..",
  username: "Console",
};

fetch(webhookUrlConsole, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
})
  .then((res) => res.json())
  .then((json) => console.log("✅ Mensagem enviada:", json))
  .catch((err) => console.error("❌ Erro ao enviar:", err));


// Comandos do Bot Abaixo
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
    if (message.content.toLowerCase() === '$teamo') {
       // Respostas do comando $ch teamo
       const respostas = [
        {  texto: "Eu tambem me amo! ♥️",imagem: 'img/chikitailove.jpg' },
        {  texto: "Todas dizem isso", imagem: 'img/chikitaomg.jpg' },
        {  texto: "Ah mais um(a) enxer o saco!", imagem: 'img/chikitaestoysaindo.jpg'},
        {  texto: "Literalmente Você: 👇", imagem: 'img/chikitatarados.jpg'}
        
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

  //Comando de teste com webhooks
  client.on("messageCreate", async (message) => {
    if (message.author.bot) return; 
  
    if (message.content === "$teste") {
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
          console.log('Mesagem enviada!')
        } else {
          console.log('Erro ao enviar a messagem')
        }
      } catch (error) {
        console.error("Erro ao enviar webhook:", error);
        message.reply("❌ Erro ao conectar ao webhook.");
      }
    }
  });


  
client.login(token);

