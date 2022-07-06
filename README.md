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
There is a builtin tool to update the state. Just press edit (the button is almost transparent) on the top right corner and type in the markdown for the welcome page. Be aware, that this only works if you have **permissions to edit the room state**.
The markdown will be converted to html automatically and the state event will be updated with both: the html and the markdown.