'use client'
import axios from 'axios';
import React from 'react'
import styles from './AmenitiesClient.module.scss'
import Sidebar from '@/layout/sidebar/Sidebar';

const AmenitiesClient = () => {

  const handleClick = async ()=>{

    // 총 고속도로 수 = count 변수에 저장됨
    // const res = await axios.get("https://data.ex.co.kr/openapi/restinfo/restBrandList?key=test&type=json&numOfRows=10&pageNo=1");
    const res = await axios.get("https://data.ex.co.kr/openapi/restinfo/hiwaySvarInfoList?key=test&type=json");
    console.log(res.data);
  }

  return (
    
    // <button onClick={handleClick}>클릭</button>


    <div className={styles.container}>

      <div>
        <Sidebar />
      </div>
      
      <div>
        <form>
          <input />
          <button type='submit'></button>
        </form>

        <div>
          list
        </div>
      </div>

    </div>


  )
}

export default AmenitiesClient