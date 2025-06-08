const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('chikitaverso')
    .setDescription('Provas do Chikitaverso'),
  async execute(interaction) {
    const imagemLocal = 'img/chikitaverso.jpg'
    await interaction.reply({
      content: `O Chikitaverso é real <@${interaction.user.id}>, aqui está a prova: `,
      files: [imagemLocal]
    })
  }
}