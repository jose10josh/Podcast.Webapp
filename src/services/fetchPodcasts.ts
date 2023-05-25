import { API_URL } from "@src/utils/constants";


export const fetchPodcasts = async ():Promise<Podcast[]> => {
  try {
    const response = await fetch(`${API_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`);
    if (!response.ok) {
      throw new Error('Ocurrio un error fetchPodcasr from API');
    }
    const data:{feed:{entry:fetchedPodcast[]}} = await response.json();
    const podcasts = data.feed.entry;

    let newPodcastList:Podcast[] = podcasts.map(podcast => ({
      id : podcast.id.attributes["im:id"],
      title : podcast.title.label,
      description : podcast.summary.label,
      image : podcast['im:image'][2].label,
      author : podcast['im:artist'].label
    }))

    return newPodcastList;
  } catch (error) {
    console.error("Ocurrio un error fetchPodcasr from API", error);
    throw new Error('Ocurrio un error fetchPodcasr from API');
  }
}

export const fetchPodcastDetail = async (id:number):Promise<PodcastDetail> => {
  try {
    const response = await fetch(`${API_URL}/lookup?id=${id}&media=podcast&entity=podcastEpisode`);
    if (!response.ok) {
      throw new Error('Ocurrio un error fetchPodcasr -> fetchPodcastDetail from API');
    }

    const {results}:{results:any} = await response.json();
    if(!results || results.length === 0) {
      throw new Error('Ocurrio un error  fetchPodcasr -> fetchPodcastDetail from API');
    }

    const podcast:Podcast = {
      id : results[0].collectionId,
      title : results[0].collectionName,
      description : results[1].description,
      image : results[0].artworkUrl100,
      author : results[0].artistName
    };

    let newEpisode: Record<number, PodcastEpisode> = {};
    results.slice(1).map((podcast:PodcastEpisode) => {
      {
        const trackId = podcast.trackId;
        newEpisode[trackId] = {
          collectionViewUrl : podcast.collectionViewUrl,
          episodeUrl : podcast.episodeUrl,
          description : podcast.description,
          trackId : podcast.trackId,
          trackName : podcast.trackName,
          releaseDate : podcast.releaseDate,
          trackTimeMillis: podcast.trackTimeMillis
        }
      }
    })
    return {...podcast, episodes: newEpisode};
  } catch (error) {
    console.error("Ocurrio un error  fetchPodcasr -> fetchPodcastDetail from API", error);
    throw new Error('Ocurrio un error  fetchPodcasr -> fetchPodcastDetail from API');
  }
}