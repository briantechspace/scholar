const delay = ms => new Promise(res => setTimeout(res, ms))

async function startPairingFlow(sock) {
  const number = process.env.PAIRING_NUMBER

  if (!number) {
    console.log('❌ PAIRING_NUMBER not set in .env')
    return
  }

  console.log('🔐 Pairing mode starting...')

  let attempts = 0

  while (attempts < 5) {
    try {
      attempts++
      console.log(`📲 Requesting pairing code for ${number} (attempt ${attempts})...`)

      // small delay to allow socket handshake
      await delay(2500)

      const code = await sock.requestPairingCode(number)

      console.log(`\n🔑 PAIRING CODE: ${code}\n`)
      console.log('➡️ WhatsApp → Linked Devices → Link with phone number')
      return
    } catch (err) {
      console.log(`⚠️ Pairing attempt ${attempts} failed: ${err?.message || err}`)
      await delay(4000)
    }
  }

  console.log('❌ Failed to get pairing code after multiple attempts')
}

module.exports = { startPairingFlow }
