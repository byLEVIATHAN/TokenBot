const discord = require("discord.js");
const axios = require('axios'); 

module.exports.run = async(bot, message, args) => {

   // Reply to !news
  if (message.content.startsWith('!!news')) {
    try {
      const { data } = await axios.get(
        `https://newsapi.org/v2/everything?q=crypto&apiKey=${process.env.NEWS_API_KEY}&pageSize=1&sortBy=publishedAt`
      );

      // Destructure useful data from response
      const {
        title,
        source: { name },
        description,
        url,
      } = data.articles[0];

      return message.reply(
        `Latest news related to crypto:\n
        Title: ${title}\n
        Description:${description}\n
        Source: ${name}\n
        Link to full article: ${url}`
      );
    } catch (err) {
      return message.reply('There was an error. Please try again later.');
    }
  }


}

module.exports.help = {

    name: "news"

}