import React from 'react';

type Props = {
  title: string;
  description: string;
  episodeUrl: string;
};

const AudioPlayer = ({ title, description, episodeUrl }: Props) => {
  return (
    <div className="shadow-xl p-5 mb-12">
      <h5 className="font-bold text-xl mb-3">{title}</h5>
      <p className="mb-4 text-sm">{description}</p>
      <audio controls className="w-full h-8">
        <source src={episodeUrl} />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export { AudioPlayer };
