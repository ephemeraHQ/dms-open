import { useContext } from "react"
import ThemesContext from "../../src/contexts/ThemesContext"
import { truncateEthAddress } from "../../src/utils";

interface MessageInterface {
    senderAddress: string;
    isPeerMessage: boolean;
    message: string;
    isFirstMessage: boolean;
}

const Message = (props: MessageInterface) => {

  const { senderAddress, isPeerMessage, message, isFirstMessage } = props;

  const { selectedTheme } = useContext(ThemesContext);

  const messageStyle = () => {
    switch (selectedTheme.id) {
      case 1:
          return {
            backgroundColor: isPeerMessage ? '#E5E7EB' : '#553CEE',
            color: isPeerMessage ? 'black' : 'white',
            padding: '12px 20px',
            borderRadius: '16px',
            borderBottomLeftRadius: isPeerMessage ? '0' : '16px',
            borderBottomRightRadius: isPeerMessage ? '16px' : '0px',
            senderColorStyle: isPeerMessage ? 'black' : '#553CEE'
          }

      case 2:
          return {
            senderColorStyle: isPeerMessage ? '#0000FF' : '#FF0000',
            color: 'black',
            fontFamily: "Times New Roman, Times, serif"
          }

      case 3:
          return {
            backgroundColor: isPeerMessage ? '#CD0BDE' : '#00E0FF',
            color: isPeerMessage ? 'white' : '#352554',
            padding: '12px 20px',
            borderRadius: '16px',
            borderBottomLeftRadius: '0',
            senderColorStyle: isPeerMessage ? '#CD0BDE' : '#00E0FF'
          }

      case 4:
          return {
            senderColorStyle: isPeerMessage ? '#A3C7D6' : '#FF95FB',
            color: 'white'
          }

      case 5:
          return {
            backgroundColor: isPeerMessage ? '#374151' : '#553CEE',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '16px',
            borderBottomLeftRadius: isPeerMessage ? '0' : '16px',
            borderBottomRightRadius: isPeerMessage ? '16px' : '0px',
            senderColorStyle: isPeerMessage ? 'white' : '#553CEE'
          }

      default: // Same as case 1
        return {
            backgroundColor: isPeerMessage ? '#E5E7EB' : '#553CEE',
            color: isPeerMessage ? 'black' : 'white',
            padding: '12px 20px',
            borderRadius: '16px',
            borderBottomLeftRadius: isPeerMessage ? '0' : '16px',
            borderBottomRightRadius: isPeerMessage ? '16px' : '0px',
            senderColorStyle: isPeerMessage ? 'black' : '#553CEE'
        }
    }
  }

  const isInlineMessageStyle = () => selectedTheme.id === 2 || selectedTheme.id === 4

  return (
    <div>
      {
        isInlineMessageStyle() ? (
          <div className="flex flex-row mt-2">
            <div className="font-bold mr-1" style={{
              color: messageStyle().senderColorStyle,
              fontFamily: messageStyle().fontFamily
            }}>
              { isPeerMessage ? truncateEthAddress(senderAddress) : 'You'}:
            </div>

            <div style={{
              color: messageStyle().color,
              fontFamily: messageStyle().fontFamily
            }}>
              { message }
            </div>
          </div>
        ) : (
          <div className={`flex flex-row justify-${isPeerMessage ? 'start' : 'end'}`}>
            <div className='flex flex-col'>

              <div className={`flex font-semibold ${isPeerMessage ? 'justify-start ml-4' : 'justify-end mr-4'}`} style={{
                color: messageStyle().senderColorStyle
              }}>
                { isFirstMessage && (isPeerMessage ? truncateEthAddress(senderAddress) : 'You') }
              </div>

              <div className='flex items-start mt-3'>
                <div className="inline" style={messageStyle()}>
                    { message }
                </div>
              </div>

            </div>
          </div>
        )
      }
    </div>
  )
}

export default Message;
