import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Home from './Pages/Home';
import Starred from './Pages/Starred';
import Shows from './Pages/Shows';

const theme = {
  mainColors: {
    blue: '#2400ff',
    gray: '#c6c6c6',
    dark: '#353535',
    red: '#FF0000',
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
