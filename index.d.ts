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
  episodes: PodcastEpisode[]
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

// interface Author {
//   name: Icon;
//   uri:  Icon;
// }

// interface Icon {
//   label: string;
// }

// interface Category {
//   attributes: CategoryAttributes;
// }

// interface CategoryAttributes {
//   "im:id": string;
//   label:   PurpleLabel;
//   scheme:  string;
//   term:    PurpleLabel;
// }

// enum PurpleLabel {
//   Music = "Music",
//   MusicCommentary = "Music Commentary",
//   MusicHistory = "Music History",
//   MusicInterviews = "Music Interviews",
// }

// interface ID {
//   attributes: IDAttributes;
//   label:      string;
// }

// interface IDAttributes {
//   "im:id": string;
// }

// interface IMArtist {
//   attributes?: IMArtistAttributes;
//   label:       string;
// }

// interface IMArtistAttributes {
//   href: string;
// }

// interface IMContentType {
//   attributes: IMContentTypeAttributes;
// }

// interface IMContentTypeAttributes {
//   label: FluffyLabel;
//   term:  FluffyLabel;
// }

// enum FluffyLabel {
//   Podcast = "Podcast",
// }

// interface IMImage {
//   attributes: IMImageAttributes;
//   label:      string;
// }

// interface IMImageAttributes {
//   height: string;
// }

// interface IMPrice {
//   attributes: IMPriceAttributes;
//   label:      IMPriceLabel;
// }

// interface IMPriceAttributes {
//   amount:   string;
//   currency: Currency;
// }

// enum Currency {
//   Usd = "USD",
// }

// enum IMPriceLabel {
//   Get = "Get",
// }

// interface IMReleaseDate {
//   attributes: Icon;
//   label:      Date;
// }

// interface Link {
//   attributes: LinkAttributes;
// }

// interface LinkAttributes {
//   href:  string;
//   rel:   Rel;
//   type?: Type;
// }

// enum Rel {
//   Alternate = "alternate",
//   Self = "self",
// }

// enum Type {
//   TextHTML = "text/html",
// }
