'use client'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const DetailClient = () => {
  const [info, setInfo] = useState([]);

  const { id } = useParams();

  // const url = `https://data.ex.co.kr/openapi/restinfo/hiwaySvarInfoList?key=test&type=json&svarCd=${id}`


  const url2 = `https://data.ex.co.kr/openapi/restinfo/restConvList?key=test&type=json&numOfRows=10&pageNo=1&stdRestCd=${id}`

  const getInfo = async () => {
    // const res = await axios.get(url);
    const res2 = await axios.get(url2);
    console.log(res2.data.list);
    setInfo(res2.data.list);

  }

  useEffect(()=>{
    getInfo();
  },[])


  return (
    <>
      <h2>{ info[0]?.stdRestNm }</h2>
      <p>{ info[0]?.svarAddr }</p>
      {
        info.map(({
          psCode, psDesc, psName,
          stime, etime,
        })=>(
          <div key={psCode}>
            <br/>
            <p>이름 : {psName} ({psCode}) </p>
            <p>부가설명 : {psDesc}</p>
            <p>이용시간 : {stime} - {etime}</p>
          </div>
        ))
      }
    </>
  )
}

export default DetailClient