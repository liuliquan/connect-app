import _ from 'lodash'
import React, {PropTypes} from 'react'
import moment from 'moment'
import './MessageDetails.scss'
import ActionCard from '../ActionCard/ActionCard'
import BtnSeparator from '../ActionCard/BtnSeparator'
import Comment from '../ActionCard/Comment'
import AddComment from '../ActionCard/AddComment'

class MessageDetails extends React.Component {

  constructor(props) {
    super(props)
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this)
  }

  handleLoadMoreClick() {
    this.props.onLoadMoreMessages()
  }

  onSaveMessageChange(messageId, content, editMode) {
    this.props.onSaveMessageChange(messageId, content, editMode)
  }

  render() {
    const {
      topicMessage,
      messages,
      hasMoreMessages,
      newMessage,
      onNewMessageChange,
      onAddNewMessage,
      onSaveMessage,
      onDeleteMessage,
      isDeletingTopic,
      isLoadingComments,
      currentUser,
      isAddingComment,
      error,
      allowAddingComment} = this.props
    let authorName = currentUser.firstName
    if (authorName && currentUser.lastName) {
      authorName += ' ' + currentUser.lastName
    }
    return (
    <ActionCard className="main-messaging">
      <ActionCard.Header {...this.props}
        self={topicMessage.author && topicMessage.author.userId === currentUser.userId}
        authorName={authorName}
        avatarUrl={topicMessage.author.photoURL}
        hideDelete={messages && messages.length > 1}
      >
        {hasMoreMessages && <BtnSeparator onClick={this.handleLoadMoreClick} isLoadingComments={isLoadingComments}>
          {isLoadingComments ? 'Loading...' : 'Load earlier messages'}
        </BtnSeparator>}
      </ActionCard.Header>
      {messages && messages.map((item, idx) =>
        <Comment
          key={idx}
          message={item}
          avatarUrl={_.get(item, 'author.photoURL', null)}
          authorName={item.author ? (item.author.firstName + ' ' + item.author.lastName) : 'Connect user'}
          date={moment(item.date).fromNow()}
          active={item.unread}
          self={item.author && item.author.userId === currentUser.userId}
          onChange={this.onSaveMessageChange.bind(this, item.id)}
          onSave={onSaveMessage}
          onDelete={onDeleteMessage}
          isSaving={item.isSavingComment}
          hasError={item.error}
          readonly={item.id === topicMessage.id}
        >
          <div dangerouslySetInnerHTML={{__html: item.content}} />
        </Comment>
      )}

      { allowAddingComment &&
        <AddComment
          className="messaging-comment-section"
          isAdding={isAddingComment}
          hasError={error}
          avatarUrl={currentUser.photoURL}
          authorName={authorName}
          onAdd={onAddNewMessage}
          onChange={onNewMessageChange}
          content={newMessage}
        />
      }
      {isDeletingTopic &&
      <div className="editing-layer">
        <div>Deleting...</div>
      </div> 
      }
    </ActionCard>
  )
  }
}

MessageDetails.propTypes = {
  /**
   * The thread title
   */
  title: PropTypes.string.isRequired,

  /**
   * The messages to display
   */
  messages: PropTypes.array.isRequired,

  /**
   * The first topic message
   */
  topicMessage: PropTypes.any.isRequired,

  /**
   * Callback fired when "Load earlier messages" is clicked
   *
   * function (
   *  SyntheticEvent event?
   * )
   */
  onLoadMoreMessages: PropTypes.func.isRequired,

  /**
   * The flag if "earlier messages" are loading
   */
  isLoading: PropTypes.bool,

  /**
   * The content of new added message
   */
  newMessage: PropTypes.string,

  /**
   * Callback fired when a new message is changed
   *
   * function (
   *  String message,
   *  SyntheticEvent event?
   * )
   */
  onNewMessageChange: PropTypes.func.isRequired,

  /**
   * Callback fired when a message is changed
   *
   * function (
   *  String messageId,
   *  String content,
   *  SyntheticEvent event?
   * )
   */
  onSaveMessageChange: PropTypes.func.isRequired,

  /**
   * Callback fired when a new message is added (confirmed)
   *
   * function (
   *  SyntheticEvent event?
   * )
   */
  onAddNewMessage: PropTypes.func.isRequired,

  /**
   * Callback fired when a new message is saved (confirmed)
   *
   * function (
   *  SyntheticEvent event?
   * )
   */
  onSaveMessage: PropTypes.func.isRequired,

  /**
   * Callback fired when a message is deleted
   *
   * function (
   *  String messageId,
   *  SyntheticEvent event?
   * )
   */
  onDeleteMessage: PropTypes.func.isRequired,

  /**
   * Callback fired when a topic is changed
   *
   * function (
   *  String messageId,
   *  String title,
   *  String content,
   *  SyntheticEvent event?
   * )
   */
  onTopicChange: PropTypes.func.isRequired,

  /**
   * Callback fired when a topic is saved
   *
   * function (
   *  String messageId,
   *  String title,
   *  String content,
   *  SyntheticEvent event?
   * )
   */
  onSaveTopic: PropTypes.func.isRequired,

  /**
   * Callback fired when a topic is deleted
   *
   * function (
   *  SyntheticEvent event?
   * )
   */
  onDeleteTopic: PropTypes.func.isRequired,

  /**
   * The current logged in user
   */
  currentUser: PropTypes.object.isRequired,

  /**
   * The flag if comment addition is in progress
   */
  isAddingComment: PropTypes.bool,

  /**
   * Flag to allow adding comments for the message
   */
  allowAddingComment: PropTypes.bool.isRequired
}

export default MessageDetails
