import { Mongo } from 'meteor/mongo';

export const PropertyItems = new Mongo.Collection('property_items');

PropertyItems.allow({
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
