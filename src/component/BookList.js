import React, { useContext, useEffect, useState } from 'react';
import {collection, deleteDoc, doc, getDocs, orderBy, query, where} from 'firebase/firestore';
import { auth, db } from '../../firebase-config';
import { userContext } from '../../context/userContext';
import Link from 'next/link';
import dayjs from "dayjs";
import Loadingbar from './Loadingbar';
import 'dayjs/locale/ko';

dayjs.locale('ko');


const BookList = ({ setUpDataOrList, setItemDelete, setBookId, buttonState}) => {

  const {isAuth} = useContext(userContext);

  const [bookLists, setBookLists] = useState([]);
  const [loading, setLoading] = useState(true);

  // const booksCollectionRef = collection(db, 'books')
  
  // useEffect(()=>{
  //   const getBooks = async () => {
  //     const data = await getDocs(booksCollectionRef)
  //     setBookLists(data.docs.map((doc)=> ({...doc.data(), id: doc.id})))
  //   }
  //   getBooks();
  // },[])


  const getMyBooks = async() =>{
    // if(auth.currentUser){
      // 위 코드는 필터링을 위해 auth.current를 받아와야하는데 이게 데이터를 불어오는 데 시간이 걸려 오류를 일으켜서 작성한 것이다.
      const uid = localStorage.getItem('uid')
      // 위 코드는 강제로 새로고침 된 상황에서도 local에 저장된 아이디를 통해서 uid를 받아와 필터를 할 수 있게해줌
      const q = query (collection(db, 'books'),  where('author.id', '==', uid), orderBy('createdAt', "desc"));
      // const q = query (collection(db, 'books'));
      // // 위 코드에서 ,where 이후 부분은 정렬과 필터링 기능구현인데 firebase 색인 기능으로 구현을 해서 그냥 db만 받아오면 됨
      // const q = query (collection(db, 'books'));
      const querySnapshot = await getDocs(q);
      // querySnapshot.forEach((doc)=>{
      //   console.log(doc.id,'=>',doc.data());
      // })
      const data = querySnapshot.docs.map((doc)=>({...doc.data(), id: doc.id}))
      setBookLists(data.filter(element => element.status === buttonState))
      // console.log(bookLists.filter(element => element.status === buttonState))
      // console.log('다 완료됨')
      setLoading(false);
    // }
  }
  useEffect(()=>{
      return getMyBooks();
  },[buttonState])



  const deleteBook = async (id) => {
    // alert에 title을 받아오기 위한 로직
    // console.log(id)
    const isId = (element) => {
      if(element.id === id){
        return true;
      }
    }
    // console.log(isId)
    // confirm은 alert인데 반환값이 있고 그 값이 true 또는 false 인 것
    // find 함수를 사용하여 해당 id의 데이터 모두를 받아옴
    const returnValue = confirm(`'${bookLists.find(isId).title}' 을 삭제하시겠습니까?`)
    // alert(returnValue);
    if(returnValue){
      const bookDoc = doc(db, "books", id)
      await deleteDoc(bookDoc);
      console.log('삭제됨')
      setUpDataOrList(false);
      setUpDataOrList(true);
    } else {
      // 페이지 렌더링 없이 컴포넌트만 업데이트 하기 위해
      // setUpDataOrList(false);
      // setUpDataOrList(true);
    }
  }
  // console.log(bookLists)
  

  return (
    <>
      {loading 
      ? 
      (<div><Loadingbar/></div>) 
      : 
      (<div>{bookLists?.length !== 0 
      ? 
      <>
        <div  className="row">
      {bookLists.map((book)=>{
        // D day 계산용 코드
        let data1 = dayjs(book?.mayEndBook,'YYYY-MM-DD')
        let data2 = dayjs(book?.startBook, 'YYYY-MM-DD')
        // data1.format('YYYY-MM-DD');
        // data2.format('YYYY-MM-DD');
        let result = data1.diff(data2,'day',true);
        let d_day = Math.floor(result);

        // 독서 기간 계산용 코드
        let booktime = Math.floor(dayjs().diff(data2,'day',true));

        // 목표 성공 여부 계산용 코드
        let endBookTime = dayjs(book?.EndBook,'YYYY-MM-DD');
        let isSuccess = Math.floor(data1.diff(endBookTime,'day',true));

        // 완독률 계산 코드
        let readingRate = Math.round((book?.pageNow/book?.bookTotalPagesNumber)*100)

        // 수정 시간 해독 코드
        let time = dayjs(book.createdAt.toDate());
        let koTime = time.format("YY.MM.DD HH:mm")

        // bookMemo 값 내부의 태그를 제거하고 text만 빼오고 줄바꿈을 제거한다
        let newText = book?.bookMemo.replace(/(<([^>]+)>)/ig,"");
        let resetMemo = newText.split('\n').join('')

        return (

          // isAuth && book.author.id === auth.currentUser.uid && (
            // auth.currentUser.uid 는 현재 로그인 된 유저의 id;
            // book.author.id 는 저장된 책 목록을 작성한 유저의 id;
            <div key={book.id} className="col-xl-6">
              <div className="card text-dark bg-light mb-3" style={{maxWidth: '540px'}}>
                <div className="row g-0">
                  <div className="col-md-4 col-4" style={{margin:'1px auto 1px'}} >
                   {/* 책 커버 이미지 필수 */}
                    <img src={book.fileImage} className="img-fluid rounded-start " alt="..." />
                  </div>
                  <div className="col-md-8">
                    <div className="mx-2 my-2">
                      {/* 책 제목 필수 */}
                      <h5 className="card-title text-truncate">{book.title}</h5>
                      <div style={{display: 'flex', justifyContent:"space-between"}}>
                      {/* 책 작가 필수 */}
                      <h6 className="card-subtitle mb-1 text-muted text-truncate">{book.writer}</h6>
                      {/* 책 카테고리 필수 */}
                      <span className="card-subtitle mb-1 text-muted" style={{backgroundColor:'rgba(0,255,0,0.5)'}}>
                        {book.category}
                      </span>
                    </div>
                    {/* 책 메모 내용 관심 */}
                    <div className="card-text text-truncate">
                      {book.status === "관심" && `${resetMemo} ` }
                      {/* 책 독서 기간 읽는 중, 완독 */}
                      {book.status !== "관심" && <div>독서기간 : {booktime} 일</div>}
                        {/* 책 완독 예정 일 읽는 중 */}
                      {book.status === "읽는중" &&                         
                        <div>완독예정일 : {
                          d_day > 0 ? (`목표보다 ${d_day}일이 지났어요ㅠ`) 
                          : 
                          d_day === 0 ? ('목표 당일 이에요') 
                          : 
                          (`목표가 ${d_day}일 남았어요`)
                        }</div>
                      }
                      {/* 책 완독률 읽는 중 */}
                      {book.status === '읽는중' && <div>완독률 : {readingRate} %</div>}
                      {/* 책 완독 일 완독 */}
                      {book.status === '완독' && <div>완독일 : {book?.endBook}</div>}
                      {/* 책 목표 성공 여부 완독 */}
                      {book.status === '완독' && <div>목표 성공 여부 : {isSuccess >= 0 ? '성공!' : '실패ㅠ'}</div>}
                    </div>
                    {/* 구매하기 버튼 관심 */}
                    {book.status === '관심' &&                       
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      {book?.bookLink && 
                      <Link href={book.bookLink}>
                        <button type="button" className="btn btn-outline-dark btn-sm">
                          구매 하기 💸
                         </button>
                      </Link>
                      }
                      {/* 책 삭제 버튼 관심 */}
                      <button onClick={()=>{deleteBook(book.id)}} type="button" className="btn btn-outline-dark btn-sm">
                        삭제 🔥
                      </button>
                    </div>
                    }
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      {/* 책 상세 보기 버튼 읽는 중, 왁독 */}
                      {book.status !== "관심" && 
                      <Link href={`/detail/${book.id}`}>
                        <button type="button" className="btn btn-outline-dark btn-sm"
                          // onClick={()=>{
                          //   setItemDelete(true)
                          //   setBookId(book.id)
                          //   setUpDataOrList(false)
                          // }}
                          >
                        상세 📝
                        </button>
                      </Link>
                      }
                    </div>
                    {/* 도서 상태, 정보 변경 버튼 관심, 읽는 중, 왁독 */}
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <small className="text-muted">도서 상태, 정보 변경 :</small>
                      <Link href={`/create/${book.id}`}>
                      <button type="button" className="btn btn-outline-dark btn-sm mt-1"
                        // onClick={()=>{ setUpDataOrList(false); setBookId(book.id)}}  
                      >
                      {book.status} 🔧
                      </button>
                      </Link>
                    </div>

                    <div className="card-footer bg-transparent border-light ">
                    {/* 수정일 필수 */}
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <small className="text-muted text-truncate">마지막 수정일 : {koTime}</small>
                    </div>  
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
          </div>

      </>
      : <h1 style={{margin:'20%'}}> 아직 {buttonState} 도서📔가 없어요 😂</h1>
      }</div>)}








      {/* <div className="row">
        <div className="col-xl-6">
          <div className="card text-dark bg-light mb-3" style={{maxWidth: '540px'}}>
            <div className="row g-0">
              <div className="col-md-4 col-4" >
                <img src="http://image.yes24.com/goods/99534783/XL" className="img-fluid rounded-start " alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">필수! 제목</h5>
                  <div style={{display: 'flex', justifyContent:"space-between"}}>
                  <h6 className="card-subtitle mb-1 text-muted">필수! 작가</h6>
                  <span className="card-subtitle mb-1 text-muted" style={{backgroundColor:'rgba(0,255,0,0.5)'}}>
                    필수! 카테고리
                  </span>
                </div>
              <div className="card-text">도서 메모 내용 : 이거 살거야 (관심)
                <br/><span>독서기간  : 55일 (읽는 중, 완독)</span>
                <br/><span>완독예정일 : D-20 (읽는 중)</span>
                <br/><span>완독률 : 77% (읽는 중)</span>
                <br/><span>완독일 : 2022-2-22 (왁독)</span>
                <br/><span>목표 성공 여부 : 성공 (왁독)</span>
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" className="btn btn-outline-dark btn-sm">
                  구매하기 (관심)
                </button>
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <small className="text-muted">
                  도서 상태, 정보 변경 :
                </small>
                <button type="button" className="btn btn-outline-dark btn-sm" >
                  관심 (관심, 읽는중, 완독)
                </button>
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <small className="text-muted">
                  수정일 2022-02-28 12:11 (관심, 읽는중, 완독)
                </small>
                <button type="button" className="btn btn-outline-dark btn-sm">
                  삭제(관심)
                </button>
                <button type="button" className="btn btn-outline-dark btn-sm">
                  상세(읽는중, 왁독)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div> */}



{/* 
      <h4>this is BookList component</h4>
      {loading ? (<div><Loadingbar/></div>) 
      : 
      (<div>{bookLists?.length !== 0 
      ? 
      <>{bookLists.map((book)=>{ */}

{/* // D day 계산용 코드
        let data1 = dayjs(book?.mayEndBook,'YYYY-MM-DD')
        let data2 = dayjs(book?.startBook, 'YYYY-MM-DD')
        // data1.format('YYYY-MM-DD');
        // data2.format('YYYY-MM-DD');
        let result = data1.diff(data2,'day',true);
        let d_day = Math.floor(result);

        // 독서 기간 계산용 코드
        let booktime = Math.floor(dayjs().diff(data2,'day',true));

        // 목표 성공 여부 계산용 코드
        let endBookTime = dayjs(book?.EndBook,'YYYY-MM-DD');
        let isSuccess = Math.floor(data1.diff(endBookTime,'day',true)); */}

{/* return (
          
          // isAuth && book.author.id === auth.currentUser.uid && (
            // auth.currentUser.uid 는 현재 로그인 된 유저의 id;
            // book.author.id 는 저장된 책 목록을 작성한 유저의 id;
          <div key={book.id}>
            <div>제목 : {book.title}</div>
            <div>작가 : {book.writer}</div>
            {book?.fileImage &&             
            <Image
            loader={book?.fileImage}
            alt="책 표지 이미지"
            src={book?.fileImage}
            width={200} 
            height={300}
            unoptimized
            />}
            <div>카테고리 : {book?.category}</div>
            <div>전체 페이지 수 : {book?.bookTotalPagesNumber}쪽</div>
            <div>{book?.bookMemo}</div>
            {buttonState !== "관심" && 
              <>
                <div>독서 시작 일 : {book?.startBook}</div>
                {buttonState !== '완독' && <>
                <div>독서 기간 : {booktime} 일</div>
                <div>현재 페이지 : {book?.pageNow}쪽</div>
                <div>남은 페이지 : {Number(book?.bookTotalPagesNumber)-Number(book?.pageNow)}쪽</div>
                  <div>완독 예정 일 : {book?.mayEndBook}</div>
                  <div>{
                    d_day > 0 ? (`목표보다 ${d_day}일이 지났어요ㅠ`) 
                    : 
                    d_day === 0 ? ('목표 당일 이에요') 
                    : 
                    (`목표가 ${d_day}일 남았어요`)}
                  </div>
                </>
                }
                
              {buttonState === "완독" && 
                <>
                  <div>완독 일 : {book?.endBook}</div>
                  <div>목표 성공 여부 : {isSuccess >= 0 ? '성공!' : '실패'}</div>
                </>
              }
              </>
            }
            {book?.bookLink && <Link href={book.bookLink}><button>구매하러 가기</button></Link>}
            <button onClick={()=>{deleteBook(book.id)}}>삭제</button> */}
            
{/* 
            <button onClick={()=>{
              setItemDelete(true)
              setBookId(book.id)
              setUpDataOrList(false)
            }}>상 세</button>

            <p>도서 상태, 정보 변경 : 
              <button onClick={()=>{
                setUpDataOrList(false);
                setBookId(book.id)
              }}>  {book?.status}
              </button>
            </p>
            <br/>
            </div>
          // )
        )
      })}
      </>
      : <div>아직 {buttonState} 도서가 없어요</div>
      }</div>)} */}
      


      
      {/* {bookLists.map((book)=>{
        return (
          isAuth && book.author.id === auth.currentUser.uid && (
            // auth.currentUser.uid 는 현재 로그인 된 유저의 id;
            // book.author.id 는 저장된 책 목록을 작성한 유저의 id;
          <div key={book.id}>
            <div>{book.title}</div>
            <div>{book.writer}</div>
            <h5>@{book.author.name}</h5>
            <button onClick={()=>{deleteBook(book.id)}}>삭제</button>
            <p>도서 상태, 정보 변경 : <button onClick={()=>{setUpDataOrList(false)}}>{book?.status}</button></p>
            
            <br/>
          </div>
          )
        )
      })} */}
    </>
  )
}

export default BookList