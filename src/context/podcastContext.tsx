import React, { createContext, useCallback, useContext, useState } from 'react';
import { useLocalStorage } from '@src/hooks/useStorage';
import { fetchPodcasts } from '@src/services/fetchPodcasts';

type PodcastContextType = {
  loading: boolean;
  error: boolean;
  podcastList: Podcast[];
  getPodcastList: () => void;
  updateLoading: (state: boolean) => void;
};

const PodcastContext = createContext<PodcastContextType>({} as PodcastContextType);

export const ProviderPodcast = ({ children }: { children: React.ReactNode }) => {
  const auth = useProviderPodcast();

  return <PodcastContext.Provider value={auth}>{children}</PodcastContext.Provider>;
};

export const usePodcast = () => {
  return useContext(PodcastContext);
};

const useProviderPodcast = () => {
  const { itemList, saveItem, fetchItems } = useLocalStorage<Podcast[]>('PodcastList', []);
  const [podcasts, setPodcasts] = useState<Podcast[]>(itemList);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const updateLoading = (state: boolean) => {
    setLoading(state);
  };

  const getPodcasts = useCallback(async () => {
    const response = await fetchPodcasts();
    setPodcasts(response);
    saveItem(response);
  }, [fetchPodcasts]);

  const getPodcastList = async () => {
    try {
      setLoading(true);
      const res: Podcast[] = await fetchItems();
      if (res.length == 0) {
        getPodcasts();
      } else {
        setPodcasts(res);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    podcastList: podcasts,
    getPodcastList,
    updateLoading
  };
};
