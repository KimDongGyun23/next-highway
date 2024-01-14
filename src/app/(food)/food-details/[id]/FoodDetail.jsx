'use client'
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import styles from './FoodDetail.module.scss'
import { MdOutlineRecommend } from "react-icons/md";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { MdStars } from "react-icons/md";
import NoData from '@/components/noData/NoData';

const FoodDetail = () => {

  const [info, setInfo] = useState([]);
  const { id } = useParams();

  const url = `https://data.ex.co.kr/openapi/restinfo/restBestfoodList?key=test&type=json&numOfRows=50&pageNo=1&stdRestCd=${id}`;

  const getInfo = async () => {
    const res = await axios.get(url);
    setInfo(res.data.list);
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
            <div className={styles.header}>
              <div>
                <h2 className={styles[`area-name`]}>
                  { info[0]?.stdRestNm }
                </h2>

                <p className={styles.addr}>
                  { info[0]?.svarAddr }
                </p>
              </div>
              
              <div className={styles[`recommend-desc`]}>
                <p>추천 메뉴: <MdOutlineRecommend /></p>
                <p>베스트 메뉴: <MdStars /></p>
                <p>프리미엄 메뉴: <MdOutlineWorkspacePremium /></p>
              </div>

            </div>
            
            <div className={styles[`box-wrapper`]}>
              {
                info.map(({
                  seq, foodNm, etc, foodCost,
                  premiumyn, recommendyn, bestfoodyn
                })=>(
                  <div className={styles.box} key={seq}>
                    <div className={styles.title}>
                      <p className={styles.name}>{foodNm}</p>

                      <div>
                        { recommendyn === "Y" && <MdOutlineRecommend /> }
                        { bestfoodyn === "Y" && <MdStars /> }
                        { premiumyn === "Y" && <MdOutlineWorkspacePremium /> }
                      </div>
                    </div>

                    <p>가격: {foodCost}원</p>
                    { etc && <p className={styles.desc}>상세설명 : {etc}</p> }
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

export default FoodDetail