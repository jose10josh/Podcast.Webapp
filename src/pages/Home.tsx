import { PodcastList } from '@src/components/PodcastList';
import React, { useEffect } from 'react';
import { usePodcast } from '@src/context/podcastContext';

const Home = () => {
  const { loading, podcastList, searchVal, getPodcastList, setSearchVal, updateLoading } = usePodcast();

  useEffect(() => {
    updateLoading(true);
    if (podcastList.length == 0) {
      getPodcastList();
    }
    updateLoading(false);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="mb-12 flex items-center justify-end">
        <p className="px-2 text-white font-bold bg-main rounded-lg mr-2">{podcastList.length}</p>
        <input
          className="border border-black rounded-md px-2 py-1 w-1/5"
          placeholder="Friday Night..."
          type="text"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
      </div>
      <PodcastList podcastList={podcastList} />
    </div>
  );
};

export { Home };
