const minecraft = require("minecraft-protocol");
const moment = require("moment");
const fs = require("fs");
const config = require("./config.json");

const states = minecraft.states;

const server = minecraft.createServer({
    "online-mode": false,
    "motd": `minecraft-packet-debugger\nServer: ${config.host}:${config.port}`,    
    'maxPlayers': 10,
    "port": config.proxy_port,
    "keepAlive": false,
    "version": config.version
});

minecraft.ping({ host: "localhost", port: config.local_port }, (err, data) => {
    if(!data){
        console.log(`[ERR] First start the local Minecraft server on port ${config.local_port}`);
        process.exit()
    }else{
        console.log(`[INFO] Connect to localhost:${config.proxy_port} to catch packets`);
        console.log(`[INFO] Target server: ${config.host}:${config.port}, version: ${config.version}`);
    }
});

// Log file
var log_name = `${config.host} ${getDate()}`

fs.writeFileSync(`./logs/${log_name}.txt`, `===================================\nHost: ${config.host}:${config.port}\nVersion: ${config.version}\nDate: ${getDate()}\n===================================\n`)

var endedClient = false
var endedTargetClient = false

server.on('login', function (client) {
    fs.appendFileSync(`./logs/${log_name}.txt`, `${getTime()} New connection from ${client.socket.remoteAddress}\n`);
    console.log(`${getTime()} New connection from ${client.socket.remoteAddress}`);
    const targetClient = minecraft.createClient({
        host: config.host,
        port: config.port,
        username: client.username,
        keepAlive: false,
        version: config.version
    });
    // Catching packets that the player sent to the server
    client.on('packet', function (data, meta){
        if(config.hidden_packets.includes(meta.name)){
            return;
        }else{
            if(targetClient.state === states.PLAY && meta.state === states.PLAY){
                fs.appendFileSync(`./logs/${log_name}.txt`, `${getTime()} CLIENT -> SERVER: ${client.state}.${meta.name} ${JSON.stringify(data)}\n`);
                console.log(`${getTime()} CLIENT -> SERVER: ${client.state}.${meta.name} ${JSON.stringify(data)}\n`)
            }
            if(!endedTargetClient){
                targetClient.write(meta.name, data);
            }
        }
    });
    // Catching packets that the server sent to the player
    targetClient.on('packet', function (data, meta){
        if(config.hidden_packets.includes(meta.name)){
            return;
        }else{
        if(meta.state === states.PLAY && client.state === states.PLAY){
            fs.appendFileSync(`./logs/${log_name}.txt`, `${getTime()} CLIENT <- SERVER: ${targetClient.state}.${meta.name} ${JSON.stringify(data)}\n`);
            console.log(`${getTime()} CLIENT <- SERVER: ${targetClient.state}.${meta.name} ${JSON.stringify(data)}\n`)
        }
        if(!endedClient){
            client.write(meta.name, data);
            if(meta.name === 'set_compression'){
                client.compressionThreshold = data.threshold
            }
        }
    }
    });

    // Closing target client by client
    client.on('end', function () {
        endedTargetClient = true
        fs.appendFileSync(`./logs/${log_name}.txt`, `${getTime()} Connection closed by client from ${client.socket.remoteAddress}\n`);
        console.log(`${getTime()} Connection closed by client from ${client.socket.remoteAddress}`);
        targetClient.end(`${getTime()} Connection closed by client from ${client.socket.remoteAddress}`);
    });
    client.on('error', function (err) {
        endedTargetClient = true
        fs.appendFileSync(`./logs/${log_name}.txt`, `${getTime()} Connection closed by client error from ${client.socket.remoteAddress}\n`);
        console.log(`${getTime()} Connection closed by client error from ${client.socket.remoteAddress}`);
        console.log(err.stack)
        targetClient.end(`${getTime()} Connection closed by client error from ${client.socket.remoteAddress}`);
    });
    
    // Closing target client by server
    targetClient.on('end', function () {
        endedClient = true
        fs.appendFileSync(`./logs/${log_name}.txt`, `${getTime()} Connection closed by server from ${client.socket.remoteAddress}\n`);
        console.log(`${getTime()} Connection closed by server from ${client.socket.remoteAddress}\n`);
        client.end(`${getTime()} Connection closed by server from ${client.socket.remoteAddress}`);
    });
    targetClient.on('error', function (err) {
        endedClient = true
        fs.appendFileSync(`./logs/${log_name}.txt`, `${getTime()} Connection closed by server error from ${client.socket.remoteAddress}\n`);
        console.log(`${getTime()} Connection closed by server error from ${client.socket.remoteAddress}`);
        console.log(err.stack)
        client.end(`${getTime()} Connection closed by server error from ${client.socket.remoteAddress}`);
    });
});


function getTime(){
    let timestamp = new Date();
    let time = `[${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}:${timestamp.getMilliseconds()}]`;
    return time;
}

function getDate(){
    let date = moment(new Date()).format("DD.MM.YYYY H-mm-ss");
    return date;
}
