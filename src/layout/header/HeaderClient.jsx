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
        <h1><Link className={styles.logo} href={'./'}>logo</Link></h1>
      </div>

      <ul className={styles.list}>
        <li 
          className={selected === '/' ? `${styles.item} ${styles.active}` : styles.item}
          onClick={()=>handleButtonClick('/')}
        >
          <Link href={'./'}>음식</Link>
        </li>

        <li 
          className={selected === '/amenities' ? `${styles.item} ${styles.active}` : styles.item}
          onClick={()=>handleButtonClick('/amenities')}
        >
          <Link href={'./amenities'}>편의시설</Link>
        </li>

        <li 
          className={selected === '/' ? `${styles.item} ${styles.active}` : styles.item}
          onClick={()=>handleButtonClick('/')}
        >
          <Link href={'./'}>주유소</Link>
        </li>

        <li 
          className={selected === '/' ? `${styles.item} ${styles.active}` : styles.item}
          onClick={()=>handleButtonClick('/')}
        >
          <Link href={'./'}>주차</Link>
        </li>
      </ul>

      <Button>
        로그인
      </Button>
      
    </header>
  )
}

export default HeaderClient