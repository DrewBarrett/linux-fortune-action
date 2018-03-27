const functions = require('firebase-functions');
const DialogflowApp = require('actions-on-google').DialogflowApp;
const fortune = require('fortune-teller');
exports.fortune = functions.https.onRequest((req, res) => {
  const app = new DialogflowApp({request: req, response: res});
  function welcomeIntent (app) {
    app.tell(fortune.fortune());
  }
  app.handleRequest(welcomeIntent)

});
