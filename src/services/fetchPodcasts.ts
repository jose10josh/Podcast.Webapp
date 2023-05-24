import { API_URL } from "@src/utils/constants";


export const fetchPodcasts = async ():Promise<Podcast[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Request failed');
    }
    const data:{feed:{entry:Podcast[]}} = await response.json();
    const podcasts = data.feed.entry;
    return podcasts;
  } catch (error) {
    console.error("Ocurrio un error", error);
    throw new Error('Ocurrio un error');
  }

}