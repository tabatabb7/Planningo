import React from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import 'semantic-ui-css/components/button.css'
import 'semantic-ui-css/components/comment.css'
import 'semantic-ui-css/components/form.css'
import 'semantic-ui-css/components/header.css'

const GroupMessages = () => (
  <Comment.Group>
    <Header as='h3' dividing>
      Group Messages
    </Header>

    <Comment>
      <Comment.Avatar src="/assets/icons/users/026-woman.png" />
      <Comment.Content>
        <Comment.Author as='a'>Nadia C.</Comment.Author>
        <Comment.Metadata>
          <div>Today at 2:30PM</div>
        </Comment.Metadata>
        <Comment.Text>
          <p>Can someone help me with the CSS?</p>
        </Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
      <Comment.Group>
        <Comment>
          <Comment.Avatar src="/assets/icons/users/028-girl.png" />
          <Comment.Content>
            <Comment.Author as='a'>Sally Y.</Comment.Author>
            <Comment.Metadata>
              <div>Just now</div>
            </Comment.Metadata>
            <Comment.Text>Let me get on Zoom!</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </Comment>

    <Comment>
      <Comment.Avatar src="/assets/icons/users/002-girl.png" />
      <Comment.Content>
        <Comment.Author as='a'>Dana Z.</Comment.Author>
        <Comment.Metadata>
          <div>Yesterday at 1:30 AM</div>
        </Comment.Metadata>
        <Comment.Text>How's the project going?</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

    <Form reply>
      <Form.TextArea />
      <Button content='Send' labelPosition='left' icon='edit' primary />
    </Form>
  </Comment.Group>
)

export default GroupMessages
