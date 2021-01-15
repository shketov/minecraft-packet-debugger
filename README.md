<h1 align="center">
  <a href="https://github.com/shketov/minecraft-packet-debugger"><img src="https://assets.tiltify.com/uploads/event/thumbnail/9782/Baconater_1000.png"></a>
  <br>
  minecraft-packet-debugger
  <br>
</h1>

<h4 align="center">Utility for catching Minecraft packages</h4>


## How to use?

  * Download latest [release](https://github.com/shketov/minecraft-packet-debugger/releases/)(click)
  * Extract archive
  * Install packages `npm install` 
  * Run local Minecraft server
  * Run `node index`

## Settings

  * Open `config.json`
  * In `host` and `port` insert the IP address and port of the server whose packets you want to catch
  * Select `version` (Version of the regular and local server must match. Supported versons: 1.7, 1.8, 1.9, 1.10, 1.11.2, 1.12.2, 1.13.2, 1.14.4, 1.15.2 and 1.16.4)
  * Change `proxy_port` and `local_port` if necessary

## TODO:
  * Ignoring the unnecessary packets


