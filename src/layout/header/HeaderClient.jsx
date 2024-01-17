'use client'
import React, { useEffect, useState } from 'react'
import styles from './Header.module.scss'
import Link from 'next/link'
import Button from '@/components/button/Button'
import { auth } from '@/firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER, selectIsLoggedIn } from '@/redux/slice/authSlice'

const HeaderClient = () => {
  const [selected, setSelected] = useState("/");
  const [displayName, setDisplayName] = useState('');

  const isLoggedIn = useSelector(selectIsLoggedIn);
  
  const dispatch = useDispatch();

  const handleButtonClick = (path) => {
    setSelected(path);
  };
  

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // 골뱅이 이전 잘라내기
        const u1 = user.email.substring(0, user.email.indexOf('@'));
        // 첫 글자 대문자
        const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
        setDisplayName(uName);

        // 유저 정보를 리덕스 스토어에 저장하기
        dispatch(SET_ACTIVE_USER({
          email: user.email,
          userName: displayName,
          userID: user.uid
        }))


      } else {
        setDisplayName('');
        dispatch(REMOVE_ACTIVE_USER());
      }
    })
  }, [dispatch, displayName])


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

      {
        isLoggedIn ? (
          <Button>
            <Link href={'/profile'}>{displayName} 님</Link>
          </Button>
        ) : (
          <Button>
            <Link href={'/login'}>로그인</Link>
          </Button>
        )
      }
      
      
    </header>
  )
}

export default HeaderClient