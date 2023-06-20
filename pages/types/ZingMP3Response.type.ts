export interface ZingMp3Response {
  err: number;
  msg: string;
  data: any;
  timestamp: number;
}
export interface ISong {
  encodeId: string;
  title: string;
  cover: string;
  alias: string;
  isOffical: boolean;
  description: string;
  artistsNames: string;
  username: string;
  artists: [];
  thumbnailM: string;
  thumbnail: string;
  duration: number;
  releaseDate: number;
  genreIds: [];
  streamingStatus: number;
  sortDescription: string;
}
export interface IBanner {
  sectionType: string;
  viewType: string;
  title: string;
  link: string;
  sessionId: string;
  items: [
    {
      type: string;
      link: string;
      banner: string;
      cover: string;
      target: string;
      description: string;
      encodeId: string;
    }
  ];
}

export interface INewRealease {
  sectionType: string;
  title: string;
  link: string;
  items: {
    all: ISong[];
    others: ISong[];
    vPop: ISong[];
  };
}
export interface ICategory {
  title: string;
  sectionType: string;
  viewType: string;
  items: ISong[];
  link: string;
  itemType: string;
  options: {
    hideTitle: boolean;
  };
  sectionId: string;
}

export interface PlaylistResponse {
  encodeId: string;
  title: string;
  thumbnail: string;
  isoffical: boolean;
  link: string;
  isIndie: boolean;
  releaseDate: string;
  sortDescription: string;
  releasedAt: number;
  genreIds: [];
  PR: boolean;
  artists: [];
  artistsNames: string;
  playItemMode: number;
  subType: number;
  uid: number;
  thumbnailM: string;
  isShuffle: boolean;
  isPrivate: boolean;
  userName: string;
  isAlbum: boolean;
  textType: string;
  isSingle: boolean;
  distributor: string;
  description: string;
  aliasTitle: string;
  sectionId: string;
  contentLastUpdate: number;
  artist: {};
  genres: [];
  song: {
    items: ISong[];
    total: number;
    totalDuration: number;
  };
  like: number;
  listen: number;
  liked: boolean;
}
export interface Top100Response{
    sectionType: string,
    viewType: string,
    title: string,
    link: string,
    sectionId: string,
    items: PlaylistResponse[],
    genre: {
    name: "Nổi bật"
    }
}
export interface IURLSong{
    128: string,
    320: string
}