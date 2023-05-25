import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPodcastDetail } from '@src/services/fetchPodcasts';
import { useLocalStorage } from '@src/hooks/useStorage';
import { timeFormat } from '@src/utils/timeFormat';
import { usePodcast } from '@src/context/podcastContext';

const Podcast = () => {
  const params = useParams();
  const id = Number(params.id);
  const [notfound, setNotfound] = useState<boolean>(false);
  const { loading, updateLoading } = usePodcast();
  const { itemList: podcast, saveItem, fetchItems } = useLocalStorage<PodcastDetail>(`PodcastDetail-${id}`, {} as PodcastDetail);

  useEffect(() => {
    console.log('podcast', podcast);

    const getPodcastDetail = async () => {
      const res: PodcastDetail = await fetchItems();
      console.log('Local Data', res);
      updateLoading(true);
      if (Object.keys(res).length === 0) {
        try {
          const { podcast, episodes } = await fetchPodcastDetail(id);
          if (Object.keys(podcast).length === 0) {
            //delete local storage
            console.log('Delete local storage');
            setNotfound(true);
          } else {
            saveItem({ ...podcast, episodes });
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

  if (notfound) {
    return <div>Not found</div>;
  }

  return (
    <div className="flex gap-40">
      <aside className="shadow-xl p-5 w-3/12 h-fit">
        <img src={podcast.image} alt="Podcast cover image" className="m-auto" />
        <hr className="my-5" />
        <h5 className="mt-2 font-semibold"> {podcast.title}</h5>
        <i className="text-xs">{podcast.author}</i>
        <hr className="my-5" />
        <p className="font-semibold text-sm">Description:</p>
        <p className="text-xs">{podcast?.description?.slice(0, 150)}...</p>
      </aside>
      <section className="w-9/12">
        <div className="shadow-xl p-5 mb-12">
          <h6 className="font-bold text-xl">Episodes: {podcast.episodes?.length}</h6>
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
              {podcast.episodes?.map((episode) => {
                return (
                  <tr key={episode.trackId} className="border-b">
                    <td className="py-2 w-4/5">{episode.trackName}</td>
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
