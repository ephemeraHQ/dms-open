import { useState, useEffect, useContext, useRef } from "react"
import ThemesContext from "../../src/contexts/ThemesContext"
import Message from './Message'
import SystemMessage from "./SystemMessage"
import TypingArea from "./TypingArea"
import WaitingForPeerPrompt from "./WaitingForPeerPrompt"
import { Client, Conversation, Stream, DecodedMessage } from '@xmtp/xmtp-js'

interface ChatWindowInterface {
    documentId: string | null;
    mainAddress: string;
    waitingForPeer: boolean;
    client: Client | null;
    conversation: Conversation | null;
    linkToCopy: string;
    disconnect: () => void;
}

const ChatWindow = (props: ChatWindowInterface) => {
    const { mainAddress, client, conversation, linkToCopy, disconnect } = props;
    const { selectedTheme } = useContext(ThemesContext);

    const [copied, setCopied] = useState(false)
    const [messages, setMessages] = useState<any[]>([])
    const [hasLeft, setHasLeft] = useState(false)

    const messagesRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!client || !conversation) return

        let messageStream: Stream<DecodedMessage>;

        const closeStream = async () => {
            if (!messageStream) {
                return;
            }

            await messageStream.return();
        };

        const startMessageStream = async () => {
            closeStream();
            messageStream = await conversation.streamMessages();
            for await (const message of messageStream) {
                setMessages((messages: DecodedMessage[]) => [...messages, message])
            }
        };

        startMessageStream();

        return () => {
            closeStream();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [client, conversation]);

    useEffect(() => {
        scrollToBottom()
    }, [messages])

  // Reset the copy link button after 2 seconds
  useEffect(() => {
    if (copied) {
      setTimeout(() => { setCopied(false) }, 2000);
    }
  }, [copied])

  const scrollToBottom = () => {
    if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  const leaveChat = async () => {
    if (!conversation || !client || hasLeft) {
        disconnect()
        return
    }

    await conversation.send(`${mainAddress} has disconnected from the chat`)
    const stream = await conversation.streamMessages()
    await stream.return()

    disconnect()
    setHasLeft(true)
  }

  const copyInviteLink = () => {
    navigator.clipboard.writeText(linkToCopy);
    setCopied(true)
  }

  const isAOLTheme = () => selectedTheme.id === 2

  const fontFamily = () => isAOLTheme() ? "Times New Roman, Times, serif" : ''
  const marginLeft = () => isAOLTheme() ? '38px' : ''
  const textAlign  = () => isAOLTheme() ? 'left' : 'center'
  const width      = () => isAOLTheme() ? '' : '50%'

  return (
      <div className='w-full mr-4 shadow-xl' style={{
        borderTopLeftRadius: selectedTheme.borderTopLeftRadius,
        borderTopRightRadius: selectedTheme.borderTopRightRadius,
        borderBottomRightRadius: selectedTheme.borderBottomRightRadius,
        borderBottomLeftRadius: selectedTheme.borderBottomLeftRadius,
        borderWidth: selectedTheme.borderWidth,
        borderColor: selectedTheme.borderColor,
        backgroundColor: selectedTheme.typingAreaBackgroundColor,

      }}>
          {/* Top section of the chat */}
          <div className={`flex flex-col p-4`} style={{
            background: selectedTheme.headerBackground,
            color: selectedTheme.headerTextColor,
            borderTopLeftRadius: selectedTheme.borderTopLeftRadius,
            borderTopRightRadius: selectedTheme.borderTopRightRadius,
            borderBottom: selectedTheme.typingAreaBottomBorder,
            textAlign: textAlign(),
            fontFamily: fontFamily()
          }}>
              <p className="font-bold">Your sandbox address is</p>
              <p>{ mainAddress }</p>

              <div className="flex flex-row font-body mt-2 font-bold">
                  <button onClick={copyInviteLink} style={{
                    color: selectedTheme.copy,
                    width: width(),
                    textAlign: textAlign(),
                    fontFamily: fontFamily()
                  }}>
                    { copied ? 'Copied!' : 'Copy invite link' }
                  </button>

                  <button style={{
                    color: selectedTheme.disconnect,
                    width: width(),
                    marginLeft: marginLeft(),
                    textAlign: textAlign(),
                    fontFamily: fontFamily()
                  }} onClick={leaveChat}>Disconnect</button>
              </div>
          </div>

          {/* Main Chat Section */}
          <div style={{
            backgroundColor: selectedTheme.chatBackgroundColor
          }}>
            <div className="flex flex-col mx-4 p-4 h-[300px] overflow-y-scroll"
                ref={messagesRef}
                style={{
                    backgroundColor: selectedTheme.chatBackgroundColor
                }}
            >
                {
                    <>
                        <WaitingForPeerPrompt peerAddress={conversation?.peerAddress}/>
                        {
                            messages.map((message: DecodedMessage, i: number) => {
                                return message.content.includes('disconnected from the chat') ? (
                                    <SystemMessage
                                        message={message.content}
                                        isPeerMessage={message.senderAddress !== client?.address}
                                    />
                                ) : (
                                    <Message
                                        key={i}
                                        senderAddress={message.senderAddress}
                                        isPeerMessage={message.senderAddress !== client?.address}
                                        message={message.content}
                                        isFirstMessage={(i === 0 || messages[i - 1].senderAddress !== message.senderAddress)}
                                    />
                                )
                            })
                        }
                    </>
                }
            </div>
          </div>

          <div className="pb-4" style={{ borderTop: selectedTheme.typingAreaTopBorder }}>
            <TypingArea conversation={conversation} hasLeft={hasLeft} />
          </div>
  </div>
  )
}

export default ChatWindow;
