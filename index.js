const Discord = require("discord.js");
const ytdl = require("ytdl-core");

const Client = new Discord.Client;

const prefix = "!"

let dispatcher

Client.on("ready",() => {
    console.log("bot on");
});

Client.on("message", message => {
    if(message.content.startsWith(prefix + "play")){
        if(message.member.voice.channel){
            message.member.voice.channel.join().then(connection =>{
                let args = message.content.split(" ");
                
                let dispatcher1 = connection.play(ytdl(args[1], { quality: "highestaudio" }), { volume: args[2]/100});
                this.dispatcher = dispatcher1

                dispatcher1.on("finish", () => {
                    dispatcher1.destroy();
                    connection.disconnect();
                });
                dispatcher1.on("error", err => {
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
            message.member.voice.channel.leave()
    }

    if(message.content.startsWith(prefix + "summon")){
        if(message.member.voice.channel){
            message.member.voice.channel.join()
        }
        else {
            message.reply("Vous n'êtes pas connecté en vocal.");
        }
    }    
    if(message.content.startsWith(prefix + "volume")){
        if(message.member.voice.channel){
            message.member.voice.channel.join().then(connection =>{
                let args = message.content.split(" ");

                let time = dispatcher.time
                
                message.reply(time);
                // let dispatcher = connection.play(ytdl(args[1], { quality: "highestaudio" }), { volume: args[2]/100});

                // dispatcher.on("finish", () => {
                //     dispatcher.destroy();
                //     connection.disconnect();
                // });
                // dispatcher.on("error", err => {
                //     console.log("err dispatcher" + err);
                // });
            }).catch(err => {
                message.reply("Erreur de connection :" + err);
            })
        }
    }
});


Client.login(process.env.TOKEN);