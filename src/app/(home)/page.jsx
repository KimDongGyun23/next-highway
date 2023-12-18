import Image from "next/image";
import mainImg from "@/assets/mainbg.jpg"
import styles from "./home.module.scss"

export default function Home() {

  return (
    <main className={styles.main}>
      <div className={styles.image}>
        <Image src={mainImg} alt="main-bg" />
      </div>



      <div className={styles.title}>
        <p>당신의 여행 쉼터,</p><p>우리가 책임지겠습니다.</p>
      </div>
    </main>
  )
}
