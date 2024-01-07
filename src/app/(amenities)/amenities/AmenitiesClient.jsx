'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from './AmenitiesClient.module.scss'
import Sidebar from '@/layout/sidebar/Sidebar';
import Pagination from '@/components/pagination/Pagination';
import SearchForm from '@/components/form/searchForm';

const AmenitiesClient = () => {

  // 전체 정보 저장
  const [allHighwayInfo, setAllHighwayInfo] = useState([]);

  // 필터링된 정보 저장
  const [displayedHighwayInfo, setDisplayedHighwayInfo] = useState([]);

  // 한 페이지 당 보여지는 개수
  const [productsPerPage, setProductsPerPage] = useState(7);

  // 현재 페이지
  const [currentPage, setCurrentPage] = useState(1);

  // 다음 페이지의 1번
  const indexOfLastProduct = currentPage * productsPerPage;

  // 현재 페이지의 1번
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // 현재 보여지는 정보들
  const currentProducts = displayedHighwayInfo.slice( indexOfFirstProduct, indexOfLastProduct )

  // 정보 가져올 URL
  const url = "https://data.ex.co.kr/openapi/restinfo/hiwaySvarInfoList?key=test&type=json&svarGsstClssCd=0";


  // 휴게소 정보 저장
  // svarGsstClassCd = 0:휴게소 1:주유소
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
      setAllHighwayInfo(temp);
      setDisplayedHighwayInfo(temp);
    } 
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getHighwayInfo();
  }, [])

  return (
    <div className={styles.container}>

      <div>
        <Sidebar 
          allHighwayInfo={allHighwayInfo}
          setDisplayedHighwayInfo={setDisplayedHighwayInfo}
          setCurrentPage={setCurrentPage}
        />
      </div>
      
      <div className={styles.content}>
        <SearchForm 
          allHighwayInfo={allHighwayInfo}
          setDisplayedHighwayInfo={setDisplayedHighwayInfo}
        />

        <table>
          <thead>
            <tr>
              <th>휴게소 명</th>
              <th>주소</th>
            </tr>
          </thead>
          <tbody>
            {
              currentProducts.map(({svarCd, svarNm, svarAddr})=>(
                <tr className={styles.trBody} key={svarCd}>
                  <td>{svarNm}</td>
                  <td className={styles.addr}>{svarAddr}</td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <Pagination 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalLength = {displayedHighwayInfo.length}
          productsPerPage={productsPerPage}
        />
      </div>

    </div>
  )
}

export default AmenitiesClient