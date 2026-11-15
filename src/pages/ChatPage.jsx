import { useState } from "react"
import ConversationList from "../components/ConversationList"
import ChatWindow from "../components/ChatWindow"
import { conversations as initialConversations } from "../data/mockData"
import { getCurrentTime } from "../utils"

export default function ChatPage() {
  const [conversations, setConversations] = useState(initialConversations)
  const [activeId, setActiveId] = useState(initialConversations[0].id)
  const [search, setSearch] = useState("")

  const activeConversation = conversations.find((c) => c.id === activeId)

  const visibleConversations = conversations.filter((c) =>
    (c.name + " " + c.tag).toLowerCase().includes(search.toLowerCase())
  )

  function selectConversation(id) {
    setActiveId(id)
    // opening a conversation marks it as read
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
    )
  }

  // ---------------------------------------------------------------
  // YOUR PART: this is the one place where a message gets sent.
  // 1) it shows the message on screen right away
  // 2) then call your backend / AI here (see the TODO)
  // ---------------------------------------------------------------
  function sendMessage(text) {
    const time = getCurrentTime()
    const newMessage = { id: Date.now(), from: "me", text, time }

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? { ...c, time, messages: [...c.messages, newMessage] }
          : c
      )
    )

    // TODO (backend / AI): send `text` and `activeId` to your API here.
    // When the reply comes back, add it the same way as above,
    // but with from: "them".
  }

  return (
    <div className="chat-card">
      <ConversationList
        conversations={visibleConversations}
        activeId={activeId}
        onSelect={selectConversation}
        search={search}
        onSearchChange={setSearch}
      />
      <ChatWindow conversation={activeConversation} onSend={sendMessage} />
    </div>
  )
}
