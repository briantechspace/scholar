const {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys')

const P = require('pino')
const { handlePairing } = require('./pairing')
const { registerEvents } = require('./events')

async function connectBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./session')
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    auth: state,
    logger: P({ level: 'silent' }),
    printQRInTerminal: false
  })

  if (!state.creds.registered) {
    await handlePairing(sock)
  }

  sock.ev.on('creds.update', saveCreds)

  registerEvents(sock)
}

module.exports = { connectBot }
