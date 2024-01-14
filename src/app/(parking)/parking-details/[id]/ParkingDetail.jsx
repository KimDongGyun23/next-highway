'use client'
import Button from '@/components/button/Button';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import styles from './ParkingDetail.module.scss'

const ParkingDetail = () => {
  const [info, setInfo] = useState([]);

  const { id } = useParams();
  const router = useRouter();

  const url = `https://data.ex.co.kr/openapi/restinfo/hiwaySvarInfoList?key=test&type=json&svarCd=${id}`

  const getInfo = async () => {
    const res = await axios.get(url);
    setInfo(res.data.list[0]);
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
              { info?.svarNm }
            </h2>

            <p className={styles.addr}>
              { info?.svarAddr }
            </p>

            <div className={styles[`box-wrapper`]}>
              <div className={styles.box}>
                <p className={styles.name}>전체 주차 대수</p>
                <p className={styles.desc}>소형차 주차 대수 : {info.cocrPrkgTrcn}</p>
                <p className={styles.desc}>대형차 주차 대수 : {info.fscarPrkgTrcn}</p>
                <p className={styles.desc}>장애인 주차 대수 : {info.fscarPrkgTrcn}</p>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default ParkingDetail