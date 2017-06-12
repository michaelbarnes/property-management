/* v1 - No Flow */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App.jsx';
//import '../imports/startup/Accounts-Config.js';

Meteor.startup(() => {
  render(<App />, document.getElementById('content'));
});

/* Flow Method */
/*import React from 'react';
import { mount } from 'react-mounter';

import { MainLayout } from './layouts/MainLayout.jsx';
import App from '../imports/ui/App.jsx';
import Main from '../imports/ui/Main.jsx';

FlowRouter.route('/', {
    action() {
        mount (MainLayout, {
            content: (<App />)
        })
    }
});*/
