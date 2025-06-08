const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Comando Para ver toda a lista de Comandos'),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("Comandos de Chikita Bot:")
      .setColor('Blue')
      .addFields(
        { name: "/ping", value: "Responde com pong para verificar se bot está funcionando corretamente." },
        { name: "/chikitalismo", value: "Tenta converter você ao Chikitalismo com uma simples frase." },
        { name: "/perfil", value: "Mostra sobre o seu perfil." },
        { name: "/teamo", value: "ChikitaBot te rejeita por estar querendo namorar um bot." },
        { name: "/bater", value: "Faz uma ameaça por estar brincando com o que não deve." },
        { name: "/chikitaverso", value: "Ela mostra uma prova de que o Chikitaverso é real." },
        { name: "/help", value: "Mostra os comandos." }
      )
      .setFooter({ text: "Mensagem direta do The Chikitaverse Inc." })

    await interaction.reply({
      content: `Aqui estão os comandos, meu caro(a) <@${interaction.user.id}>:`,
      embeds: [embed]
    })
  }
}