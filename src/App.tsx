import React from 'react';
import { useSelector } from 'react-redux';

import {
  Board
} from './components';

import type {
  RootState
} from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

function App() {
  const lists = useSelector((state: RootState) => state.lists.listConfigs);

  return (
    <div className="App">
      <Board 
        lists={lists}
        title="Tasks" 
      />
    </div>
  );
}

export default App;
