import React from 'react';
import type {Node} from 'react';
import {Provider} from 'react-redux';

import PhotoEditor from './src/PhotoEditor';
import Store from './src/redux/store';

const App: () => Node = () => {
  return (
    <Provider store={Store}>
      <PhotoEditor />
    </Provider>
  );
};

export default App;
