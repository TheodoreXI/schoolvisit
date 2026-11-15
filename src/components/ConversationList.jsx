import { Search } from "lucide-react"

export default function ConversationList({
  conversations,
  activeId,
  onSelect,
  search,
  onSearchChange,
}) {
  return (
    <section className="conv-list">
      <div className="conv-list__search">
        <Search size={14} className="conv-list__search-icon" />
        <input
          type="text"
          placeholder="Search conversations or visits..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="conv-list__items">
        {conversations.length === 0 && (
          <p className="conv-list__empty">No conversations found.</p>
        )}

        {conversations.map((conv) => {
          const lastMessage = conv.messages[conv.messages.length - 1]
          const isActive = conv.id === activeId
          const hasUnread = conv.unread > 0

          let className = "conv-item"
          if (isActive) className += " conv-item--active"
          if (hasUnread) className += " conv-item--unread"

          return (
            <button
              key={conv.id}
              className={className}
              onClick={() => onSelect(conv.id)}
            >
              <span className="conv-item__avatar">{conv.initials}</span>

              <span className="conv-item__body">
                <span className="conv-item__top">
                  <span className="conv-item__name">{conv.name}</span>
                  <span className="conv-item__time">{conv.time}</span>
                </span>

                <span className="conv-item__tag">{conv.tag}</span>

                <span className="conv-item__bottom">
                  <span className="conv-item__preview">
                    {lastMessage ? lastMessage.text : "No messages yet"}
                  </span>
                  {hasUnread && (
                    <span className="conv-item__badge">{conv.unread}</span>
                  )}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
