const discord = require("discord.js");

const fetch = require("node-fetch");

module.exports.run = async(bot, message, args) => {

    let query = args.join(" ");
    if (!query) return message.channel.send("Please insert song title to search for the lyrics.");
    fetch(`https://some-random-api.ml/lyrics?title=${encodeURIComponent(query)}`)
.then(res => res.json())
.then(lyrics => {
  if (lyrics.error) return message.reply("No lyrics found");
  return message.channel.send(lyrics.lyrics)
})

}

module.exports.help = {

    name: "lyrics"

}