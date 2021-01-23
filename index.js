const express = require('express');
const app = express();
const Discord = require('discord.js');
const { reset } = require('nodemon');
const client = new Discord.Client();
require('dotenv').config();

const oldchannelid = 'OLD__CHANNELID';
const newchannelid = 'NEW__CHANNELID';
const port = process.env.PORT || 4000;

client.on('ready', () => {
    console.log("Bot is ready!");
});

client.on('message', msg => {
    if (msg.content.startsWith('/mute')) {
        const target = msg.mentions.users.first();
        if(target) {
            muteOnly(msg, target);
        } else {
            mute(msg);
        }
    }
    else if (msg.content.startsWith('/unmute')) {
        const target = msg.mentions.users.first();
        if(target) {
            unmuteOnly(msg, target);
        } else {
            unmute(msg);
        }
    } 
    else if (msg.content.startsWith('/move')) {
        const taggedUser = msg.mentions.users.array();
        if(taggedUser.length>0) {
            move(msg, taggedUser);
        } else {
            msg.reply("Sorry. There is no one mentioned!")
        }
    }
    else if (msg.content === '/reset') {
        resetUsers(msg);
    }
    else if (msg.content === '/start') {
        msg.reply("CREEPER is starting..🤖")
    }
});


async function mute(msg) {
    if(msg.member.id === 'MEMBER__ID') {
        const channel = msg.guild.channels.cache.get(oldchannelid);
        await channel.members.map(m => m.voice.setMute(true));
        msg.reply('All members are muted.');
    } else {
        msg.reply("You don't have permission to do this things! 🤣")
    }
}


async function unmute(msg) {
    if(msg.member.id === 'MEMBER__ID') {
        const channel = msg.guild.channels.cache.get(oldchannelid);
        await channel.members.map(m => m.voice.setMute(false));
        msg.reply('All members are unmuted.');
    } else {
        msg.reply("You don't have permission to do this things! 🤣")
    }
}


async function move(msg, taggedUser) {
    if(msg.member.id === 'MEMBER__ID') {
        taggedUser.map( async e => {
            const member = msg.guild.members.cache.get(e.id);
            await member.voice.setChannel(newchannelid);
            await member.voice.setMute(false);
        });
        await msg.reply('Dead Bodies are moved.');
    } else {
        msg.reply("You don't have permission to do this things! 🤣")
    }
}

async function resetUsers(msg) {
    if(msg.member.id === 'MEMBER__ID') {
        const channel = msg.guild.channels.cache.get(newchannelid);
        await channel.members.map(m => m.voice.setChannel(oldchannelid));
        msg.reply('Revived.');
    } else {
        msg.reply("You don't have permission to do this things! 🤣")
    }
}


client.login(process.env.TOKEN);
app.listen(port, () => console.log('Server is Running'));
