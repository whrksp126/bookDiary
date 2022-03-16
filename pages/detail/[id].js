import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase-config'
import BookDetail from '../../src/component/BookDetail'
import Head from 'next/head';

const Post = ({data}) => {
  const soData = JSON.parse(data)
  const router = useRouter()
  const bookId = router.query.id
  console.log(router.isFallback)
  // console.log(res)

  // const [itemDetailData, setItemDeleteData] = useState([])

  // // bookdata 불러오기
  // const getId  = async () => {
  //   const docRef = doc(db, 'books', bookId);
  //   const docSnap = await getDoc(docRef);
  //   if(docSnap.exists()){
  //     const idBookData = docSnap.data()
  //     // 불러온 데이터 state로 관리하기
  //     setItemDeleteData(idBookData);
  //   }else{
  //     console.log('그런 문서가 없습니다!')
  //   }}
  //   console.log('데이터가 다 호출됨',itemDetailData)

  //   useEffect(()=>{
  //     if(bookId !== undefined){
  //     getId();
  //   }
  //   },[bookId])

  return (
    <>
    {/* <div>테스트: {soData.title}</div> */}
    {bookId &&
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>{soData.title}</title>
        <meta name="title" content={soData.title}></meta>
        <meta name="writer" content={soData.writer}></meta>
      </Head>
      <div className="container mt-5">
      <BookDetail bookId={bookId} soData={soData}/>
      </div>
    </>
    }
    </>
  )
}
 

// This gets called on every request
  export async function getServerSideProps(context) {
    const testBookId = context.params.id
    const docRef = doc(db,'books', testBookId)
    const docSnap = await getDoc(docRef);
    const firestoreData =  docSnap.data();
    const data = JSON.stringify(firestoreData)
    
    return { 
      props: {
        data
      }
    }
  }


export default Post

