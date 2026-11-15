import { useEffect, useRef } from "react"
import { Phone, Search, EllipsisVertical } from "lucide-react"
import MessageBubble from "./MessageBubble"
import MessageInput from "./MessageInput"

export default function ChatWindow({ conversation, onSend }) {
  const streamRef = useRef(null)

  // scroll to the newest message whenever the chat or its messages change
  useEffect(() => {
    streamRef.current.scrollTop = streamRef.current.scrollHeight
  }, [conversation.id, conversation.messages.length])

  return (
    <section className="chat-window">
      <header className="chat-header">
        <div className="chat-header__person">
          <div className="avatar-wrap">
            <div className="avatar">{conversation.initials}</div>
            {conversation.online && <span className="avatar__dot" />}
          </div>
          <div>
            <h2 className="chat-header__name">{conversation.name}</h2>
            <p className="chat-header__status">
              <span className={conversation.online ? "status-dot" : "status-dot status-dot--off"} />
              {conversation.online ? "Active Now" : "Offline"}
            </p>
          </div>
        </div>

        <div className="chat-header__actions">
          <button className="icon-btn" aria-label="Call campus front desk">
            <Phone size={15} />
          </button>
          <button className="icon-btn" aria-label="Search conversation history">
            <Search size={15} />
          </button>
          <button className="icon-btn" aria-label="More options">
            <EllipsisVertical size={15} />
          </button>
        </div>
      </header>

      <div className="chat-stream" ref={streamRef}>
        <div className="date-pill-row">
          <span className="date-pill">Today, October 24</span>
        </div>

        {conversation.messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      <MessageInput
        placeholder={`Type your message to ${conversation.name}...`}
        onSend={onSend}
      />
    </section>
  )
}
