const Discord = require('discord.js')

module.exports = {
    name: 'holo',
    description: 'Posle Holo',
    cooldown: 4,
    async execute(message, args) {

        if(!message.channel.nsfw) return message.channel.send("Toto môžeš použiť iba v NSFW kanáloch. ")

        const fetch = require("node-fetch")
        var json = await (await fetch("https://api.hyrousek.tk/nsfw/holo")).json();
        if(!json.url) return;

        
        
        var embed = new Discord.MessageEmbed()
            .setImage(json.url)
            .setTitle('Užívaj!')
            .setFooter('API vytvoril 𝙃𝙮𝙧𝙤#8938 | Bota vytvoril Slenky#0001')
            .setURL('https://memesare.fun')
        message.channel.send(embed)
    },
};