const fs = require('fs')
const path = './database/settings.json'

async function handleAutoViewStatus(sock, msg) {
  const text = msg.message.conversation
  const data = JSON.parse(fs.readFileSync(path))

  if (text.endsWith('off')) {
    data.autoviewstatus = false
    fs.writeFileSync(path, JSON.stringify(data))
    return sock.sendMessage(msg.key.remoteJid, { text: '❌ Auto view status OFF' })
  }

  data.autoviewstatus = true
  fs.writeFileSync(path, JSON.stringify(data))
  await sock.sendMessage(msg.key.remoteJid, { text: '✅ Auto view status ON' })
}

module.exports = { handleAutoViewStatus }
