import { useState, useEffect } from "react"
import Image from "next/image"

import ThemesProvider from "../src/providers/ThemesProvider"
import RightSide from "./components/RightSide"

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';

import { ethers } from 'ethers';
import { Client, Conversation, Signer } from '@xmtp/xmtp-js';

import firebaseConfig from "../firebaseConfig"

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const DMsOpen = () => {
    const [mainAddress, setMainAddress] = useState<string | null>(null)
    const [peerAddress, setPeerAddress] = useState<string | null>(null)

    const [waitingForPeer, setWaitingForPeer] = useState<boolean>(false)
    const [signerOne, setSignerOne] = useState<Signer | null>(null)

    const [client, setClient] = useState<Client | null>(null)
    const [conversation, setConversation] = useState<Conversation | null>(null)

    const [documentId, setDocumentId] = useState<string | null>(null)

    const [isLoadingPeerChat, setIsLoadingPeerChat] = useState<boolean>(false)

    useEffect(() => {
        const fetchFromFirestore = async (doc_id: string) => {
            // todo: also make sure you're not joining your own chat
            const snapshot = await fetch('api/fetchChat', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    doc_id
                })
            })

            if (snapshot.status === 200) {
                const data = await snapshot.json()
                const { user_one_address, ...rest } = data
                setPeerAddress(user_one_address)

                const wallet = ethers.Wallet.createRandom()

                // update the Chat object in Firestore
                fetch('api/updateChat', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        doc_id,
                        user_two_address: wallet.address
                    })
                })

                setMainAddress(wallet.address)
                setSignerOne(wallet)
            }
        }

        const chatId = (new URLSearchParams(window.location.search)).get("chat_id");
        if (chatId) {
            setIsLoadingPeerChat(true)
            setMainAddress('Loading...')
            fetchFromFirestore(chatId);
        }
    }, [])

    async function createConvo(xmtp: Client, peer_address: string): Promise<void> {
        const convo = await xmtp.conversations.newConversation(peer_address)
        setWaitingForPeer(false)
        setPeerAddress(peer_address)
        setConversation(convo);
    }

    async function checkForAddressOnNetwork(xmtp: Client, peer_address: string, createConvo: (xmtp: Client, peer_address: string) => Promise<void>) {
        // check in 2s
        setTimeout(() => {
            Client.canMessage(peer_address, { env: 'dev'}).then((val) => {
                if (val) {
                    createConvo(xmtp, peer_address) // async?
                } else {
                    console.log(`${peer_address} still not on network`)
                }
            })
        }, 2000);
    }

      useEffect(() => { // todo: refactor to just user a `signer`
        const initXmtpClient = async () => {
            if (!signerOne || client || conversation) {
                // setIsLoading(false);
                return;
            }

            const xmtp: Client = await Client.create(signerOne, { env: 'dev'});
            setClient(xmtp);

            // setIsLoading(false);

            if (signerOne) {
                if (waitingForPeer) {
                    onSnapshot(doc(db as any,    'Chat', documentId as string), (doc) => {
                        const documentData: any = doc.data()
                        const user_two_address: string | null = documentData.user_two_address

                        if (user_two_address) {
                            const peer_address: string = documentData.user_two_address

                            // check if address is on network and create convo
                            checkForAddressOnNetwork(xmtp, peer_address, createConvo)
                        }
                    })

                } else {
                    const convo = await xmtp.conversations.newConversation(peerAddress!)
                    setConversation(convo);
                }

            } else {
                console.log('No signers when there should be...')
            }
        };

        initXmtpClient();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [signerOne, waitingForPeer, documentId]);


    // This starts a fresh chat
    const startChat = async () => {
        const newWallet = ethers.Wallet.createRandom()

        const res = await fetch('api/createChat', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_one_address: newWallet.address
            })
        })

        const json = await res.json()

        setDocumentId(json.document_id)
        setWaitingForPeer(true)
        setMainAddress(newWallet.address)
        setSignerOne(newWallet)
    }

    const disconnect = () => {
        setMainAddress(null)
    }

    const chatWithXMTP = () => {
        // tk
    }

    const connectDisconnectButton = (extras: string) => `color-white rounded-full px-8 py-4 ${extras}`
    const blackAndWhiteButton = (extras: string) => `border border-white border-solid color-white rounded-full px-6 py-2 pointer ${extras}`

    return (
        <div className="flex flex-row h-screen">
            {/* Left side */}
            <div className="bg-black text-white w-1/2 pt-24 pl-24">
                <Image src="/images/lockup-orange-white.svg" alt="XMTP DMs Open Logo" width={146} height={34} />

                <div className="flex items-center h-full">
                    <div className="flex flex-col items-start">
                        <h1 className="text-5xl font-extrabold -mt-36 -mb-1">Experience open</h1>
                        <h1 className="text-5xl font-extrabold pt-2">DMs in web3</h1>

                        <p className="text-base w-8/12 mt-6 mb-4">
                            Experiencing open direct messages using web3 can be a transformative experience for anyone who values privacy and security in their online communications.
                        </p>

                        {
                            mainAddress && (waitingForPeer || peerAddress) ? (
                                <button className={`${connectDisconnectButton('bg-dms-open-very-red')}`} onClick={disconnect}>
                                    <div className="flex flex-row">
                                        Disconnect sandbox
                                    </div>
                                </button>
                            ) : (
                                <button className={`${connectDisconnectButton('bg-dms-open-purple')}`} onClick={startChat}>
                                    <div className="flex flex-row">
                                        Start a sandbox
                                        <Image src='/images/x-markWhite.svg' alt='' width='24' height='24' className="ml-2" />
                                    </div>
                                </button>
                            )
                        }

                        <p className="mt-6 w-8/12 text-dms-open-gray font-semibold">
                            Note: Your sandbox wallet address is temporary and you'll lose access once you close the window.
                        </p>

                        <div>
                            <button className={`${blackAndWhiteButton('mt-10')}`}>Use your own wallet</button>
                            <button className={`${blackAndWhiteButton('ml-4')}`}>
                                <div className="flex flex-row">
                                    Create your own app
                                    <Image src='/images/GitHub-bw.svg' alt='' width='24' height='24' className="ml-2" />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ThemesProvider>
                <RightSide
                    mainAddress={mainAddress}
                    waitingForPeer={waitingForPeer}
                    peerAddress={peerAddress}
                    client={client}
                    conversation={conversation}
                    documentId={documentId}
                    startChat={startChat}
                    chatWithXMTP={chatWithXMTP}
                    disconnect={disconnect}
                    isLoadingPeerChat={isLoadingPeerChat}
                />
            </ThemesProvider>
        </div>
    )
};

export default DMsOpen;
