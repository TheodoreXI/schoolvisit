import { BadgeCheck, CheckCheck } from "lucide-react"

export default function MessageBubble({ message }) {
  const isMine = message.from === "me"

  return (
    <div className={isMine ? "message message--me" : "message message--them"}>
      <div className="message__bubble">
        <p className="message__text">{message.text}</p>

        {message.attachment && (
          <div className="message__attachment">
            <BadgeCheck size={16} />
            <span>{message.attachment}</span>
          </div>
        )}
      </div>

      <div className="message__meta">
        <span>{message.time}</span>
        {isMine && <CheckCheck size={13} className="message__read" />}
      </div>
    </div>
  )
}
