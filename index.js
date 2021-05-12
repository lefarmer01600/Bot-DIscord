const Commando = require("discord.js-commando");
const ytdl = require("ytdl-core");
//const { getInfo } = require('ytdl-getinfo');
const yts = require("yt-search");


const Client = new Commando.Client;

var list = []
// var time = []
// var t = 0
// var interval = 1000;
// var expected = Date.now() + interval;
// function step() {
//     var dt = Date.now() - expected;
//     if (dt > interval) {
//     }a
//     time = [] 
//     t = t+1
//     time.push(t);
//     console.log(time[0]);
//     expected += interval;
//     setTimeout(step, Math.max(0, interval - dt));
// }

const prefix = "!"

Client.on("ready",() => {
    console.log("bot on");
});

Client.on("message", async message => {
    if(message.content.startsWith(prefix + "play")){
        if(message.member.voice.channel){
            let args = message.content.split(" ");
            if(args[1].startsWith("https://www.youtube.com/watch?v=")){
                message.member.voice.channel.join().then(connection =>{
                        if(args[2] == undefined){
                             args.push(5);
                        }
                        let dispatcher = connection.play(ytdl(args[1], { quality: "highestaudio",filter: "audioonly" }), { volume: args[2]/100});

                        list.push(args[1]);
                        message.channel.send(args[1])
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
  
                   
                }).catch(err => {
                    message.reply("Erreur de connection :" + err);
                });
            }else if(args[1] == undefined){
                message.reply("veuillez renseigner un lien ou une recherche de musique")
            }else{
                message.member.voice.channel.join().then(async connection =>{
                    
                    // getInfo(args.slice(1)).then(info => {
                    //     list.push(info.items[0].url);
                    //     console.log("test "+ info.items[0].url)
                    //   });
                    
                    let videos = await yts(args.slice(1).join(" "));
                    //if (!videos.length) return message.channel.send("Aucune musique trouvée");
                    const song = {
                        title: videos.videos[0].name,
                        url: videos.videos[0].url
                    };
                    list.push(song.url);

                    let dispatcher = connection.play(ytdl(song.url, { quality: "highestaudio",filter: "audioonly" }), { volume: 0.05});
                    //time = setTimeout(step, interval);
                    message.channel.send(song.url)
                    
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
    }
    if(message.content.startsWith(prefix + "leave")){
            message.member.voice.channel.leave()
    }
    if(message.content.startsWith(prefix + "help")){
        message.channel.send("Toutes les commandes si dessous:\nPermet de jouer une musique: !play 'le lien de votre musique' ou 'nom de votre musique' optionnel: 'volume de votre musique de 1 a 100'\nFait rejoindre le bot dans le channel où vous êtes: !summon ou !join\nFait quitter le bot: !leave\nDefinit le volume de la musique (fait recommencer la musique a 0): !volume 'chiffre de 1 a 100'\nInfo sur la musique entrain d'être joué: !info")
}

    if(message.content.startsWith(prefix + "summon" || prefix + "join")){
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
                let dispatcher = connection.play(ytdl(list[0], {quality: "highestaudio",filter: "audioonly"}), { volume: args[1]/100});
                
                message.channel.send("Volume mis à : "+args[1])
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
    }
    if(message.content.startsWith(prefix + "info")){
        if(message.member.voice.channel){
        
                //let args = message.content.split(" ");
                // getInfo(list[0]).then(info => {
                //     // info.items[0] should contain the output of youtube-dl --dump-json
                //message.reply("vous écoutez actuellement:\n" + list[0])
                //     })
                message.channel.send("vous écoutez actuellement:\n" + list[0])
        }
        //message.delete();
    }
    if(message.channel == 837216778269622322  && message.member != 837337747463209025 || message.channel == 842047334988382239 && message.member != 837337747463209025){
        message.delete()
    }
    });

Client.login(process.env.TOKEN);
//Client.login("Njk3NzY2MzQ5NzY1ODY5NTc5.Xo8DjQ.ggxdTcjsEPdoUkOzvybV3Zw_3fM");