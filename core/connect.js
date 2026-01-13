const {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys')

const P = require('pino')
const { startPairingFlow } = require('./pairing')
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

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', async update => {
    const { connection } = update

    if (connection === 'open') {
      console.log('✅ WhatsApp socket connected')

      // ONLY start pairing after socket is open
      if (!state.creds.registered) {
        await startPairingFlow(sock)
      }
    }
  })

  registerEvents(sock)
}

module.exports = { connectBot }
