const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('teamo')
        .setDescription('Chikita reage ao seu amor'),
    async execute(interaction) {
        const respostas = [
            { texto: "Eu também me amo! ♥️", imagem: 'img/chikitailove.jpg' },
            { texto: "Todas dizem isso", imagem: 'img/chikitaomg.jpg' },
            { texto: "Ah, mais um(a) enchendo o saco!", imagem: 'img/chikitaestoysaindo.jpg' },
            { texto: "Literalmente Você: 👇", imagem: 'img/chikitatarados.jpg' }
        ]
        const resposta = respostas[Math.floor(Math.random() * respostas.length)]
        await interaction.reply({
            content: resposta.texto,
            files: [resposta.imagem]
        })
    }
}
