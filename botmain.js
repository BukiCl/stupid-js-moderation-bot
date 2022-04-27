const Discord = require('discord.js')
const { token, prefix } = require('./config.json')
const client = new Discord.Client()


client.on('ready', () => {
    console.log(`LOGGED IN AS ${client.user.tag.toUpperCase()}`);
})
client.on('message', async msg => {
    if(msg.author.bot) return;
    if(!msg.content.startsWith(prefix)) return;
    if (msg.content.startsWith(prefix)) {
        const [CMD_NAME, ...arg] = msg.content
            .trim()
            .substring(prefix.length)
            .split(/\s+/);
        if (CMD_NAME === 'kick') {
            if (!msg.member.hasPermission('KICK_MEMBERS'))
                await msg.reply(`You don't have permissions!`);
            else if (!msg.mentions.members.first())
                await msg.reply('You need to mention somebody idiot!');
            else {
                let bootedUser = msg.mentions.members.first();
                try {
                    await bootedUser.send('You have been booted!');
                } catch (e) {
                    await msg.channel.send("Couldn't send!");
                }
                if (bootedUser) {
                    try {
                        await bootedUser.kick();
                    } catch (e) {
                        await msg.channel.send(`I have no perms!`);
                    }
                    await msg.channel.send(`${bootedUser} was booted`);
                } else {
                    await msg.channel.send(`Member doesn't exist`);
                }
            }
        }
        if (CMD_NAME === 'ban') {
            if (!msg.member.hasPermission('BAN_MEMBERS'))
                await msg.reply(`You don't have perms`);
            if (!msg.mentions.users.first())
                await msg.reply('You need to mention somebody idiot!');
            else {
                let member = msg.mentions.members.first();
                if (member) {
                    delete arg[0];
                    let res = arg.join(' ');
                    try {
                        await member.ban({ 'reason': res });
                        await msg.channel.send(`${member} was booted for ${res}`);
                    } catch (e) {
                        await msg.channel.send('I have no perms!');
                    }
                }
                else {
                    await msg.channel.send(`${member} doesn't exist`);
                }
            }
        }
        if (CMD_NAME === 'avatar') {
            if (msg.author.bot) return;
            if (!msg.mentions.users.first()) return msg.channel.send(msg.author.avatarURL());
            else {
                let userAvatar = msg.mentions.users.first();
                await msg.channel.send(userAvatar.avatarURL());
            }
        }
        if (CMD_NAME === 'test') {
            return;
        }
    }
})

client.login(token).then()
