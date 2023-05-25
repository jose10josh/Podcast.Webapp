import React, { createContext, useCallback, useContext, useState } from 'react';
import { useLocalStorage } from '@src/hooks/useStorage';
import { fetchPodcasts } from '@src/services/fetchPodcasts';

type PodcastContextType = {
  loading: boolean;
  error: boolean;
  podcastList: Podcast[];
  searchVal: string;
  getPodcastList: () => void;
  updateLoading: (state: boolean) => void;
  setSearchVal: (val: string) => void;
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
  const [searchVal, setSearchVal] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  let searchedPodcasts: Podcast[] = [];
  if (searchVal.length <= 0) {
    searchedPodcasts = itemList;
  } else {
    const searchedText: string = searchVal.toLowerCase();
    searchedPodcasts = itemList.filter(
      (item) => item.title.toLowerCase().includes(searchedText) || item.author.toLowerCase().includes(searchedText)
    );
    console.log(searchedPodcasts);
  }

  const updateLoading = (state: boolean) => {
    let delay = 1000;
    if (state) {
      delay = 0;
    }
    setTimeout(() => {
      setLoading(state);
    }, delay);
  };

  const getPodcasts = useCallback(async () => {
    const response = await fetchPodcasts();
    searchedPodcasts = response;
    saveItem(response);
  }, [fetchPodcasts]);

  const getPodcastList = async () => {
    try {
      setLoading(true);
      const res: Podcast[] = await fetchItems();
      if (res.length == 0) {
        getPodcasts();
      } else {
        searchedPodcasts = res;
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
    podcastList: searchedPodcasts,
    searchVal,
    getPodcastList,
    updateLoading,
    setSearchVal
  };
};
