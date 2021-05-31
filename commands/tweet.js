const discord = require("discord.js");
const fetch = require('node-fetch');

module.exports.run = async(bot, message, args) => {

   fetch(`https://nekobot.xyz/api/imagegen?type=tweet&username=${message.author.username}&text=${args.join(' ')}`)
        .then((res) => res.json())
        .then((data) => {
            let embed = new discord.RichEmbed()
            .setTitle("Tweet!")
            .setImage(data.message)
            .setTimestamp()
            message.channel.send(embed)
        })
    }


module.exports.help = {

    name: "tweet"

}