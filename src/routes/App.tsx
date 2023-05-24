import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProviderPodcast } from '@src/context/podcastContext';
import { Home } from '@src/pages/Home';
import { Detail } from '@src/pages/Detail';
import { Header } from '@src/components/Header';

import './index.css';
import { Layout } from '@src/components/Layout';

const App = () => {
  return (
    <ProviderPodcast>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail" element={<Detail />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ProviderPodcast>
  );
};

export default App;
