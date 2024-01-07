'use client'
import React, { useEffect, useState } from 'react'
import styles from './SidebarClient.module.scss'


const AreaName = [
  "서울", "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남"
];

const SidebarClient = ({ 
  allHighwayInfo, 
  setDisplayedHighwayInfo, 
  setCurrentPage, 
}) => {
  const [activeCity, setActiveCity] = useState("");


  const handleClick = (area) => {
    setActiveCity(area);
    const filteredItems = allHighwayInfo.filter(({ svarAddr }) => svarAddr.startsWith(area));
    setDisplayedHighwayInfo(filteredItems);
    setCurrentPage(1);
  }



  return (
    <div className={styles.container}>
      <h3 className={styles.title}>지역 선택</h3>

      <ul>
        {
          AreaName.map((area)=>(
            <li key={area}
              className={activeCity === area ? styles.active : null}
              onClick={()=>handleClick(area)}
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