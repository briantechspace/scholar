const { menuText } = require('../config/menu')
const { menuButtons } = require('../config/buttons')
const settings = require('../database/settings.json')

async function handleMenu(sock, msg) {
  const owner = settings.ownerName || 'Brian'

  await sock.sendMessage(msg.key.remoteJid, {
    text: menuText(owner),
    buttons: menuButtons,
    footer: 'Scholar Bot',
    headerType: 1
  })
}

module.exports = { handleMenu }
