import { useContext } from "react";
import ThemesContext, { ThemeInterface } from "../../src/contexts/ThemesContext";
import ThemeDropdown from "./ThemeDropdown"
import ChatWindow from "./ChatWindow"
import Image from "next/image";
import baseURL from "../../src/baseURL";
import { Client, Conversation } from '@xmtp/xmtp-js';

interface RightSideInterface {
    mainAddress: string | null;
    waitingForPeer: boolean;
    peerAddress: string | null;
    client: Client | null;
    conversation: Conversation | null;
    documentId: string | null;
    isLoadingPeerChat: boolean;
    startChat: () => void;
    chatWithXMTP: () => void;
    disconnect: () => void;
}

const RightSide = (props: RightSideInterface) => {
    const {
        mainAddress,
        waitingForPeer,
        peerAddress,
        client,
        conversation,
        documentId,
        isLoadingPeerChat,
        startChat,
        chatWithXMTP,
        disconnect
    } = props;

    const context = useContext(ThemesContext);
    const selectedTheme = context?.selectedTheme ?? null;

    const buttonTheme = (extras: string | null) => `bg-white border-2 border-dms-open-purple-button-border border-solid text-dms-open-purple-text rounded-full px-6 py-2 h-14 pointer text-center ${extras}`

    const linkToCopy = new URL(`?chat_id=${documentId}`, baseURL).toString();

    // todo: use theme.backgroundThemeName which isn't working for some reason
    const getBackground = (theme: ThemeInterface) => {
        switch (theme.id) {
            case 1:
                return 'bg-grid-background';
            case 2:
                return 'bg-aolol-background';
            case 3:
                return 'bg-vaporwave-background';
            case 4:
                return 'bg-interstellar-background';
            case 5:
                return 'bg-dark-grid-background';
            default:
                return 'bg-grid-background'
        }
    }

    return (
        <div className={`w-1/2 ${getBackground(selectedTheme)} bg-no-repeat bg-center flex items-center justify-center`}>
            {
                mainAddress && (waitingForPeer || peerAddress || isLoadingPeerChat) ? (
                    <div className="w-10/12 mx-auto">
                        <ThemeDropdown />

                        <div className="flex flex-row mt-9">
                            <ChatWindow
                                documentId={documentId}
                                mainAddress={mainAddress}
                                waitingForPeer={waitingForPeer}
                                client={client}
                                conversation={conversation}
                                linkToCopy={linkToCopy}
                                disconnect={disconnect}
                            />
                        </div>
                </div>
                ) : (
                    <div className="flex flex-col w-8/12">
                        <button className={buttonTheme(null)} onClick={startChat}>
                            Start a new sandbox
                        </button>

                        <button className={buttonTheme('mt-5 opacity-60')} onClick={chatWithXMTP} disabled={true}>
                            <div className="flex flex-row items-center justify-center">
                                Chat with someone at XMTP
                                <Image src='/images/x-markRed.svg' alt='' width='24' height='24' className="ml-2" />
                            </div>
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default RightSide
