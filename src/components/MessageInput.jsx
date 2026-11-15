import { useState, useRef } from "react"
import { Paperclip, Smile, Send, Lock } from "lucide-react"

export default function MessageInput({ placeholder, onSend }) {
  const [text, setText] = useState("")
  const textareaRef = useRef(null)

  function submit() {
    const trimmed = text.trim()
    if (!trimmed) return

    onSend(trimmed)
    setText("")
    textareaRef.current.style.height = "auto"
  }

  function handleChange(e) {
    setText(e.target.value)
    // make the textarea grow while typing (max height is set in the CSS)
    e.target.style.height = "auto"
    e.target.style.height = e.target.scrollHeight + "px"
  }

  function handleKeyDown(e) {
    // Enter = send, Shift + Enter = new line
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <footer className="chat-footer">
      <div className="chat-input">
        <div className="chat-input__tools">
          {/* TODO: file upload and emoji picker */}
          <button type="button" className="icon-btn icon-btn--small" aria-label="Attach a file">
            <Paperclip size={16} />
          </button>
          <button type="button" className="icon-btn icon-btn--small" aria-label="Add an emoji">
            <Smile size={16} />
          </button>
        </div>

        <textarea
          ref={textareaRef}
          rows={1}
          value={text}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        <button className="send-btn" onClick={submit} aria-label="Send message">
          <Send size={16} />
        </button>
      </div>

      <div className="chat-footer__hints">
        <p>
          Press <kbd>Enter</kbd> to send, <kbd>Shift + Enter</kbd> for line break
        </p>
        <p className="chat-footer__secure">
          <Lock size={11} />
          Campus Encrypted Channel
        </p>
      </div>
    </footer>
  )
}
