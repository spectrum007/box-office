import React from 'react';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        THIS IS THE HOME PAGE
      </Route>
      <Route exact path="/starred">
        This is the some another page
      </Route>
      <Route>This is 404 page</Route>
    </Switch>
  );
}

export default App;
