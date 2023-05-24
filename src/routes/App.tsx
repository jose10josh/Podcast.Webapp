import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProviderPodcast } from '@src/context/podcastContext';
import { Home } from '@src/pages/Home';

const App = () => {
  return (
    <ProviderPodcast>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ProviderPodcast>
  );
};

export default App;
