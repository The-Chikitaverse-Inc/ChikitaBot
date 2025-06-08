const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bater')
    .setDescription('Tente bater no Chikita'),
  async execute(interaction) {
    const imagemLocal = 'img/chikitatente.jpg'
    await interaction.reply({
      content: `Tente <@${interaction.user.id}>, apenas tente..`,
      files: [imagemLocal]
    })
  }
}