export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  description: string;
  link: string;
  genre?: string;
  tags?: string[];
}
