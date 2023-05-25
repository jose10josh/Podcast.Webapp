import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDetail } from './Detail';

const Episode = () => {
  const { loading, notfound, podcast, setNotfound } = useDetail();
  const params = useParams();
  const episodeId = Number(params.episodeId);
  const [activeEpisode, setActiveEpisode] = useState<PodcastEpisode>({} as PodcastEpisode);
  const [source, setSource] = useState<string>();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (episodeId === undefined) {
      setNotfound(true);
      return;
    }

    if (podcast !== undefined) {
      const active = podcast.episodes[episodeId];
      if (active === undefined) {
        setNotfound(true);
        return;
      }
      setActiveEpisode(active);
      updateEpisode(active.episodeUrl);
    }
  }, [podcast]);

  const updateEpisode = (source: string) => {
    setSource(source);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (notfound) {
    return <div>Not found</div>;
  }

  return (
    <section>
      <div className="shadow-xl p-5 mb-12">
        <h5 className="font-bold text-xl mb-3">{activeEpisode?.trackName}</h5>
        <p className="mb-4 text-sm" dangerouslySetInnerHTML={{ __html: activeEpisode?.description }}></p>
        <audio ref={audioRef} controls className="w-full h-8">
          <source src={source} />
          Your browser does not support the audio element.
        </audio>
      </div>
    </section>
  );
};

export { Episode };
