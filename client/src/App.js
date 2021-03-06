import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home, PlaylistPage, NotFound } from './pages';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/playlist" component={PlaylistPage} />
        <Route component={NotFound} />
      </Switch>
    </main>
  );
}

export default App;
