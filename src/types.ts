export interface User {
  id: number;
  name: string;
  profileImage: string;
}

export interface Comment {
  id: number;
  user: User;
  content: string;
  uploadTime: Date;
  track?: Track;
}

export interface Track {
  id: string;
  title: string;
  artists: string[];
  duration: string;
  albumImgUrl: string;
}

export interface Playlist {
  id: number;
  title: string;
  description: string;
  duration: string;
  thumbnailImgUrl: string;
  madeBy: string;
  liked: boolean;
  tracks: Track[];
}
