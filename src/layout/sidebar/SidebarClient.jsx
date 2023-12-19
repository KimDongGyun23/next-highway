'use client'
import React, { useState } from 'react'
import styles from './SidebarClient.module.scss'


const AreaName = [
  "서울", "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남"
];

const SidebarClient = () => {
  const [activeCity, setActiveCity] = useState("");
  console.log(activeCity)
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>지역 선택</h3>

      <ul>
        {
          AreaName.map((area)=>(
            <li key={area}
                className={activeCity === area ? styles.active : null}
                onClick={()=>setActiveCity(area)}
              >
                {area}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default SidebarClient