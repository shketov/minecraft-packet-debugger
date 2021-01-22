<h1 align="center">
  <a href="https://github.com/shketov/minecraft-packet-debugger"><img src="https://assets.tiltify.com/uploads/event/thumbnail/9782/Baconater_1000.png"></a>
  <br>
  minecraft-packet-debugger
  <br>
</h1>

<h4 align="center">Utility for catching Minecraft packets</h4>


## How to use?

  * Download latest [release](https://github.com/shketov/minecraft-packet-debugger/releases/)(click)
  * Extract archive
  * Install packages `npm install` 
  * Run local Minecraft server
  > Important! The version of the local server must match the version of the real server that you want to connect to
  * Run `node index`
  * Connect to `localhost`
  > Important! The standard port of the proxy server is `25566`, connect to it if you did not change it in `config.json`

## Settings

  In the `config.json` you have the ability to change some parameters:
  * `host` - IP of the server you want to connect to
  * `port` - server port (default `25565`)
  * `version` - server version
  * `proxy_port` - proxy server port to connect to (default `25566`, not recommended to change)
  * `local_server` - automatic raising of the local server (default `false`)
  > Important! Do not enable the automatic local server if you are trying to catch the packets of a real player. In 90% of cases, you will not be able to connect
  * `local_port` - `proxy` server port to connect to (default `25565`, not recommended to change)
  * `hidden_packets` - an array containing the names of packages that should not be displayed in the terminal and logs

## TODO:
  * ~~Ignoring the unnecessary packets~~
  * ~~New README.md~~
  * ~~Automatically turn on the local server~~
  * Upload logs on pastebin
  * Error handling if the proxy or local server port is already being listened on
