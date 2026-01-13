const {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys')

const P = require('pino')
const { startPairingFlow } = require('./pairing')
const { registerEvents } = require('./events')

async function connectBot() {
  console.log('🚀 Starting Scholar bot...')

  const { state, saveCreds } = await useMultiFileAuthState('./session')
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    auth: state,
    logger: P({ level: 'silent' }),
    printQRInTerminal: false
  })

  sock.ev.on('creds.update', saveCreds)

  if (!state.creds.registered) {
    startPairingFlow(sock)
  }

  sock.ev.on('connection.update', ({ connection }) => {
    if (connection === 'open') {
      console.log('✅ Scholar bot connected to WhatsApp')
    }
    if (connection === 'close') {
      console.log('⚠️ Connection closed, waiting...')
    }
  })

  registerEvents(sock)

  // 🔥 KEEP PROCESS ALIVE
  await new Promise(() => {})
}

module.exports = { connectBot }
