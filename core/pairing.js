const readline = require('readline')

async function handlePairing(sock) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question('Enter phone number (with country code): ', async number => {
    number = number.replace(/\D/g, '')
    const code = await sock.requestPairingCode(number)
    console.log(`\nPAIRING CODE: ${code}\n`)
    rl.close()
  })
}

module.exports = { handlePairing }
