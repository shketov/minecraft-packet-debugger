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

  * Open `config.json`
  * In `host` and `port` insert the IP address and port of the server whose packets you want to catch
  * Select `version` (Version of the regular and local server must match. Supported versons: 1.7, 1.8, 1.9, 1.10, 1.11.2, 1.12.2, 1.13.2, 1.14.4, 1.15.2 and 1.16.4)
  * Change `proxy_port` and `local_port` if necessary

## Settings

  In the `config.json` you have the ability to change some parameters:
  * `host` - IP of the server you want to connect to
  * `port` - server port (usually `25565`)
  * `version` - server version
  * `proxy_port` - proxy server port to connect to (usually `25566`, not recommended to change)
  * `local_port` - `proxy` server port to connect to (usually `25565`, not recommended to change)
  * `hidden_packets` - an array containing the names of packages that should not be displayed in the terminal and logs

## TODO:
  * ~~Ignoring the unnecessary packets~~
  * ~~New README.md~~
  * Automatically turn on the local server using [flying-squid](https://github.com/PrismarineJS/flying-squid)

