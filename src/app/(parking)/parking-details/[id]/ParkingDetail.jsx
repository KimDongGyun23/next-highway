'use client'
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import styles from './ParkingDetail.module.scss'
import NoData from '@/components/noData/NoData';
import DetailHeader from '@/components/detailHeader/DetailHeader';
import InfoBox from '@/components/infoBox/InfoBox';

const ParkingDetail = () => {
  const [info, setInfo] = useState([]);

  const { id } = useParams();

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
          <NoData />
        ) :
        (
          <>
            <DetailHeader name={info?.svarNm} addr={info?.svarAddr} />

            <div className='box-wrapper'>
              <InfoBox>
                <p className='name'>전체 주차 대수</p>
                <p className='desc'>소형차 주차 대수 : {info.cocrPrkgTrcn}</p>
                <p className='desc'>대형차 주차 대수 : {info.fscarPrkgTrcn}</p>
                <p className='desc'>장애인 주차 대수 : {info.fscarPrkgTrcn}</p>
              </InfoBox>
            </div>
          </>
        )
      }
    </div>
  )
}

export default ParkingDetail