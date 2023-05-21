import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getAccessToken } from "../api/requests";
import "./AuthorizationCallbackPage.css";

export const AuthorizationCallbackPage = () => {
  let navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const [cookies, setCookie] = useCookies(['access-token', 'refresh-token']);

  const authenticate = async (auth_code: string) => {
    try {
      const data = await getAccessToken({ code: auth_code });

      let expires = new Date()
      expires.setTime(expires.getTime() + (data.expires_in * 1000))
      setCookie('access-token', data.access_token, {path: "/", expires: expires})
      setCookie('refresh-token', data.refresh_token, {path: "/"}) // TODO: Need expires here?
 
      navigate("/app", { replace: true });
    } catch (err) {
      // Todo
      // navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    const auth_code = searchParams.get("code");
    if (auth_code !== null) {
      authenticate(auth_code);
    }
  });

  return <div>AuthorizationCallbackPage</div>;
};
