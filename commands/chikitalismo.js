const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('chikitalismo')
    .setDescription('Receba uma palavra do Chikitalismo'),
  async execute(interaction) {
    await interaction.reply(`Ola <@${interaction.user.id}>, gostaria de uma palavra do Chikitalismo?`)
  }
}