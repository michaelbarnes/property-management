import { Mongo } from 'meteor/mongo';

export const Owners = new Mongo.Collection('owners');

Owners.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  }
});
