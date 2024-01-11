'use client'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styles from './DetailClient.module.scss'

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
    <div className={styles.container}>
      <h2 className={styles[`area-name`]}>
        { info[0]?.stdRestNm }
      </h2>

      <p className={styles.addr}>
        { info[0]?.svarAddr }
      </p>

      <div className={styles[`box-wrapper`]}>
        {
          info.map(({
            psCode, psDesc, psName,
            stime, etime,
          })=>(
            <div className={styles.box} key={psCode}>
              <p className={styles.name}>{psName} ({psCode}) </p>
              <p className={styles.desc}>{psDesc}</p>
              <p className={styles.time}>이용시간 : {stime} - {etime}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DetailClient