'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from './InfoList.module.scss'
import Pagination from '@/components/pagination/Pagination';
import SearchForm from '@/components/form/searchForm';
import { useRouter } from 'next/navigation';
import Sidebar from '@/layout/sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ALL_INFO, selectAllHighwayInfo, selectCurrentPage, selectDisplayedInfo, selectInfoPerPage } from '@/redux/slice/infoSlice';

const InfoList = ({ num }) => {
  
  const router = useRouter();
  const dispatch = useDispatch();

  // 전체 정보 저장
  const allHighwayInfo = useSelector(selectAllHighwayInfo);

  // 필터링된 정보 저장
  const displayedInfo = useSelector(selectDisplayedInfo);

  // 현재 페이지
  const currentPage = useSelector(selectCurrentPage);
  
  // 현재 페이지 url
  const currentUrl = typeof window !== 'undefined' ? window.location.pathname : '';
  
  // 한 페이지 당 보여지는 개수
  const infoPerPage = useSelector(selectInfoPerPage);

  // 다음 페이지의 1번
  const indexOfLastProduct = currentPage * infoPerPage;

  // 현재 페이지의 1번
  const indexOfFirstProduct = indexOfLastProduct - infoPerPage;
  
  // 현재 보여지는 정보들
  const currentProducts = displayedInfo.slice( indexOfFirstProduct, indexOfLastProduct )

  // 정보 가져올 URL
  // svarGsstClassCd = 0:휴게소 1:주유소
  const url = `https://data.ex.co.kr/openapi/restinfo/hiwaySvarInfoList?key=test&type=json&svarGsstClssCd=${num}`;


  // 휴게소 정보 저장
  const getHighwayInfo = async () => {
    try {
      const res = await axios.get(url);
      
      // 문자 정렬
      const temp = res.data.list.sort((a, b) => {
        const nameA = a.svarNm;
        const nameB = b.svarNm;
      
        if (nameA < nameB) { return -1; }
        if (nameA > nameB) { return 1; }
        return 0; // 같은 경우 유지
      });

      dispatch(SET_ALL_INFO(temp));
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