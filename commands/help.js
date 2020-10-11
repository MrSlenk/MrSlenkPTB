const Discord = require('discord.js')

module.exports = {
	name: 'help',
    description: 'Posle help',
	async execute(message, args) {
        var embed = new Discord.MessageEmbed()
        .setTitle('List príkazov bota Mr. Slenk')
        .setColor ('ORANGE')
        .setAuthor('Bota vytvoril Slenky#0001')
        .setURL('http://memesare.fun')
        .addField('List príkazov:', "Všetky príkazy nájdeš na webe memesare.fun/prikazy")
        .setFooter('Prefix pre všetky príkazy je ";"')
        message.channel.send(embed)
    },
};