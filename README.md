# Document of architecture of API
## Project Structure
```
 src
  │   app.js          # App entry point
  └───api             # Express route controllers for all the endpoints of the app
  └───config          # Environment variables and configuration related stuff
  └───jobs            # Jobs definitions for agenda.js
  └───loaders         # Split the startup process into modules
  └───models          # Database models
  └───services        # All the business logic is here
  └───subscribers     # Event handlers for async task
```

## 3 Layer architecture 🥪
The idea is to use the principle of separation of concerns to move the business logic away from the node.js API Routes.

<img src="https://ibb.co/S6j9Yr7" >

## System architecture 🥪
<img src="https://ibb.co/QYpHFDS" >