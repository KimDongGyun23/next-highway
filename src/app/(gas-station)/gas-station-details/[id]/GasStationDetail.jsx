'use client'
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import styles from './GasStationDetail.module.scss'
import NoData from '@/components/noData/NoData';
import DetailHeader from '@/components/detailHeader/DetailHeader';
import InfoBox from '@/components/infoBox/InfoBox';

const GasStationDetail = () => {
  const [info, setInfo] = useState([]);
  const [oilInfo, setOilInfo] = useState([]);

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
          <NoData />
        ) :
        (
          <>
            <DetailHeader name={info[0]?.stdRestNm} addr={info[0]?.svarAddr} />


            <div className={styles[`box-wrapper`]}>
              {
                oilInfo.map(({
                  telNo,
                  oilCompany, 
                  gasolinePrice, diselPrice, lpgPrice
                })=>(
                  <InfoBox key={telNo}>
                    <p className={styles.name}>주유 가격</p>
                    <p className={styles.desc}>정유사 : {oilCompany}</p>
                    <p className={styles.desc}>전화번호 : {telNo}</p>
                    <p className={styles.desc}>가솔린 가격 : {gasolinePrice}</p>
                    <p className={styles.desc}>디젤 가격 : {diselPrice}</p>
                    <p className={styles.desc}>lpg 가격 : {lpgPrice}</p>
                  </InfoBox>
                ))
              }
            </div>

            <h4 className={styles.amenities}>편의 시설</h4>
            <div className={styles[`box-wrapper`]}>
              {
                info.map(({
                  psCode, psDesc, psName,
                  stime, etime,
                })=>(
                  <InfoBox key={psCode}>
                    <p className={styles.name}>{psName}</p>
                    <p className={styles.desc}>{psDesc}</p>
                    <p className={styles.time}>이용시간 : {stime} - {etime}</p>
                  </InfoBox>
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