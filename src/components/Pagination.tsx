import React, { useEffect, useState } from "react";
import "../css/Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: (page: number) => void }) => {
    
  const [pageNumbers, setPageNumbers] = useState<{page: number, isSelected: boolean, symbol?: string}[]>([]);

  const paginationRepresentation = () =>{
    setPageNumbers([]);
    if (totalPages <= 6) {
        // Show all pages if total pages are 6 or less
        for (let i = 1; i <= totalPages; i++) {
          setPageNumbers(prev => [...prev, {page: i, isSelected: i === currentPage}]);
        }
      } else if (currentPage < 4) {
        // Handle start of pagination
        for (let i = 1; i <= 4; i++) {
          setPageNumbers(prev => [...prev, {page: i, isSelected: i === currentPage}]);
        }
        setPageNumbers(prev => [...prev, {page: 5, isSelected: false, symbol: "..."}]);
        setPageNumbers(prev => [...prev, {page: totalPages, isSelected: false}]);
      } else if (currentPage >= totalPages - 2) {
        // Handle end of pagination
        setPageNumbers(prev => [...prev, {page: 1, isSelected: false}]);
        setPageNumbers(prev => [...prev, {page: 2, isSelected: false, symbol: "..."}]);
        for (let i = totalPages - 3; i <= totalPages; i++) {
          setPageNumbers(prev => [...prev, {page: i, isSelected: i === currentPage}]);
        }
      } else {
        // Handle middle of pagination
        setPageNumbers(prev => [...prev, {page: 1, isSelected: false}]);
        setPageNumbers(prev => [...prev, {page: 2, isSelected: false, symbol: "..."}]);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          setPageNumbers(prev => [...prev, {page: i, isSelected: i === currentPage}]);
        }
        setPageNumbers(prev => [...prev, {page: currentPage + 2, isSelected: false, symbol: "..."}]);
        setPageNumbers(prev => [...prev, {page: totalPages, isSelected: false}]);
    }
  }
  
  useEffect(() => {
    paginationRepresentation();
  }, [currentPage, totalPages]);
  
  return <div>
    <button className="pagination-button" style={{margin: "0px", padding: "5px 7px"}} disabled={currentPage === 1} onClick={() => onPageChange(1)}>&#60;&#60;</button>
    <button className="pagination-button" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>&#60;</button>
    {pageNumbers && pageNumbers.map((item) => (
      <button className={`pagination-button pagination-hover ${item.isSelected ? "selected-page" : ""}`} onClick={() => onPageChange(item.page)}>{item.symbol ?? item.page}</button>
    ))}
    <button className="pagination-button" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>&#62;</button>
    <button className="pagination-button" style={{margin: "0px", padding: "5px 7px"}} disabled={currentPage === totalPages} onClick={() => onPageChange(totalPages)}>&#62;&#62;</button>
  </div>;
}

export default Pagination;