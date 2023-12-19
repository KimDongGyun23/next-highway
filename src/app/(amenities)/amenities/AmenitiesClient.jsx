'use client'
import axios, { all } from 'axios';
import React, { useEffect, useState } from 'react'
import styles from './AmenitiesClient.module.scss'
import Sidebar from '@/layout/sidebar/Sidebar';
import { IoSearchSharp } from "react-icons/io5";

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
  
  console.log(displayedHighwayInfo);

  useEffect(() => {
    getHighwayInfo();
  }, [])


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
              displayedHighwayInfo.map(({svarCd, svarNm, svarAddr})=>(
                <tr className={styles.trBody} key={svarCd}>
                  <td>{svarNm}</td>
                  <td className={styles.addr}>{svarAddr}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

    </div>


  )
}

export default AmenitiesClient