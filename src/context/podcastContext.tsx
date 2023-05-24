import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import { useLocalStorage } from '@src/hooks/useStorage';
import { fetchPodcasts } from '@src/services/fetchPodcasts';

type PodcastContextType = {
  loading: boolean;
  error: boolean;
  podcastList: Podcast[];
  podcastDetail: Podcast[];
  getPodcastList: () => void;
};

const PodcastContext = createContext<PodcastContextType>(
  {} as PodcastContextType
);

export const ProviderPodcast = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const auth = useProviderPodcast();

  return (
    <PodcastContext.Provider value={auth}>{children}</PodcastContext.Provider>
  );
};

export const usePodcast = () => {
  return useContext(PodcastContext);
};

const useProviderPodcast = () => {
  const {
    itemList,
    saveItem,
    fetchItems,
    loading: storageLoading
  } = useLocalStorage<Podcast[]>('PodcastList', []);

  const [podcasts, setPodcasts] = useState<Podcast[]>(itemList);
  const [podcastsDetail, setPodcastsDetail] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

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
    podcastDetail: podcastsDetail,

    getPodcastList
  };
};
