const fs              = require('fs');
const Discord         = require('discord.js');
const {prefix, token} = require('./config.json');
const client          = new Discord.Client();
client.commands       = new Discord.Collection();
const commandFiles    = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const cooldowns       = new Discord.Collection();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

//const Constants = require('discord.js/src/util/Constants.js')
//Constants.DefaultOptions.ws.properties.$browser = `Discord iOS`

const Constants = require('discord.js/src/util/Constants.js')
Constants.DefaultOptions.ws.properties.$browser = `Discord iOS`
client.on("ready", () => {
  console.log("Loading status..")
  client.user.setActivity(`memesare.fun | ;help`, { type: 3, browser: "DISCORD IOS"  });
});

client.on('guildMemberAdd', member => {
    if (!member.guild) return;
    let guild = member.guild;
    
    let embed = new Discord.MessageEmbed() 
      .setColor("GREEN") 
      .setTitle("Vitaj!")
	  .setDescription(`Vitaj, ${member.user.tag} v **${guild.name}!** Tento server využíva bota Mr. Slenk, skvelého bota plného zábavných príkazov! Ak sa chceš dozvedieť viac, klikni [sem](https://memesare.fun)`)
	  .setFooter(`discord.gg/fRGSmns`)
    member.send(embed);
})

client.on('message', async(message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return;
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const time = timestamps.get(message.author.id) + cooldownAmount;

		if (now < time) {
			const timeLeft = (time - now) / 1000;
			return message.reply(`Pockaj ${timeLeft.toFixed(1)} pred pouzitim prikazu \`${command.name}\`.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	}catch{
		console.log('error');
	}
});

client.login(token);
