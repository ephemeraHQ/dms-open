import { useContext } from "react"
import ThemesContext from "../../src/contexts/ThemesContext"

interface SystemMessageInterface {
    message: string;
    isPeerMessage: boolean;
}

const SystemMessage = (props: SystemMessageInterface) => {
    const { message, isPeerMessage } = props;
    const { selectedTheme } = useContext(ThemesContext);

    return (
        <div className="text-center mt-4 opacity-70" style={{
            color: selectedTheme.systemMessageColor
        }}>
            { isPeerMessage ? message : 'You disconnected from the chat' }
        </div>
    )
}

export default SystemMessage;
