import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProviderPodcast } from '@src/context/podcastContext';
import { Home } from '@src/pages/Home';
import { Podcast } from '@src/pages/Podcast';

import './index.css';
import { Layout } from '@src/components/Layout';

const App = () => {
  return (
    <ProviderPodcast>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/podcast/:id" element={<Podcast />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ProviderPodcast>
  );
};

export default App;
