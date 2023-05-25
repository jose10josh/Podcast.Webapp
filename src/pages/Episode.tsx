import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPodcastDetail } from '@src/services/fetchPodcasts';
import { useLocalStorage } from '@src/hooks/useStorage';
import { timeFormat } from '@src/utils/timeFormat';
import { usePodcast } from '@src/context/podcastContext';
import { PodcastInfoCard } from '@src/components/PodcastInfoCard';
import { AudioPlayer } from '@src/components/AudioPlayer';

const Episode = () => {
  const params = useParams();
  const id = Number(params.id);
  const episodeId = Number(params.episodeId);
  const [notfound, setNotfound] = useState<boolean>(false);
  const { loading, updateLoading } = usePodcast();
  const [activeEpisode, setActiveEpisode] = useState<PodcastEpisode>({} as PodcastEpisode);
  const { itemList: podcast, saveItem, fetchItems } = useLocalStorage<PodcastDetail>(`PodcastDetail-${id}`, {} as PodcastDetail);

  useEffect(() => {
    if (id === undefined || episodeId === undefined) {
      setNotfound(true);
      return;
    }

    const getPodcastDetail = async () => {
      updateLoading(true);
      const res: PodcastDetail = await fetchItems();
      const active = res.episodes[episodeId];

      setActiveEpisode(active);
      if (Object.keys(res).length === 0) {
        try {
          const podcastDetail = await fetchPodcastDetail(id);
          if (Object.keys(podcastDetail).length === 0) {
            //delete local storage
            console.log('Delete local storage');
            setNotfound(true);
          } else {
            saveItem(podcastDetail);
            const active = podcastDetail.episodes[episodeId];
            setActiveEpisode(active);
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
      <section className="w-9/12">
        <AudioPlayer
          title={activeEpisode?.trackName}
          description={activeEpisode?.description}
          episodeUrl={activeEpisode?.episodeUrl}
        />
      </section>
    </div>
  );
};

export { Episode };
