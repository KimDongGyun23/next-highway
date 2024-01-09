import { useDebounce } from '@/hooks/useDebounce';
import React, { useEffect, useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";

const SearchForm = ({allHighwayInfo, setDisplayedHighwayInfo}) => {

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(()=>{
    handleSearchInput(debouncedSearch);
  },[debouncedSearch])

  const handleSearchInput = (search)=>{
    const filteredResults = allHighwayInfo.filter((item) => (
      // 검색어가 해당 항목에 포함되어 있는지 확인
        item.svarNm.includes(search) || item.svarAddr.includes(search)
    ));

    setDisplayedHighwayInfo(filteredResults)
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