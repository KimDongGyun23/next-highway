'use client'
import axios from "axios"
import Image from "next/image";
import mainImg from "@/assets/mainbg.jpg"

import styles from "./home.module.scss"

export default function Home() {
  
  const handleClick = async ()=>{

    // 총 고속도로 수 = count 변수에 저장됨
    const res = await axios.get("https://data.ex.co.kr/openapi/restinfo/hiwaySvarInfoList?key=test&type=json");
    console.log(res.data);
  }



  return (
    <main className={styles.main}>
      <div className={styles.image}>
        <Image src={mainImg} alt="main-bg" />
      </div>



      <div className={styles.title}>
        <p>당신의 여행 쉼터,</p><p>우리가 책임지겠습니다.</p>
      </div>
      {/* <button onClick={handleClick}>클릭</button> */}
    </main>
  )
}
