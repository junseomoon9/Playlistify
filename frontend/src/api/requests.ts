import axios from "axios";

const spotify_accounts_url = "https://accounts.spotify.com/";
const spotify_api_url = "https://api.spotify.com/v1/";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

interface AuthenticationResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

interface trackList {
  seeds: []
  tracks: []
}

export const getAccessToken = (
  payload: any
): Promise<AuthenticationResponse> => {
  const authorizationHeader = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

  return axios.post(spotify_accounts_url + "api/token", null, {
      params: {
        grant_type: "authorization_code",
        code: payload.code,
        redirect_uri: REDIRECT_URI,
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Basic ` + authorizationHeader,
      },
    })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      throw err
    });
};

export const getTopItems = (payload: any): Promise<any[]> => {
  return axios.get(spotify_api_url + "me/top/" + payload.type, {
      params: {
        time_range: "short_term",
      },
      headers: {
        Authorization: `Bearer ` + payload.access_token,
      },
    })
    .then((res) => {
      // Randomly chooses 5 artists from total list
      let arr = []
      let artist_arr = res.data.items
      for (let i = 0; i < 5; i++) {
        let length = artist_arr.length
        let index = Math.floor(Math.random() * length)
        arr.push(artist_arr[index])
        artist_arr.splice(index, 1)
      }
      return arr
    })
    .catch((err) => {
      throw err
    })
};

export const getRecommendations = (payload: any): Promise<trackList> => {
  // Convert array of seed artists into a string, each artists separated by a comma
  const seed_artists = payload.seed_artists;
  let seed_artists_str = seed_artists.join();

  return axios.get(spotify_api_url + "recommendations", {
      params: {
        seed_artists: seed_artists_str,
      },
      headers: {
        Authorization: `Bearer ` + payload.access_token,
      },
    })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      throw err
    })
}