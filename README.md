# London's transportion System

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

It relies on Bootstrap 3 and font-awesome for styling.

Some improvements could be done to this project. At the moment, the main component App performs the API call that populates the Sidebar. However, all the interactive with these values happen in the component Sidebar so this could also be done inside the component, for a better separation of concerns.

Likewise, I've tinkered about creating a Message component inside the Information, to process messages and displays them on a div. This component would be rendered on Line and on Bike only when an error occurred, instead of having separated texts divs in each of these components. However, although they perform similar actions (display a message on screen), their implementation is a bit different and I've opted to have separated divs.
