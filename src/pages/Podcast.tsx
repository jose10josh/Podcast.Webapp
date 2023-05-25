import React from 'react';
import { NavLink } from 'react-router-dom';
import { timeFormat } from '@src/utils/timeFormat';
import { useDetail } from './Detail';

const Podcast = () => {
  const { loading, notfound, podcast } = useDetail();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (notfound || Object.keys(podcast).length === 0) {
    return <div>Not found</div>;
  }

  return (
    <section>
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
  );
};

export { Podcast };
