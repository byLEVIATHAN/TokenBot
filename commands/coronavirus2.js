const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

   if (!args[0]) return message.channel.send(`Invalid arguments. Please refer to \`${this.client.commands.get(this.name).usage}\` for how to use this command.`)
        if (this.client.utils.capitalise(args[0]) === 'Country') {
            const country = args.slice(1).join(' ')
            if (!args[1]) return message.reply('Invalid arguments. Which country are you fetching statistics for?')
            const stats = await fetch(`https://disease.sh/v3/covid-19/countries/${encodeURIComponent(country)}`).then(response => response.json())
            if (stats.message === 'Country not found or doesn\'t have any cases') return message.reply('that country either doesn\'t exist, or has no cases.')
            const embed = new Discord.MessageEmbed()
                .setTitle(`Statistics for ${this.client.utils.capitalise(country)}`)
                .setThumbnail(stats.countryInfo.flag)
                .addField('Total cases', stats.cases.toLocaleString(), true)
                .addField('New cases', stats.todayCases.toLocaleString(), true)
                .addField('Total deaths', stats.deaths.toLocaleString(), true)
                .addField('New deaths', stats.todayDeaths.toLocaleString(), true)
                .addField('Recovered', stats.recovered.toLocaleString(), true)
                .addField('Critical condition', stats.critical.toLocaleString(), true)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
            message.channel.send(embed)
        } else if (this.client.utils.capitalise(args[0]) === 'Continent') {
            let continent = args.slice(1).join(' ')
            if (!args[1]) return message.reply('Invalid arguments. Which continent are you fetching statistics for?')
            if (this.client.utils.capitalise(args[1]) === 'North' && this.client.utils.capitalise(args[2]) === 'America') continent = 'North America'
            if (this.client.utils.capitalise(args[1]) === 'South' && this.client.utils.capitalise(args[2]) === 'America') continent = 'South America'
            if (this.client.utils.capitalise(args[1]) === ('Australia' || 'Oceania')) continent = 'Australia/Oceania'

            const stats = await fetch(`https://disease.sh/v3/covid-19/continents/${encodeURIComponent(continent)}`).then(response => response.json())
            if (stats.message === 'Continent not found or doesn\'t have any cases') return message.reply('that continent either doesn\'t exist, or has no cases.')
            const embed = new Discord.MessageEmbed()
                .setTitle(`Statistics for ${this.client.utils.capitalise(continent)}`)
                .setColor('RANDOM')
                .setThumbnail('https://i2x.ai/wp-content/uploads/2018/01/flag-global.jpg')
                .addField('Total cases', stats.cases.toLocaleString(), true)
                .addField('New cases', stats.todayCases.toLocaleString(), true)
                .addField('Total deaths', stats.deaths.toLocaleString(), true)
                .addField('New deaths', stats.todayDeaths.toLocaleString(), true)
                .addField('Active cases', stats.active.toLocaleString(), true)
                .addField('Recovered', stats.recovered.toLocaleString(), true)
                .addField('Critical condition', stats.critical.toLocaleString(), true)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
            message.channel.send(embed)
        } else {
            const stats = await fetch('https://disease.sh/v3/covid-19/all').then(response => response.json())
            const embed = new Discord.MessageEmbed()
                .setTitle('Statistics for all countries')
                .setColor('RANDOM')
                .addField('Total cases', stats.cases.toLocaleString(), true)
                .addField('New cases', stats.todayCases.toLocaleString(), true)
                .addField('Total deaths', stats.deaths.toLocaleString(), true)
                .addField('New deaths', stats.todayDeaths.toLocaleString(), true)
                .addField('Recovered', stats.recovered.toLocaleString(), true)
                .addField('Cases per million', stats.casesPerOneMillion.toLocaleString(), true)
                .addField('Deaths per million', stats.deathsPerOneMillion.toLocaleString(), true)
                .addField('Affected countries', stats.affectedCountries.toLocaleString(), true)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
            message.channel.send(embed)
        }

}

module.exports.help = {

    name: "coronavirus2"

}