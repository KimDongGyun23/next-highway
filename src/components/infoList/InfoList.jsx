'use client'
import React, { useCallback, useEffect, useState } from 'react'
import styles from './InfoList.module.scss'
import Pagination from '@/components/pagination/Pagination';
import SearchForm from '@/components/form/SearchForm';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar from '@/layout/sidebar/Sidebar';
import { FaRegStar, FaStar  } from "react-icons/fa";
import Loader from '../loader/Loader';
import { auth, db } from '@/firebase/firebase';
import { toast } from 'react-toastify';
import { useInfoStore } from '@/store/info';
import { useBookmarkStore } from '@/store/bookmark';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { updateFirebase } from '@/utils/updateFirebase';
import { updateBookmark } from '@/utils/updateBookmark'

// 정보 가져올 URL - svarGsstClassCd => 0:휴게소  1:주유소
const restingUrl = `https://data.ex.co.kr/openapi/restinfo/hiwaySvarInfoList?key=test&type=json&svarGsstClssCd=0`;
const gasStationUrl = `https://data.ex.co.kr/openapi/restinfo/hiwaySvarInfoList?key=test&type=json&svarGsstClssCd=1`;

const InfoList = () => {
  
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { getDataFromFirebase } = useBookmarkStore();
  const {
    filteredInfo, 
    infoPerPage, 
    currentPage,
    toggleBookmarked,
    setInitialBookmarked,
    restingInfo,
    gasStationInfo,
    setFilteredInfo,
    setAllInfo,
    setRestingInfo,
    setGasStationInfo
  } = useInfoStore();

  const {
    amenitiesBookmarkedList: amenities,
    foodBookmarkedList: food,
    gasStationBookmarkedList: gasStation,
    parkingBookmarkedList: parking,
    setFoodBookmark,
  } = useBookmarkStore();

  // 모든 데이터 저장
  const getHighwayInfo = useCallback(async () => {
    try {
      setRestingInfo(restingUrl);
      setGasStationInfo(gasStationUrl);
    } 
    catch (error) {
      console.log(error);
    }
  },[])

  useEffect(()=>{
    getHighwayInfo();
  },[])


  // 현재 페이지와 다음 페이지의 첫 번째 인덱스 계산
  const firstIndexOfNextPage = currentPage * infoPerPage;
  const firstIndexOfCurrentPage = firstIndexOfNextPage - infoPerPage;
  const currentProducts = filteredInfo?.slice( firstIndexOfCurrentPage, firstIndexOfNextPage )

  useEffect(()=>{
    setIsLoading(true)
    if ( pathname === '/gas-station') {
      setAllInfo(gasStationInfo)
      setFilteredInfo(gasStationInfo)
    } else {
      setAllInfo(restingInfo)
      setFilteredInfo(restingInfo)
    }

    onAuthStateChanged(auth, (user) => {
      if(user) { getFirebaseData(); }
    });

    setInitialBookmarked(getBookmarkArray(pathname))
    setIsLoading(false)
  }, [])

  const getFirebaseData = async () => {
    setIsLoading(true)
    const docSnap = await getDoc(doc(db, "bookmarked", auth.currentUser.uid));
    getDataFromFirebase(docSnap.data());
    setIsLoading(false)
  }

  const getBookmarkArray = (pathname)=>{
    switch (pathname) {
      case '/amenities':    return amenities;
      case '/food':         return food;
      case '/gas-station':  return gasStation;
      case '/parking':      return parking;
      default:              return [];
    }
  }

  const handleInfoClick = (svarCd) => {
    router.push(`${pathname}-details/${svarCd}`);
  }

  const handleSaveClick = (infoObj)=>{
    setIsLoading(true)
    if (auth?.currentUser){
      const updateArr = updateBookmark(infoObj, getBookmarkArray(pathname));

      const bookmarkedList = { 
        amenities, 
        food, 
        gasStation, 
        parking, 
        [pathname.slice(1)] : updateArr 
      };
      
      setFoodBookmark(updateArr);
      updateFirebase(bookmarkedList);
      toggleBookmarked(infoObj.svarCd);
    }
    else {
      toast.warning("로그인이 필요합니다.");
    }
    setIsLoading(false)
  }

  return (
    <div className={styles.container}>
      <div>
        <Sidebar/>
      </div>

      <div className={styles.content}>
        {isLoading && <Loader />}

        <SearchForm />

        <table>
          <thead>
            <tr>
              <th>{ pathname === '/gas-station' ? '주유소 명' : '휴게소 명'}</th>
              <th>주소</th>
              <th className={styles.save}>저장</th>
            </tr>
          </thead>
          <tbody>
            {
              currentProducts?.map(({svarCd, svarNm, svarAddr, isBookmarked})=>(
                <tr 
                  className={styles.trBody} 
                  key={svarCd}

                >
                  <td onClick={()=>handleInfoClick(svarCd)}>{svarNm}</td>
                  <td onClick={()=>handleInfoClick(svarCd)}>{svarAddr}</td>
                  <td 
                    className={styles.save}
                    onClick={()=>handleSaveClick({svarCd, svarNm, svarAddr, isBookmarked})}
                  >
                    {
                      isBookmarked ? <FaStar /> : <FaRegStar />
                    }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <Pagination />
      </div>
    </div>
  )
}

export default InfoList