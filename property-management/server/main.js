import { Meteor } from 'meteor/meteor';
import '../imports/api/Tasks.js';
import '../imports/api/Properties.js';
import '../imports/api/Owners.js';
import '../imports/api/PropertyItems.js';
import '../imports/api/InspectionSheets.js';

Meteor.startup(() => {
  // code to run on server at startup
  console.log('Server Started');
  //var express = require('express');
  //var app = express();
  //app.user(express.static(__dirname + '/public'));

  //app.listen(8080);
  //console.log('Listening on port 8080');
});
