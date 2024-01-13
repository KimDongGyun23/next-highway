'use client'
import axios from 'axios';
import React, { useEffect } from 'react'

const GasStationClient = () => {

  const url = "https://data.ex.co.kr/openapi/restinfo/hiwaySvarInfoList?key=test&type=json&svarGsstClssCd=1";


  const getHighwayInfo = async () => {
    try {
      const res = await axios.get(url);
      console.log(res.data.list)
      // setAllHighwayInfo(temp);
      // setDisplayedHighwayInfo(temp);
    } 
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getHighwayInfo();
  }, [])



  return (
    <div>GasStationClient</div>
  )
}

export default GasStationClient