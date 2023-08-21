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
  id: string
}

export interface TrackData {
  uri: string
}