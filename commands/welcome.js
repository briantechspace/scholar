const fs = require('fs')
const path = './database/groups.json'

function getGroups() {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify({}))
  }
  return JSON.parse(fs.readFileSync(path))
}

async function handleWelcomeEvent(sock, data) {
  const groups = getGroups()
  if (!groups[data.id] || !groups[data.id].welcome) return

  for (const user of data.participants) {
    await sock.sendMessage(data.id, {
      text: `👋 Welcome @${user.split('@')[0]}`,
      mentions: [user]
    })
  }
}

module.exports = { handleWelcomeEvent }
