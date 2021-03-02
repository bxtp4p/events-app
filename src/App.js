import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import "semantic-ui-css/semantic.min.css";
import 'react-datepicker/dist/react-datepicker.css';

import { Amplify } from 'aws-amplify';
import ApiConfig from './aws-exports';

import AllEvents from './Components/AllEvents';
import NewEvent from './Components/NewEvent';
import ViewEvent from './Components/ViewEvent';

Amplify.configure(ApiConfig);

const Home = () => (
  <div className="ui container">
    <AllEvents />
  </div>
);

const App = () => (
  <Router>
    <div>
      <Route exact={true} path="/" component={Home} />
      <Route path="/event/:id" component={ViewEvent} />
      <Route path="/newEvent" component={NewEvent} />
    </div>
  </Router>
);

export default App;
