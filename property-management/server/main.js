import { Meteor } from 'meteor/meteor';
import '../imports/api/Tasks.js';
import '../imports/api/Properties.js';

Meteor.startup(() => {
  // code to run on server at startup
  console.log('Server Started');
});
