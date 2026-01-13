const fs = require('fs')
const path = './database/settings.json'

async function handleSettings(sock, msg) {
  const text = msg.message.conversation
  const name = text.split(' ').slice(1).join(' ')
  if (!name) return

  const data = JSON.parse(fs.readFileSync(path))
  data.ownerName = name
  fs.writeFileSync(path, JSON.stringify(data, null, 2))

  await sock.sendMessage(msg.key.remoteJid, {
    text: `✅ Owner name set to *${name}*`
  })
}

module.exports = { handleSettings }
