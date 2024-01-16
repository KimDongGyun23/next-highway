'use client'
import React, { useState } from 'react'
import styles from './Header.module.scss'
import Link from 'next/link'
import Button from '@/components/button/Button'

const HeaderClient = () => {
  const [selected, setSelected] = useState("/")

  const handleButtonClick = (path) => {
    setSelected(path);
  };

  return (
    <header className={styles.header}>
      <div>
        <h1 onClick={()=>setSelected("")}>
          <Link className={styles.logo} href={'/'}>
            logo
          </Link>
        </h1>
      </div>

      <ul className={styles.list}>
        <li 
          className={selected === '/food' ? `${styles.item} ${styles.active}` : styles.item}
          onClick={()=>handleButtonClick('/food')}
        >
          <Link href={'/food'}>음식</Link>
        </li>

        <li 
          className={selected === '/amenities' ? `${styles.item} ${styles.active}` : styles.item}
          onClick={()=>handleButtonClick('/amenities')}
        >
          <Link href={'/amenities'}>편의시설</Link>
        </li>

        <li 
          className={selected === '/gas-station' ? `${styles.item} ${styles.active}` : styles.item}
          onClick={()=>handleButtonClick('/gas-station')}
        >
          <Link href={'/gas-station'}>주유소</Link>
        </li>

        <li 
          className={selected === '/parking' ? `${styles.item} ${styles.active}` : styles.item}
          onClick={()=>handleButtonClick('/parking')}
        >
          <Link href={'/parking'}>주차</Link>
        </li>
      </ul>

      <Button>
        <Link href={'/login'}>로그인</Link>
      </Button>
      
    </header>
  )
}

export default HeaderClient