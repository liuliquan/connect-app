import React, {PropTypes} from 'react'
import RichTextArea from '../RichTextArea/RichTextArea'

export default class AddComment extends React.Component {

  constructor(props) {
    super(props)
    this.onPost = this.onPost.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.refs.richTextArea
      && (nextProps.content === null || nextProps.content === undefined)
      && nextProps.content !== this.props.content) {
      this.refs.richTextArea.clearState()
    }
  }

  onPost({content}) {
    this.props.onAdd(content)
  }

  onChange(title, content) {
    this.props.onChange(content)
  }

  render() {
    const { className, avatarUrl, authorName, placeholder, isAdding, hasError } = this.props

    return (
      <RichTextArea ref="richTextArea"
          className={className}
          disableTitle
          contentPlaceholder={placeholder || 'New reply...'}
          onPost={this.onPost}
          onPostChange={this.onChange}
          isCreating={isAdding}
          hasError={hasError}
          avatarUrl={avatarUrl}
          authorName={authorName}
      />
    )
  }
}

AddComment.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  content: PropTypes.string,
  avatarUrl: PropTypes.string,
  authorName: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  hasError: PropTypes.bool,
  isAdding: PropTypes.bool
}
