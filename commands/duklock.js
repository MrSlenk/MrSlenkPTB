const Discord = require('discord.js')

module.exports = {
	name: 'duklock',
	description: 'Posle meme od duklocka',
	cooldown: 4,
	async execute(message, args) {
        const fetch = require("node-fetch");
      	var json = await (await fetch("https://api.hyrousek.tk/useless/reddit?reddit=duklock")).json();
      	if(!json.url) return;
      
      	var embed = new Discord.MessageEmbed()
        	.setImage(json.url)
        	.setTitle(json.title)
        	.setFooter('API vytvoril 𝙃𝙮𝙧𝙤#8938 | Bota vytvoril Slenky#0001')
        	.setURL('http://memesare.fun')
     	message.channel.send(embed)
    },
};