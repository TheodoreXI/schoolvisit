import SupportWidget from "../components/SupportWidget"

// Placeholder visitor page. The only designed part is the floating chat widget.
export default function SupportPage() {
  return (
    <main className="support-page">
      <h1>Plan your campus visit</h1>
      <p>
        This is a placeholder page. Your real visitor page goes here. The chat
        button in the bottom-right corner is the widget from your Figma design.
      </p>
      <SupportWidget />
    </main>
  )
}
