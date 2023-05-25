import { PodcastInfoCard } from '@src/components/PodcastInfoCard';
import { usePodcast } from '@src/context/podcastContext';
import { useLocalStorage } from '@src/hooks/useStorage';
import { fetchPodcastDetail } from '@src/services/fetchPodcasts';
import React, { useEffect, useState } from 'react';
import { Outlet, useOutletContext, useParams } from 'react-router-dom';

type ContextType = {
  loading: boolean;
  notfound: boolean;
  podcast: PodcastDetail;
  setNotfound: (value: boolean) => void;
};

const Detail = () => {
  const params = useParams();
  const id = Number(params.id);
  // const episodeId = Number(params.episodeId);
  const [notfound, setNotfound] = useState<boolean>(false);
  // const [activeEpisode, setActiveEpisode] = useState<PodcastEpisode>({} as PodcastEpisode);
  const { loading, updateLoading } = usePodcast();
  const { itemList: podcast, saveItem, fetchItems } = useLocalStorage<PodcastDetail>(`PodcastDetail-${id}`, {} as PodcastDetail);

  useEffect(() => {
    if (id === undefined) {
      setNotfound(true);
      return;
    }

    const getPodcastDetail = async () => {
      const res: PodcastDetail = await fetchItems();
      updateLoading(true);
      if (Object.keys(res).length === 0) {
        try {
          const podcastDetail = await fetchPodcastDetail(+id);
          if (podcastDetail === undefined) {
            setNotfound(true);
            console.log('Delete local storage');
          } else {
            if (Object.keys(podcastDetail).length === 0) {
              //delete local storage
              console.log('Delete local storage');
              setNotfound(true);
            } else {
              saveItem(podcastDetail);
            }
          }
        } catch (error) {
          console.log('Delete local storage');
        }
      }
      updateLoading(false);
    };
    getPodcastDetail();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (notfound || Object.keys(podcast).length === 0) {
    return <div>Not found</div>;
  }

  return (
    <div className="flex gap-40">
      <PodcastInfoCard
        id={id}
        image={podcast.image}
        title={podcast.title}
        author={podcast.author}
        description={podcast?.description}
      />
      <div className="w-9/12">
        <Outlet context={{ loading, notfound, podcast, setNotfound }} />
      </div>
    </div>
  );
};
export { Detail };

export function useDetail() {
  return useOutletContext<ContextType>();
}
