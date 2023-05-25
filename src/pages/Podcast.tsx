import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { fetchPodcastDetail } from '@src/services/fetchPodcasts';
import { useLocalStorage } from '@src/hooks/useStorage';
import { timeFormat } from '@src/utils/timeFormat';
import { usePodcast } from '@src/context/podcastContext';
import { PodcastInfoCard } from '@src/components/PodcastInfoCard';

const Podcast = () => {
  const params = useParams();
  const id = Number(params.id);
  const [notfound, setNotfound] = useState<boolean>(false);
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
          if (Object.keys(podcastDetail).length === 0) {
            //delete local storage
            console.log('Delete local storage');
            setNotfound(true);
          } else {
            saveItem(podcastDetail);
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
        <div className="shadow-xl p-5 mb-12">
          <h6 className="font-bold text-xl">Episodes: {Object.keys(podcast.episodes).length}</h6>
        </div>
        <div className="shadow-xl p-5 flex">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th>Title</th>
                <th>Date</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {Object.keys(podcast.episodes).map((IKey: string) => {
                const episode = podcast.episodes[+IKey];
                return (
                  <tr key={episode.trackId} className="border-b">
                    <td className="py-2 w-4/5">
                      <NavLink to={`episode/${episode.trackId}`}>{episode.trackName}</NavLink>
                    </td>
                    <td className="py-2">{new Date(episode.releaseDate).toLocaleDateString()}</td>
                    <td className="py-2">{timeFormat(episode.trackTimeMillis)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export { Podcast };
