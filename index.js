const Discord = require("discord.js");
const ytdl = require("ytdl-core");

const Client = new Discord.Client;

const prefix = "!"


Client.on("ready",() => {
    console.log("bot on");
});

Client.on("message", message => {
    if(message.content.startsWith(prefix + "play")){
        if(message.member.voice.channel){
            message.member.voice.channel.join().then(connection =>{
                let args = message.content.split(" ");
                
                let dispatcher = connection.play(ytdl(args[1], { quality: "highestaudio" }), { volume: args[2]});

                dispatcher.on("finish", () => {
                    dispatcher.destroy();
                    connection.disconnect();
                });
                dispatcher.on("error", err => {
                    console.log("err dispatcher" + err);
                });
            }).catch(err => {
                message.reply("Erreur de connection :" + err);
            })
        }
        else {
            message.reply("Vous n'êtes pas connecté en vocal.");
        }
    }
    
    if(message.content.startsWith(prefix + "leave")){
        if(message.member.voice.channel){
            message.member.voice.channel.leave()
        }
        else {
            message.reply("Vous n'êtes pas connecté en vocal.");
        }
    }

    if(message.content.startsWith(prefix + "summon")){
        if(message.member.voice.channel){
            message.member.voice.channel.join()
        }
        else {
            message.reply("Vous n'êtes pas connecté en vocal.");
        }
    }
});


Client.login(process.env.TOKEN);