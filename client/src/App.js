import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home, PlaylistPage } from './pages/index';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/playlist" component={PlaylistPage} />
      </Switch>
    </main>
  );
}

export default App;
