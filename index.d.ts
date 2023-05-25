interface Podcast {
  id: string
  title: string
  description: string
  image: string
  author: string
}

interface PodcastEpisode {
  collectionViewUrl:     string;
  episodeUrl:            string;
  description:           string;
  trackId:               number;
  trackName:             string;
  releaseDate:           string;
  trackTimeMillis:       number;
}

interface PodcastDetail extends Podcast {
  episodes: Record<number, PodcastEpisode>
}

interface fetchedPodcast {
  category:         Category;
  id:               ID;
  "im:artist":      IMArtist;
  "im:contentType": IMContentType;
  "im:image":       IMImage[];
  "im:name":        Icon;
  "im:price":       IMPrice;
  "im:releaseDate": IMReleaseDate;
  link:             Link;
  rights?:          Icon;
  summary:          Icon;
  title:            Icon;
}
