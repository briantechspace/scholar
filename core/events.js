const { handleMenu } = require('../commands/menu')
const { handleVV } = require('../commands/vv')
const { handleSettings } = require('../commands/settings')
const { handleWelcomeEvent } = require('../commands/welcome')
const { handleAutoViewStatus } = require('../commands/autoviewstatus')

function registerEvents(sock) {

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message || msg.key.fromMe) return

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      ''

    if (text.startsWith('.menu')) return handleMenu(sock, msg)
    if (text === '.vv') return handleVV(sock, msg)
    if (text.startsWith('.setownername')) return handleSettings(sock, msg)
    if (text.startsWith('.autoviewstatus')) return handleAutoViewStatus(sock, msg)
  })

  sock.ev.on('group-participants.update', async data => {
    await handleWelcomeEvent(sock, data)
  })
}

module.exports = { registerEvents }
