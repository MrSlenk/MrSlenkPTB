module.exports = {
    name: "reload",
    run: async (client, message, args) => {
        if (message.author.id !== '763440305126113361') {
            return message.channel.send(`You cannot use this command!`)
        }
        await message.channel.send(`Restarting bot...`)
        process.exit();
    }
}