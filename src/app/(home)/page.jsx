'use client'
import Image from "next/image";
import mainImg from "@/assets/mainbg.jpg"
import styles from "./home.module.scss"
import { useCallback, useEffect, useState } from "react";
import { useInfoStore } from "@/store/info";
import Loader from "@/components/loader/Loader";

export default function Home() {
  const { setRestingInfo, setGasStationInfo } = useInfoStore();
  const [isLoading, setIsLoading] = useState(false);

  // 정보 가져올 URL - svarGsstClassCd => 0:휴게소  1:주유소
  const restingUrl = `https://data.ex.co.kr/openapi/restinfo/hiwaySvarInfoList?key=test&type=json&svarGsstClssCd=0`;
  const gasStationUrl = `https://data.ex.co.kr/openapi/restinfo/hiwaySvarInfoList?key=test&type=json&svarGsstClssCd=1`;


  // 모든 데이터 저장
  const getHighwayInfo = useCallback(async () => {
    setIsLoading(true);
    try {
      setRestingInfo(restingUrl);
      setGasStationInfo(gasStationUrl);
    } 
    catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  },[])

  useEffect(() => {
    getHighwayInfo();
  }, [getHighwayInfo])
  
  return (
    <main className={styles.main}>
      {isLoading && <Loader />}
      <div className={styles.image}>
        <Image 
          src={mainImg} 
          alt="main-bg"
          priority 
        />
      </div>

      <div className={styles.title}>
        <p>당신의 여행 쉼터,</p><p>우리가 책임지겠습니다.</p>
      </div>
    </main>
  )
}
