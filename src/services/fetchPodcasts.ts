import { API_URL } from "@src/utils/constants";


export const fetchPodcasts = async ():Promise<Podcast[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Request failed');
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

    console.log("myData",newPodcastList);

    return newPodcastList;
  } catch (error) {
    console.error("Ocurrio un error", error);
    throw new Error('Ocurrio un error');
  }

}