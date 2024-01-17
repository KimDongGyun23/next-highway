import { useDebounce } from '@/hooks/useDebounce';
import { SET_DISPLAYED_INFO, selectAllHighwayInfo } from '@/redux/slice/infoSlice';
import React, { useEffect, useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';

const SearchForm = () => {

  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const allHighwayInfo = useSelector(selectAllHighwayInfo);


  useEffect(()=>{
    handleSearchInput(debouncedSearch);
  },[debouncedSearch])

  const handleSearchInput = (search)=>{
    const filteredResults = allHighwayInfo.filter((item) => (
      // 검색어가 해당 항목에 포함되어 있는지 확인
        item.svarNm.includes(search) || item.svarAddr.includes(search)
    ));

    dispatch(SET_DISPLAYED_INFO(filteredResults));
  }

  return (
    <form>
      <input 
        name='search'
        type='text'
        value={search}
        placeholder='휴게소 또는 주소를 입력하세요.'
        onChange={(e)=>setSearch(e.target.value)}
      />
      <button type='submit'><IoSearchSharp /></button>
    </form>
  )
}

export default SearchForm