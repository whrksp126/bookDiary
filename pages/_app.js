import '../styles/globals.css'
import {useEffect, useState} from 'react'
import {userContext} from '../context/userContext';
import 'bootstrap/dist/css/bootstrap.css';
import Head from 'next/head';
function MyApp({ Component, pageProps }) {
  const [isAuth, setIsAuth] = useState(null);

  return (
    <userContext.Provider value={{isAuth, setIsAuth}}>
      <Component {...pageProps} />
    </userContext.Provider>
  )
}

export default MyApp
