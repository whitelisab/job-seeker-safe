import React from 'react';
import Button from 'react-bootstrap/Button';

import Header from './Header.jsx';
import List from './List.jsx';

function App() {
  return (
    <div>
      <Header />
      <List />
      <Button variant="primary" className="mr-2">Primary</Button>
    </div>
  );
}

export default App;
