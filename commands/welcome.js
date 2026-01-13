const groups = require('../database/groups.json')

async function handleWelcomeEvent(sock, data) {
  if (!groups[data.id]?.welcome) return

  for (const user of data.participants) {
    await sock.sendMessage(data.id, {
      text: `👋 Welcome @${user.split('@')[0]}`,
      mentions: [user]
    })
  }
}

module.exports = { handleWelcomeEvent }
