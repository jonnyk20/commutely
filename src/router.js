import React from 'react';
import { Route, Switch } from 'react-router';

import BasicMap from './components/Map/BasicMap';
import MapWithSearch from './components/Map/MapWithSearch';
import MapWithDirections from './components/Map/MapWithDirections';
import MapWithSearchAndDirections from './components/Map/MapWithSearchAndDirections';

export const routes = (
  <Switch>
    <Route path="/search" component={MapWithSearch} />
    <Route path="/directions" component={MapWithDirections} />
    <Route path="/searchanddirections" component={MapWithSearchAndDirections} />
    <Route path="/" component={BasicMap} />
  </Switch>
)