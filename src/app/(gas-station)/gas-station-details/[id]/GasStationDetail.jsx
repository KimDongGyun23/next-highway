'use client'
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import styles from './GasStationDetail.module.scss'
import Button from '@/components/button/Button';

const GasStationDetail = () => {
  const [info, setInfo] = useState([]);
  const [oilInfo, setOilInfo] = useState([]);

  const router = useRouter();
  const { id } = useParams();

  const url = `https://data.ex.co.kr/openapi/restinfo/restOilList?key=test&type=json&stdRestCd=${id}`;

  const oilUrl = `https://data.ex.co.kr/openapi/business/curStateStation?key=test&type=json&numOfRows=50&pageNo=1&serviceAreaCode2=${id}`;

  const getInfo = async () => {
    const res = await axios.get(url);
    const oilRes = await axios.get(oilUrl);
    setInfo(res.data.list);
    setOilInfo(oilRes.data.list);
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
                oilInfo.map(({
                  telNo,
                  oilCompany,lpgYn, 
                  gasolinePrice, diselPrice, lpgPrice
                })=>(
                  <div className={styles.box} key={telNo}>
                    <p className={styles.name}>주유 가격</p>
                    <p className={styles.desc}>정유사 : {oilCompany}</p>
                    <p className={styles.desc}>전화번호 : {telNo}</p>
                    <p className={styles.desc}>가솔린 가격 : {gasolinePrice}</p>
                    <p className={styles.desc}>디젤 가격 : {diselPrice}</p>
                    <p className={styles.desc}>lpg 가격 : {lpgPrice}</p>
                  </div>
                ))
              }
            </div>

            <h4 className={styles.brand}>편의 시설</h4>
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
          </>
        )
      }
    </div>
  )
}

export default GasStationDetail