'use client'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styles from './DetailClient.module.scss'
import Button from '@/components/button/Button'

const DetailClient = () => {
  const [info, setInfo] = useState([]);
  const [brandInfo, setBrandInfo] = useState([]);

  const { id } = useParams();
  const router = useRouter();

  const url = `https://data.ex.co.kr/openapi/restinfo/restConvList?key=test&type=json&numOfRows=10&pageNo=1&stdRestCd=${id}`

  const brandUrl = `https://data.ex.co.kr/openapi/restinfo/restBrandList?key=test&type=json&numOfRows=50&pageNo=1&stdRestCd=${id}`

  const getInfo = async () => {
    const res = await axios.get(url);
    const brandRes = await axios.get(brandUrl);
    setInfo(res.data.list);
    setBrandInfo(brandRes.data.list);
  }

  useEffect(()=>{
    getInfo();
  },[])


  return (
    <div className={styles.container}>
      {
        info.length === 0 ?
        (
          <div className={styles[`no-data`]}>
            <p>게시된 정보가 없습니다.</p>
            
            <Button
              onClick={()=>{router.back();}}
            >
              이전 페이지로 돌아가기
            </Button>
          </div>
        ) :
        (
          <>
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
                    <p className={styles.name}>{psName}</p>
                    <p className={styles.desc}>{psDesc}</p>
                    <p className={styles.time}>이용시간 : {stime} - {etime}</p>
                  </div>
                ))
              }
            </div>

            <h4 className={styles.brand}>브랜드 매장</h4>
            <div className={styles[`box-wrapper`]}>
              {
                brandInfo.map(({
                  brdCode, brdDesc, brdName,
                  stime, etime,
                })=>(
                  <div className={styles.box} key={brdCode}>
                    <p className={styles.name}>{brdName}</p>
                    <p className={styles.desc}>{brdDesc}</p>
                    <p className={styles.time}>이용시간 : {stime} - {etime}</p>
                  </div>
                ))
              }
            </div>
          </>
        )
      }
    </div>
  )
}

export default DetailClient