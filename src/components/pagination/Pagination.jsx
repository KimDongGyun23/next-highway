import React, { useState } from 'react'
import styles from './Pagination.module.scss';

const Pagination = ({
  currentPage,
  productsPerPage,
  setCurrentPage,
  totalLength
}) => {

  const pageNumbers = [];

  // 화살표 사이 페이지 개수
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  // 현재 페이지 수정
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  // 다음 페이지로 이동
  const paginateNextPage = () => {
    setCurrentPage(currentPage + 1);

    // 페이지 숫자 번호 집합 변경
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  }

  // 이전 페이지로 이동
  const paginatePrevPage = () => {
    setCurrentPage(currentPage - 1);

    // 페이지 숫자 번호 집합 변경
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  }

  // 페이지 숫자 집합
  for (let i = 1; i <= Math.ceil(totalLength / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      <li
        onClick={paginatePrevPage}
        className={currentPage === pageNumbers[0] ? `${styles.hidden}` : ''}
      >
        {"<"}
      </li>

      {pageNumbers.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li
              key={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? `${styles.active}` : ''}
            >
              {number}
            </li>
          )
        }
      })}

      <li
        onClick={paginateNextPage}
        className={
          currentPage === pageNumbers[pageNumbers.length - 1]
            ? `${styles.hidden}`
            : ''
        }
      >
        {">"}
      </li>
    </div>
  )
}

export default Pagination