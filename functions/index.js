const functions = require('firebase-functions');
const DialogflowApp = require('actions-on-google').DialogflowApp;
const fortune = require('fortune-teller');
exports.fortune = functions.https.onRequest((req, res) => {
  const app = new DialogflowApp({request: req, response: res});
  function welcomeIntent (app) {
    if (!app.getLastSeen()) {
      app.askForConfirmation('This app contains mature content. Continue?');
    }
    app.ask(fortune.fortune());
    app.askForConfirmation('Would you like to hear another?');
  }
  function confirmationHandler(app) {
    if (!app.getUserConfirmation()) {
      app.tell('cowsay Goodbye');
    }
    app.ask(fortune.fortune());
    app.askForConfirmation('Would you like to hear another?');
  }
  let actionMap = new Map()
  actionMap.set('input.welcome', welcomeIntent)
  actionMap.set('actions.intent.CONFIRMATION', confirmationHandler)
  app.handleRequest(actionMap)

});
