'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from './AmenitiesClient.module.scss'
import Sidebar from '@/layout/sidebar/Sidebar';
import { IoSearchSharp } from "react-icons/io5";
import Pagination from '@/components/pagination/Pagination';

const AmenitiesClient = () => {
  const [allHighwayInfo, setAllHighwayInfo] = useState([]);
  const [displayedHighwayInfo, setDisplayedHighwayInfo] = useState([]);

  const limitNum = 7;

  // 휴게소 정보 저장
  const getHighwayInfo = async () => {
    try {

      // svarGsstClassCd = 0:휴게소 1:주유소 
      const res = await axios.get("https://data.ex.co.kr/openapi/restinfo/hiwaySvarInfoList?key=test&type=json&svarGsstClssCd=0");
      setAllHighwayInfo(res.data.list);
      setDisplayedHighwayInfo(filterDisplayedHighwayInfo(res.data.list))
    } 
    catch (error) {
      console.log(error);
    }
  }

  // limitNum 만큼 displayedHighwayInfo에 추가
  function filterDisplayedHighwayInfo(allInfo, displayedHighwayInfo = []){
    const limit = displayedHighwayInfo.length + limitNum;

    // limitNum 만큼 더 가져오기
    const array = allInfo.filter((_, index)=> index+1 <= limit)
    
    return array;
  }
  
  // console.log(displayedHighwayInfo);

  useEffect(() => {
    getHighwayInfo();
  }, [])


  // 현재 페이지
  const [currentPage, setCurrentPage] = useState(1);
  // 한 페이지 당 보여지는 개수
  const [productsPerPage, setProductsPerPage] = useState(7);

  // 다음 페이지의 1번
  const indexOfLastProduct = currentPage * productsPerPage;
  // 현재 페이지의 1번
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = allHighwayInfo.slice( indexOfFirstProduct, indexOfLastProduct ) 

  return (
    <div className={styles.container}>

      <div>
        <Sidebar />
      </div>
      
      <div className={styles.content}>
        <form>
          <input 
            type='text'
          />
          <button type='submit'><IoSearchSharp /></button>
        </form>

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
          totalLength = {allHighwayInfo.length}
          productsPerPage={productsPerPage}
        />
      </div>

    </div>


  )
}

export default AmenitiesClient