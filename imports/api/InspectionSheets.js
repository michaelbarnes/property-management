import { Mongo } from 'meteor/mongo';

export const InspectionSheets = new Mongo.Collection('inspection_sheets');
//


InspectionSheets.allow({
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
