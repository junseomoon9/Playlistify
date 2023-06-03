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

export const getAccessToken = (
  payload: any
): Promise<AuthenticationResponse> => {
  const authorizationHeader = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

  return new Promise((resolve, reject) => {
    axios
      .post(spotify_accounts_url + "api/token", null, {
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
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
 
export const getTopItems = (payload: any): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    axios.get(spotify_api_url + "me/top/" + payload.type, {
      params: {
        time_range: "short_term",
      },
      headers: {
        Authorization: `Bearer ` + payload.access_token,
      },
    }).then((res) => {
      let arr = []
      let artist_arr = res.data.items
      for (let i = 0; i < 5; i++) {
        let length = artist_arr.length
        let index = Math.floor(Math.random() * length)
        arr.push(artist_arr[index])
        artist_arr.splice(index, 1)
      }
      resolve(arr)
    }).catch((err) => {
      reject(err)
    })
  })
};
