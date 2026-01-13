const { PREFIX } = require('../settings')

function registerEvents(sock) {
  sock.ev.on('messages.upsert', async ({ messages }) => {
    try {
      const msg = messages[0]
      if (!msg || !msg.message) return
      if (msg.key.fromMe) return

      const from = msg.key.remoteJid
      const text =
        msg.message.conversation ||
        msg.message.extendedTextMessage?.text ||
        ''

      if (!text.startsWith(PREFIX)) return

      const args = text.slice(PREFIX.length).trim().split(/ +/)
      const command = args.shift().toLowerCase()

      console.log(`📩 Command received: ${command} from ${from}`)

      // BASIC COMMAND TEST
      if (command === 'menu') {
        await sock.sendMessage(from, {
          text: '📜 Scholar menu is working ✅'
        })
      }
    } catch (err) {
      console.error('❌ Message handler error:', err)
    }
  })
}

module.exports = { registerEvents }
