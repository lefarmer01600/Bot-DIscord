const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const { getInfo } = require('ytdl-getinfo');
//const yts = require("yts");


const Client = new Discord.Client;
var list = []
var time = []
var t = 0
var interval = 1000;
var expected = Date.now() + interval;
function step() {
    var dt = Date.now() - expected;
    if (dt > interval) {
    }
    time = [] 
    t = t+1
    time.push(t);
    console.log(time[0]);
    expected += interval;
    setTimeout(step, Math.max(0, interval - dt));
}

const prefix = "!"

Client.on("ready",() => {
    console.log("bot on");
});

Client.on("message", message => {
    if(message.content.startsWith(prefix + "play")){
        if(message.member.voice.channel){
            let args = message.content.split(" ");
            if(args[1].startsWith("https://www.youtube.com/watch?v=")){
                message.member.voice.channel.join().then(connection =>{

                    if (args[2] != undefined){
                        let dispatcher = connection.play(ytdl(args[1], { quality: "highestaudio",filter: "audioonly" }), { volume: args[2]/100});

                        list.push(args[1]);

                        // getInfo(list[0]).then(info => {
                        //     message.reply("vous écoutez actuellement:\n" + info.items[0].title)
                        //         })
    
                        // var timer = setTimeout(step, interval);
                        // function stoptimer() {
                        //     clearInterval(timer[0]);
                        // }
    
                        dispatcher.on("finish", () => {
                            dispatcher.destroy();
                            // connection.disconnect();
                        });
                        dispatcher.on("error", err => {
                            console.log("err dispatcher" + err);
                        });
                    }else{
                        let dispatcher = connection.play(ytdl(args[1], { quality: "highestaudio",filter: "audioonly" }), { volume: 0.5});
                    
                        list.push(args[1]);

                        // getInfo(list[0]).then(info => {
                        //     message.reply("vous écoutez actuellement:\n" + info.items[0].title)
                        //         })
    
                        // var timer = setTimeout(step, interval);
                        // function stoptimer() {
                        //     clearInterval(timer[0]);
                        // }
    
                        dispatcher.on("finish", () => {
                            dispatcher.destroy();
                            // connection.disconnect();
                        });
                        dispatcher.on("error", err => {
                            console.log("err dispatcher" + err);
                        });
                    
                    }
                    
                   
                }).catch(err => {
                    message.reply("Erreur de connection :" + err);
                })
            }else if(args[1] == undefined){
                message.reply("veuillez renseigner un lien ou une recherche de musique")
            }else{
                message.member.voice.channel.join().then(connection =>{
                    
                    getInfo(args.slice(1)).then(info => {
                        list.push(info.items[0].url);
                        console.log("test "+ info.items[0].url)
                      });

                    

                    let dispatcher = connection.play(ytdl(list[0], { quality: "highestaudio",filter: "audioonly" }), { volume: 0.5});
                    //time = setTimeout(step, interval);
                    
                    dispatcher.on("finish", () => {
                        dispatcher.destroy();
                        // connection.disconnect();
                    });
                    dispatcher.on("error", err => {
                        console.log("err dispatcher" + err);
                    });
                }).catch(err => {
                    message.reply("Erreur de connection :" + err);
                })
            }
        }
        else {
            message.reply("Vous n'êtes pas connecté en vocal.");
        }
        message.delete();
    }
    if(message.content.startsWith(prefix + "leave")){
            message.member.voice.channel.leave()
            message.delete();
    }

    if(message.content.startsWith(prefix + "summon" || prefix + "join")){
        if(message.member.voice.channel){
            message.member.voice.channel.join()
        }
        else {
            message.reply("Vous n'êtes pas connecté en vocal.");
        }
        message.delete();
    }    
    if(message.content.startsWith(prefix + "volume")){
        if(message.member.voice.channel){
            message.member.voice.channel.join().then(connection =>{
                let args = message.content.split(" ");
                let dispatcher = connection.play(ytdl(list[0], {quality: "highestaudio",filter: "audioonly"}), { volume: args[1]/100});
                message.reply("Volume mis à : "+args[1])
                //stoptimer()
                time = []
                dispatcher.on("finish", () => {
                    dispatcher.destroy();
                    // connection.disconnect();
                });
                dispatcher.on("error", err => {
                    console.log("err dispatcher" + err);
                });
            }).catch(err => {
                message.reply("Erreur de connection :" + err);
            })
        }
        message.delete();
    }
    if(message.content.startsWith(prefix + "info")){
        if(message.member.voice.channel){
            message.member.voice.channel.join().then(connection =>{
                let args = message.content.split(" ");
                // getInfo(list[0]).then(info => {
                //     // info.items[0] should contain the output of youtube-dl --dump-json
                //message.reply("vous écoutez actuellement:\n" + list[0])
                //     })
                message.reply("vous écoutez actuellement:\n" + list[0])
            }).catch(err => {
                message.reply("Erreur de connection :" + err);
            })
        }
        message.delete();
    }
    });


// Client.login(process.env.TOKEN);
Client.login("Njk3NzY2MzQ5NzY1ODY5NTc5.Xo8DjQ.ggxdTcjsEPdoUkOzvybV3Zw_3fM");