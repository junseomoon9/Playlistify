import axios from "axios";

const spotify_url = "https://accounts.spotify.com/";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

interface AuthenticationResponse {
  access_token: string,
  expires_in: number,
  refresh_token: string,
  scope: string,
  token_type: string
}

export const getAccessToken = (payload: any): Promise<AuthenticationResponse> => {
  const authorizationHeader = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

  return new Promise((resolve, reject) => {
    axios
      .post(spotify_url + "api/token", null, {
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
