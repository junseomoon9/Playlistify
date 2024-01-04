export interface AuthenticationResponseData {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export interface TrackListData {
  seeds: [];
  tracks: TrackData[];
}

export interface UserProfileData {
  id: string;
}

export interface PlaylistData {
  id: string;
  external_urls: {spotify: String};
}

export interface ChosenTopItemData {
  id: string;
  artistName: string;
}

export interface TrackData {
  uri: string
}

export interface SliderData {
  id: string;
  title: string;
  range: number[];
  rangeLabels: string[];
}