import { useState, useContext } from "react"
import ThemesContext from "../../src/contexts/ThemesContext";
import Image from "next/image";
import { Conversation } from '@xmtp/xmtp-js'

interface TypingAreaInterface {
    conversation: Conversation | null;
    hasLeft: boolean;
}

const TypingArea = (props: TypingAreaInterface) => {
  const { conversation, hasLeft } = props
  const { selectedTheme } = useContext(ThemesContext);

  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    await send()
  }

  const send = async () => {
    if (!conversation) return
    if (hasLeft) return
    if (inputValue === '') return

    setInputValue('');
    await conversation.send(inputValue)
  }

  return (
      <div className="justify-end mr-4 mx-4 mt-2">
        <form onSubmit={handleSubmit} className="flex items-center" style={{
          borderTopLeftRadius: selectedTheme.borderTopLeftRadius,
          borderTopRightRadius: selectedTheme.borderTopRightRadius,
          borderBottomRightRadius: selectedTheme.borderBottomRightRadius,
          borderBottomLeftRadius: selectedTheme.borderBottomLeftRadius,
          border: (selectedTheme.id === 1 || selectedTheme.id === 5) ? '1px solid' : '',
          borderColor: selectedTheme.typingAreaInnerBorderColor
        }}>
          <div className="flex-grow">
            <input
              className='ml-4 pr-10 min-h-[40px] w-full focus:outline-none'
              placeholder='Enter your message'
              type="text"
              value={inputValue}
              disabled={!conversation}
              onChange={(e) => setInputValue(e.target.value)}
              style={{
                background: selectedTheme.typingAreaBackgroundColor,
                fontFamily: selectedTheme.id === 2 ? 'Times New Roman, Times, serif' : '',
                color: selectedTheme.inputTextColor
              }}
            />
          </div>

            <button className={`mr-2 my-2 rounded-full ${(!conversation || hasLeft) ? 'opacity-50' : 'pointer'}`} disabled={!conversation || hasLeft} style={{ color: 'white'}} onClick={send}>
              {
              selectedTheme.id === 2
                ? <Image src='/images/aolSend.png' width="30" height="34" alt={""} />
                : <Image src={selectedTheme.sendButtonFileName} width="30" height="30" alt={""} />
              }
            </button>
        </form>
      </div>
  )
}

export default TypingArea
