'use client'
import axios from 'axios';
import React, { useEffect } from 'react'
import styles from './InfoList.module.scss'
import Pagination from '@/components/pagination/Pagination';
import SearchForm from '@/components/form/SearchForm';
import { useRouter } from 'next/navigation';
import Sidebar from '@/layout/sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ALL_INFO, selectCurrentPage, selectFilteredInfo, selectInfoPerPage } from '@/redux/slice/infoSlice';

const InfoList = ({ num }) => {

  const router = useRouter();
  const dispatch = useDispatch();

  const filteredInfo = useSelector(selectFilteredInfo);
  const infoPerPage = useSelector(selectInfoPerPage);
  const currentPage = useSelector(selectCurrentPage);
  
  // 현재 페이지 url
  const currentUrl = typeof window !== 'undefined' ? window.location.pathname : '';


  // 현재 페이지와 다음 페이지의 첫 번째 인덱스 계산
  const firstIndexOfNextPage = currentPage * infoPerPage;
  const firstIndexOfCurrentPage = firstIndexOfNextPage - infoPerPage;

  // 현재 페이지에 보여지는 정보
  const currentProducts = filteredInfo.slice( firstIndexOfCurrentPage, firstIndexOfNextPage )

  // 정보 가져올 URL - svarGsstClassCd => 0:휴게소  1:주유소
  const url = `https://data.ex.co.kr/openapi/restinfo/hiwaySvarInfoList?key=test&type=json&svarGsstClssCd=${num}`;


  // 모든 데이터 저장
  const getHighwayInfo = async () => {
    try {
      const res = await axios.get(url);
      dispatch(SET_ALL_INFO(res));
    } 

    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getHighwayInfo();
  }, [])

  const handleClick = (svarCd) => {
    router.push(`${currentUrl}-details/${svarCd}`);
  }

  return (
    <div className={styles.container}>

      <div>
        <Sidebar/>
      </div>

      <div className={styles.content}>
        <SearchForm />

        <table>
          <thead>
            <tr>
              <th>{ num === 0 ? '휴게소 명' : '주유소 명'}</th>
              <th>주소</th>
            </tr>
          </thead>
          <tbody>
            {
              currentProducts.map(({svarCd, svarNm, svarAddr})=>(
                <tr 
                  className={styles.trBody} 
                  key={svarCd}
                  onClick={()=>handleClick(svarCd)}
                >
                  <td>{svarNm}</td>
                  <td className={styles.addr}>{svarAddr}</td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <Pagination />
      </div>
    </div>
  )
}

export default InfoList