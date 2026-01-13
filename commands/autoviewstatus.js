const fs = require('fs')
const path = './database/settings.json'

module.exports = async (sock, msg) => {
  const text = msg.message.conversation || ''
  const data = JSON.parse(fs.readFileSync(path))

  if (text.endsWith('off')) {
    data.autoviewstatus = false
    fs.writeFileSync(path, JSON.stringify(data, null, 2))
    return sock.sendMessage(msg.key.remoteJid, { text: '❌ Auto view status OFF' })
  }

  data.autoviewstatus = true
  fs.writeFileSync(path, JSON.stringify(data, null, 2))
  await sock.sendMessage(msg.key.remoteJid, { text: '✅ Auto view status ON' })
}
