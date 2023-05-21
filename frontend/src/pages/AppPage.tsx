import React, {useEffect} from 'react'
import { useCookies } from "react-cookie";

export const AppPage = () => {

  const [cookies] = useCookies(['access-token', 'refresh-token']);

  useEffect(() => {
    // console.log(cookies)
  })

  return (
    <div>AppPage</div>
  )
}
