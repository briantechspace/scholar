async function handleVV(sock, msg) {
  const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage
  if (!quoted?.viewOnceMessage) return

  const media = quoted.viewOnceMessage.message
  await sock.sendMessage(msg.key.remoteJid, media)
}

module.exports = { handleVV }
