const fs = require('fs')
const path = require('path')

const commandsPath = path.join(__dirname, '../commands')

function registerEvents(sock) {
  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
    if (!msg || !msg.message) return
    if (msg.key.fromMe) return

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      ''

    if (!text) return

    // read prefix from database
    const settings = JSON.parse(
      fs.readFileSync('./database/settings.json', 'utf-8')
    )
    const prefix = settings.prefix || '.'

    if (!text.startsWith(prefix)) return

    const args = text.slice(prefix.length).trim().split(/ +/)
    const commandName = args.shift().toLowerCase()

    const commandFile = path.join(commandsPath, `${commandName}.js`)

    if (!fs.existsSync(commandFile)) return

    try {
      const command = require(commandFile)
      await command(sock, msg, args)
      console.log(`✅ Command executed: ${commandName}`)
    } catch (err) {
      console.error(`❌ Error in command ${commandName}:`, err)
    }
  })
}

module.exports = { registerEvents }
