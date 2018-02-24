import React from 'react';
import { Route, Switch } from 'react-router';

import BasicMap from './components/Map/BasicMap';
import MapWithSearch from './components/Map/MapWithSearch';
import MapWithDirections from './components/Map/MapWithDirections';

export const routes = (
  <Switch>
    <Route path="/search" component={MapWithSearch} />
    <Route path="/directions" component={MapWithDirections} />
    <Route path="/" component={BasicMap} />
  </Switch>
)