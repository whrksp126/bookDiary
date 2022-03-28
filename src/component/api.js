import axios from 'axios';

const Kakao = axios.create({
  baseURL: 'https://dapi.kakao.com', // 공통 요청 경로를 지정해준다.
  headers: {
    Authorization: 'KakaoAK c667eb109c12a442e07a3ddc6c69d1c2',
  },
});

// search book api
export const bookSearch = (params) => {
  return Kakao.get('/v3/search/book', { params });
};
