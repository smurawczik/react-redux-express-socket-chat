import React, { PropTypes } from 'react'
import Message from './Message'

import './ShowMessages.css'

const Messages = ({ messages, user }) => (
  <div className="messages-view">
    {messages.map(message =>
      <Message
        key={message.id}
        {...message}
        user={user}
      />
    )}
  </div>
)

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }).isRequired)
}

export default Messages
