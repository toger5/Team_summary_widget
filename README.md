# Team_summary_widget
This is a very simple widget that reads the state from the state key `"io.element.team_summary"` and displays it as rendered HTML inside the widget IFrame.

## Use case
It is made for a team summary pinned widget in the main room of each team. But it can be used for any room that wants a beautiful landing page where the content can be easily changed by updating the state event.

### how to update the state event
 - in element type `/devtools` into the compose
 - send a new state event or search for `"io.element.team_summary"`.
 - edit the value of `content/html`
 - reload the widget