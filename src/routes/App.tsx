import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProviderPodcast } from '@src/context/podcastContext';
import { Layout } from '@src/components/Layout';
import { Home } from '@src/pages/Home';
import { Podcast } from '@src/pages/Podcast';
import { NotFound } from '@src/pages/NotFound';

import './index.css';

const App = () => {
  return (
    <ProviderPodcast>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/podcast/:id" element={<Podcast />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ProviderPodcast>
  );
};

export default App;
