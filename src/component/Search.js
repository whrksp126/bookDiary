// import React, { useEffect, useState } from 'react'
// import { bookSearch } from './api';
// import Link from 'next/link';

// const Search = () => {

//   const [searchText, setSearchText] = useState('');
//   const [searchBookData, setSearchBookData] = useState(null);

//   const onSearchButton = (e) => {
//     e.preventDefault();
//     if(searchBookData !== ''){
//       console.log('실행됨')
//       console.log(searchBookData)
//       bookSearchHandler();
//     }
//   }
//   const bookSearchHandler = async () => {
//     const params = {
//       query: searchText,
//     }
//     const {data} = await bookSearch(params)
//     .catch((error)=>{
//       console.log(error.message)
//     });
//     setSearchBookData(data.documents);
//   }

//   // 도서 검색에 값이 없으면 이전 검색 데이터를 지워 줌
//   useEffect(()=>{
//     if(searchText === ''){
//       setSearchBookData(null)
//     }
//   },[searchText])

//   const getBookData = (book) => {
//     console.log(book.title)
//   }
  

//   return (
//     <div style={{margin :"0px 8px"}}>
//       <form className="row" onSubmit={onSearchButton}>
//         <div className="col-12" style={{marginBottom:'10px'}}>
//           <input 
//             value={searchText} 
//             onChange={(e)=>{
//               setSearchText(e.target.value)
//             }}
//             required 
//             type="text" 
//             className="form-control" 
//             placeholder="도서 제목을 입력해 주세요..."
//           />
//         </div>
//       </form>    
//       <div>
//         <div className="row"> 
//         {searchText !== ''  && searchBookData?.map((book)=>
//             <div key={book.isbn} className="col-xl-6">
//               <div className="card text-dark bg-light mb-3" style={{maxWidth: '540px'}}>
//                 <div className="row g-0">
//                   <div className="col-md-4 col-4" style={{margin:'1px auto 1px'}} >
//                    {/* 책 커버 이미지 필수 */}
//                     <img src={book.thumbnail} className="img-fluid rounded-start " alt="..." />
//                   </div>
//                   <div className="col-md-8">
//                     <div className="mx-2 my-2">
//                       {/* 책 제목 필수 */}
//                       <h5 className="card-title text-truncate">{book.title}</h5>
//                       <div style={{display: 'flex', justifyContent:"space-between"}}>
//                       {/* 책 작가 필수 */}
//                       <h6 className="card-subtitle mb-1 text-muted text-truncate">{book.authors[0]}</h6>
//                     </div>
//                     {/* 구매하기 버튼 관심 */}
//                     <div className="d-grid gap-2 d-md-flex justify-content-md-end">
//                       <a target='_blank' href={book.url} rel='noreferrer'>
//                         <button type="button" className="btn btn-outline-dark btn-sm">
//                           구매 하기 💸
//                          </button>
//                       </a>
//                       <button type="button" className="btn btn-outline-dark btn-sm" onClick={(book)=>{getBookData(book)}}>
//                         도서 정보 받아오기 🔖
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//     )}
//     </div>
//     </div>

    
//     </div>
//   )
// }

// export default Search