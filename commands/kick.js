const Discord = require('discord.js')

module.exports = {
	name: 'kick',
	description: 'Kickne membera',
    cooldown: 4,

    async run (client, message, args ) {

  
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('Toto nemôžeš použiť!')
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send('Na toto porebujem permisiu `KICK_MEMBERS`.')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send('Prosím špecifikuj niekoho!');

        if(!member) return message.channel.send('Tento použítaveľ nebol nájdený. ');
        if(!member.kickable) return message.channel.send('Tento používateľ nemôže byť kicknutý. Je to buď lebo je mod/admin alebo jeho rola je nadomnou. :/');

        if(member.id === message.author.id) return message.channel.send('Prečo by si kickoval seba? ಠ~ಠ');

        let reason = args.slice(1).join(" ");

        if(reason === undefined) reason = 'Nešpecifikované';

        member.kick(reason)
        .catch(err => {
            if(err) return message.channel.send('Niečo sa pokakalo.')
        })

        message.channel.send('Úspešne si vyhodil člena', member);


    }
}