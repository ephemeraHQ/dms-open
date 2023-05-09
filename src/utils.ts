import fs from 'fs'
import { Wallet } from 'ethers'

export const WALLET_FILE_LOCATION = '../xmtp_wallet_player_one'
export const REPLY_WALLET_FILE_LOCATION = '../xmtp_wallet_player_two'

export const saveRandomWallet = () => {
  const newWallet = Wallet.createRandom()
  const replyWallet = Wallet.createRandom()

  fs.writeFileSync(WALLET_FILE_LOCATION, newWallet.mnemonic.phrase)
  fs.writeFileSync(REPLY_WALLET_FILE_LOCATION, replyWallet.mnemonic.phrase)

  console.log('Player one', newWallet.address)
  console.log('Player two', replyWallet.address)

  // const newWallet = Wallet.createRandom()
  // writeFileSync(WALLET_FILE_LOCATION, newWallet.mnemonic.phrase)
  // writeFileSync(REPLY_WALLET_FILE_LOCATION, newWallet.mnemonic.phrase)
}

export const loadWallet = () => {
  try {
    const existing = fs.readFileSync(WALLET_FILE_LOCATION)
    return Wallet.fromMnemonic(existing.toString())
  } catch (e) {
    throw new Error('No wallet file found')
  }
}

export const loadReplyWallet = () => {
  try {
    const existing = fs.readFileSync(REPLY_WALLET_FILE_LOCATION)
    // console.log(existing.toString())
    return Wallet.fromMnemonic(existing.toString())
  } catch (e) {
    throw new Error('No wallet file found')
  }
}

const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/

export const truncateEthAddress = (address: string) => {
  const match = address.match(truncateRegex)
  if (!match) return address
  return `${match[1]}…${match[2]}`
}
