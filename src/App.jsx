import { useEffect, useState } from 'react'
import { messages as fallbackMessages } from './messages'
import './App.css'

function getMessageForToday(messages) {
  const today = new Date()
  // Calculate a day index based on the date (e.g., days since epoch)
  const dayIndex = Math.floor(today.setHours(0,0,0,0) / (1000 * 60 * 60 * 24))
  return messages[dayIndex % messages.length]
}

function App() {
  const [messages, setMessages] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/messages.json')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then(setMessages)
      .catch(() => {
        setMessages(fallbackMessages)
        setError(true)
      })
  }, [])

  if (!messages) {
    return <div className="affirmation-container"><div>Loading...</div></div>
  }

  const message = getMessageForToday(messages)

  return (
    <div className="affirmation-container">
      <h1 className="affirmation-title">Critter Column</h1>
      <div className="affirmation-message">{message}</div>
      {error && <div style={{color: '#d72660', marginTop: '1rem'}}>Could not load messages.json. Showing fallback.</div>}
    </div>
  )
}

export default App
