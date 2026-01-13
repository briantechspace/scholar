const fs = require('fs')

const settingsPath = './database/settings.json'
const groupsPath = './database/groups.json'

function ensureFile(path, defaultData) {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify(defaultData, null, 2))
  }
}

function readJSON(path, defaultData) {
  ensureFile(path, defaultData)
  return JSON.parse(fs.readFileSync(path))
}

function writeJSON(path, data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2))
}

async function handleSettings(sock, msg) {
  const text =
    msg.message.conversation ||
    msg.message.extendedTextMessage?.text ||
    ''

  const jid = msg.key.remoteJid

  /* ---------------- GLOBAL SETTINGS ---------------- */

  // .setownername Brian
  if (text.startsWith('.setownername')) {
    const name = text.split(' ').slice(1).join(' ')
    if (!name) {
      return sock.sendMessage(jid, {
        text: '❌ Usage: .setownername Brian'
      })
    }

    const settings = readJSON(settingsPath, {
      ownerName: 'Brian',
      autoviewstatus: false
    })

    settings.ownerName = name
    writeJSON(settingsPath, settings)

    return sock.sendMessage(jid, {
      text: `✅ Owner name updated to *${name}*`
    })
  }

  // .autoviewstatus on / off
  if (text.startsWith('.autoviewstatus')) {
    const settings = readJSON(settingsPath, {
      ownerName: 'Brian',
      autoviewstatus: false
    })

    if (text.endsWith('off')) {
      settings.autoviewstatus = false
      writeJSON(settingsPath, settings)
      return sock.sendMessage(jid, { text: '❌ Auto view status OFF' })
    }

    settings.autoviewstatus = true
    writeJSON(settingsPath, settings)
    return sock.sendMessage(jid, { text: '✅ Auto view status ON' })
  }

  /* ---------------- GROUP SETTINGS ---------------- */

  // .welcome  → enable welcome in group
  if (text === '.welcome') {
    if (!jid.endsWith('@g.us')) {
      return sock.sendMessage(jid, {
        text: '❌ This command can only be used in groups'
      })
    }

    const groups = readJSON(groupsPath, {})
    if (!groups[jid]) groups[jid] = {}

    groups[jid].welcome = true
    writeJSON(groupsPath, groups)

    return sock.sendMessage(jid, {
      text: '✅ Welcome messages enabled for this group'
    })
  }

  // .welcome off → disable welcome
  if (text === '.welcome off') {
    if (!jid.endsWith('@g.us')) {
      return sock.sendMessage(jid, {
        text: '❌ This command can only be used in groups'
      })
    }

    const groups = readJSON(groupsPath, {})
    if (!groups[jid]) groups[jid] = {}

    groups[jid].welcome = false
    writeJSON(groupsPath, groups)

    return sock.sendMessage(jid, {
      text: '❌ Welcome messages disabled for this group'
    })
  }
}

module.exports = { handleSettings }
