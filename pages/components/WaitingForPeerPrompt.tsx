import { useContext } from "react";
import ThemesContext from "../../src/contexts/ThemesContext"
import { truncateEthAddress } from "../../src/utils";

interface WaitingForPeerPromptInterface {
    peerAddress: string | undefined;
}
const WaitingForPeerPrompt = (props: WaitingForPeerPromptInterface) => {

    const { peerAddress } = props;
    const { selectedTheme } = useContext(ThemesContext);

    return (
            <>
                <div className="text-center font-bold" style={{
                    color: selectedTheme.systemMessageColor
                }}>
                    {
                        peerAddress
                            ? truncateEthAddress(peerAddress) + " has connected!"
                            : 'Waiting for your peer to connect...'
                    }
                </div>
                <div className="text-center mt-2" style={{
                    color: selectedTheme.systemMessageColor
                }}>
                    {
                        peerAddress
                            ? 'You can now start messaging!'
                            : 'Copy and share the invite link above'
                    }
                </div>
            </>
    )
}

export default WaitingForPeerPrompt;
