import React from 'react';
import './css/App.css';

import SectionTitle from './components/SectionTitle'

function App() {
  return (
    <div className="container-fluid">
      <SectionTitle title={"お客様情報"} />
      <SectionTitle title={"オプション"} />
      <SectionTitle title={"日程"} />
    </div>
  );
}

export default App;
