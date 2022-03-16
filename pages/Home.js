import React, { useContext, useEffect, useRef } from 'react'
import Center from '../src/component/Center'
import Footer from '../src/component/Footer'
import Top from '../src/component/Top'
import { useRouter } from 'next/router';
import { userContext } from '../context/userContext';

const Home = () => {
  const {isAuth, setIsAuth} = useContext(userContext);
  // console.log(isAuth)
  const router = useRouter();

  const isMounted = useRef(true);

  const setHomeUseEffect = () => {
    setIsAuth(JSON.parse(localStorage.getItem('isAuth')));
    // console.log(JSON.parse(localStorage.getItem('isAuth')))
    // console.log(isAuth)
    // console.log('!isAuth',!isAuth)
    // console.log('isMounted.current',isMounted.current)
    if( !isAuth && isMounted.current){
      router.push('/Login');
    }
  }

  useEffect(()=>{
    setIsAuth(JSON.parse(localStorage.getItem('isAuth')));
    setHomeUseEffect();
    // console.log('Home.useEffect가 실행됨' ,isAuth)
    return () => {
      isMounted.current = false
    }
  },[isAuth])


  // useEffect(()=>{
  //   setIsAuth(JSON.parse(localStorage.getItem('isAuth')));  
    
  //   if(!isAuth){
  //     router.push('/Login');  
  //   }

  // },[])


  return (
    <>
      <div className="my-0 mx-0">
        <div className="container">

        <Top />
        <Center isAuth={isAuth} />
        <Footer setIsAuth={setIsAuth} />     
        </div>
      </div>
 
    </>
  )
}

export default Home