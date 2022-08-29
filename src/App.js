import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Starred from './Pages/Starred';
import Shows from './Pages/Shows';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/starred">
          <Starred />
        </Route>
        <Route exact path="/show/:id">
          <Shows />
        </Route>
        <Route>
          <div>Error 404 page not found</div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
