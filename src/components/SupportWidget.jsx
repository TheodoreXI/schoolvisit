import { useState, useRef, useEffect } from "react"
import { Headset, ArrowRight, X, Paperclip, Send, Lock } from "lucide-react"
import { getCurrentTime } from "../utils"
import { askAI } from "../chat"

const welcomeMessage = {
  id: 1,
  from: "staff",
  text: "Hello! Welcome to 1337 SchoolVisit. How can we assist you with your campus visit, parking, or guest passes today?",
  time: "Just now",
}

const quickQuestions = [
  { emoji: "🚗", label: "Parking details" },
  { emoji: "🎫", label: "Group passes" },
  { emoji: "♿", label: "Accessibility" },
]

export default function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [messages, setMessages] = useState([welcomeMessage])
  const [text, setText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const bodyRef = useRef(null)
  const [openedAt] = useState(getCurrentTime)

  // scroll to the newest message (depends on `messages` so it follows streaming text)
  useEffect(() => {
    if (isOpen) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [isOpen, messages])

  async function sendMessage(messageText) {
    const trimmed = messageText.trim()
    if (!trimmed || isLoading) return

    const visitorMessage = {
      id: crypto.randomUUID(),
      from: "visitor",
      text: trimmed,
      time: getCurrentTime(),
    }
    const staffId = crypto.randomUUID()

    const history = [...messages, visitorMessage]
      .filter((m) => m.id !== welcomeMessage.id)
      .map((m) => ({
        role: m.from === "visitor" ? "user" : "assistant",
        content: m.text,
      }))

    // add the visitor message and an empty staff bubble that will fill up
    setMessages((prev) => [
      ...prev,
      visitorMessage,
      { id: staffId, from: "staff", text: "", time: getCurrentTime() },
    ])
    setIsLoading(true)

    const updateStaff = (newText) =>
      setMessages((prev) =>
        prev.map((m) => (m.id === staffId ? { ...m, text: newText } : m))
      )

    try {
      await askAI(history, updateStaff)
    } catch (error) {
      console.error(error)
      updateStaff("Sorry, I can't access what I need right now. Please try again in a bit.")
    } finally {
      setIsLoading(false)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    sendMessage(text)
    setText("")
  }

  // ---------- State 1 + 2: closed button (with the hover card) ----------
  if (!isOpen) {
    return (
      <div
        className="widget"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setIsHovered(false)
        }}
      >
        {isHovered && (
          <div className="widget-card">
            <div className="widget-card__top">
              <div className="widget-card__icon">
                <Headset size={20} />
              </div>
              <p>Have questions about parking, accessibility, or group passes?</p>
            </div>

            <div className="widget-card__bottom">
              <h3>Need Assistance?</h3>
              <button className="widget-card__open" onClick={() => setIsOpen(true)}>
                Open Chat
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        <button
          className="widget-trigger"
          aria-label="Open support chat"
          onClick={() => setIsOpen(true)}
        >
          <Headset size={22} />
        </button>
      </div>
    )
  }

  // ---------- State 3: open chat panel ----------
  return (
    <section className="widget-panel" aria-label="Live chat">
      <header className="widget-panel__header">
        <div className="widget-panel__title">
          <div className="widget-panel__icon">
            <Headset size={20} />
          </div>
          <div>
            <h3>Campus Info</h3>
            <p className="widget-panel__status">
              <span className="ping-dot" />
              Staff Online • 1337 School
            </p>
          </div>
        </div>

        <button
          className="widget-panel__close"
          onClick={() => setIsOpen(false)}
          aria-label="Close chat"
        >
          <X size={14} />
        </button>
      </header>

      <div className="widget-panel__body" ref={bodyRef}>
        <div className="date-pill-row">
          <span className="date-pill date-pill--small">Today, {openedAt}</span>
        </div>

        {messages.map((message) =>
          message.from === "staff" ? (
            <div key={message.id} className="w-msg w-msg--staff">
              <div className="w-msg__avatar">S</div>
              <div className="w-msg__content">
                <span className="w-msg__name">Staff</span>
                <p className="w-msg__bubble">{message.text || "..."}</p>
                <span className="w-msg__time">{message.time}</span>
              </div>
            </div>
          ) : (
            <div key={message.id} className="w-msg w-msg--visitor">
              <p className="w-msg__bubble">{message.text}</p>
              <span className="w-msg__time">{message.time}</span>
            </div>
          )
        )}

        {/* quick questions disappear after the visitor writes something */}
        {messages.length === 1 && (
          <div className="quick-questions">
            <p>Recommended inquiries:</p>
            <div className="quick-questions__chips">
              {quickQuestions.map((q) => (
                <button key={q.label} className="chip" onClick={() => sendMessage(q.label)}>
                  <span>{q.emoji}</span>
                  {q.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="widget-panel__footer">
        <form className="widget-form" onSubmit={handleSubmit}>
          <div className="widget-form__input">
            {/* TODO: file upload */}
            <button type="button" className="widget-form__attach" aria-label="Attach a file">
              <Paperclip size={15} />
            </button>
            <input
              type="text"
              placeholder="Type your message..."
              value={text}
              maxLength={500}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="send-btn"
            aria-label="Send message"
            disabled={isLoading}
          >
            <Send size={16} />
          </button>
        </form>

        <div className="widget-panel__note">
          <p className="chat-footer__secure">
            <Lock size={10} />
            Official 1337 SchoolVisit • Instant Response
          </p>
          <span>{text.length}/500</span>
        </div>
      </footer>
    </section>
  )
}