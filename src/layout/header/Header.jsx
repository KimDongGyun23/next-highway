import React from 'react'
import styles from './Header.module.scss'
import Link from 'next/link'
import Button from '@/components/button/Button'

const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <h1><Link className={styles.logo} href={'./'}>logo</Link></h1>
      </div>

      <ul className={styles.list}>
        <li className={styles.item}>
          <Link href={'./'}>음식</Link>
        </li>
        <li className={styles.item}>
          <Link href={'./'}>편의시설</Link>
        </li>
        <li className={styles.item}>
          <Link href={'./'}>주유소</Link>
        </li>
        <li className={styles.item}>
          <Link href={'./'}>주차</Link>
        </li>
      </ul>

      <Button>
        로그인
      </Button>
      
    </header>
  )
}

export default Header