const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('perfil')
    .setDescription('Mostra sua foto de perfil'),
  async execute(interaction) {
    const embed01 = new EmbedBuilder()
      .setThumbnail(interaction.user.displayAvatarURL())
      .setFields(
        {
          name: 'Nome:',
          value: `${interaction.user.username}\nApelido: ${interaction.member.nick || 'Sem apelido'}\nTag: ${interaction.user.tag}`,
          inline: true
        },
        {
          name: 'Info Serve:',
          value: `Esta no Servidor ${interaction.guild.name} com ${interaction.guild.memberCount} membros\nEntrou em ${interaction.member.joinedAt}\nSeus cargos são ${interaction.member.roles.cache.map(role => role.name.replace('@', '')).join(', ')}`
        }
      )
      .setColor('Blue')

    await interaction.reply({
      content: `<@${interaction.user.id}>`,
      embeds: [embed01]
    })
  }
}