'use client'
import React from 'react'
import styles from './SidebarClient.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '@/store/slice/menuSlice';
import Link from 'next/link'

const SidebarClient = () => {
  const dispatch = useDispatch();

  const { isActive } = useSelector((state)=>state.menu);



  return (
    <div className={styles.container}>
      <h3 className={styles.title}>지역 선택</h3>

      <ul>
        <li
          
          onClick={() => dispatch(toggleMenu(false))}
        >
          <Link 
            href={'/'}
            className={({ isActive }) => isActive ? "styles.active" : ""}>
            서울
          </Link>
        </li>
        {/* <li
          className={active ? 'styles.active' : ""}
          onClick={() => dispatch(toggleMenu(false))}
        >
          서울
        </li> */}
        {/* <li
          className={active ? 'styles.active' : ""}
          onClick={() => dispatch(toggleMenu(false))}
        >
          경기
        </li>
        <li
          className={active ? styles.active : ""}
          onClick={() => dispatch(toggleMenu(false))}
        >
          강원
        </li>
        <li
          className={active ? 'styles.active' : ""}
          onClick={() => dispatch(toggleMenu(false))}
        >
          충북
        </li>
        <li
          className={active ? 'styles.active' : ""}
          onClick={() => dispatch(toggleMenu(false))}
        >
          충남
        </li>
        <li
          className={active ? 'styles.active' : ""}
          onClick={() => dispatch(toggleMenu(false))}
        >
          전북
        </li>
        <li
          className={active ? 'styles.active' : ""}
          onClick={() => dispatch(toggleMenu(false))}
        >
          전남
        </li>
        <li
          className={active ? 'styles.active' : ""}
          onClick={() => dispatch(toggleMenu(false))}
        >
          경북
        </li>
        <li
          className={active ? 'styles.active' : ""}
          onClick={() => dispatch(toggleMenu(false))}
        >
          경남
        </li> */}
      </ul>
    </div>
  )
}

export default SidebarClient