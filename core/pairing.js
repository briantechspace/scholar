async function startPairingFlow(sock) {
  console.log('\n📲 Enter phone number with country code (e.g. 254768116434):')

  process.stdin.resume()
  process.stdin.setEncoding('utf8')

  process.stdin.once('data', async input => {
    try {
      const number = input.toString().trim().replace(/\D/g, '')

      if (!number) {
        console.log('❌ Invalid phone number')
        return
      }

      const code = await sock.requestPairingCode(number)
      console.log(`\n🔐 PAIRING CODE: ${code}\n`)
    } catch (err) {
      console.error('❌ Failed to generate pairing code:', err.message)
    }
  })
}

module.exports = { startPairingFlow }
