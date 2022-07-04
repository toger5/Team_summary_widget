# Team-summary Widget
This is a very simple widget that reads the state from the state key `"io.element.team_summary"` and displays it as rendered HTML inside the widget IFrame.

## Use case
It is made for a team summary pinned widget in the main room of each team. But it can be used for any room that wants a beautiful landing page where the content can be easily changed by updating the state event.

# Getting started
### How to add the widget to a room
It is currently hosted on netlify and can easily be added with the composer. Just send this message:
```
/addwidget https://golden-klepon-1b24b1.netlify.app/#/?widgetId=$matrix_widget_id&userId=$matrix_user_id
```
### How to update the state event
 - in element type `/devtools` into the compose
 - send a new state event or search for `"io.element.team_summary"`.
 - edit the value of `content/html`
 - reload the widget