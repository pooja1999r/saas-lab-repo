import React, { useEffect, useState } from "react";
import "../css/Table.css";
import { TABLE_RESPONSE_TYPE } from "./constant";
import { fetchTableData } from "./service";
import Pagination from "./Pagination";

const Table = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [tableData, setTableData] = useState<TABLE_RESPONSE_TYPE[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currPageData, setCurrPageData] = useState<TABLE_RESPONSE_TYPE[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  useEffect(() => {
    fetchTableData().then((data) => {
      setLoading(false);
      setTableData(data);
      getCurrPageData(1, data);
    });
  }, [itemsPerPage]);

  // Get current page data based on items per page and current page
  const getCurrPageData = (page: number, data?: TABLE_RESPONSE_TYPE[]) => {
      const currPageData = (data ?? tableData)?.slice((page - 1) * itemsPerPage, page * itemsPerPage);
      setCurrPageData(currPageData ?? []);
  }

  // Update current page and get current page data
  const updateCurrentPage = (page: number) => {
    setCurrentPage(page);
    getCurrPageData(page);
  }

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    updateCurrentPage(1);
    getCurrPageData(1);
  }

  return <div className="parent-container">
    <h2>Table Data Goes Here</h2>
    {loading ? <div>Loading...</div> : tableData.length > 0 ? 
    (<><table className="table-container">
        <thead>
            <tr>
                <th>S.No.</th>
                <th>Percentage funded</th>
                <th>Amount pledged</th>
            </tr>
        </thead>
        <tbody>
          {tableData.length > 0 && currPageData.map((item: TABLE_RESPONSE_TYPE, index: number) => (
            <tr key={index}>
              <td>{item["s.no"].toString()}</td>
              <td>{item["percentage.funded"].toString()}</td>
              <td>{item["amt.pledged"].toString()}</td>
            </tr>
          ))}
        </tbody>
    </table>

    <div className="table-pagination-container">

      {/* Select items per page */}
      <div className="pagination-select">
          Showing 
          <select onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value))}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select> 
          entries
      </div>

      {/* If there are more than equal to 2 items, show pagination */}
      {tableData.length >= 2 && <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(tableData.length / itemsPerPage)}
          onPageChange={updateCurrentPage}
      />}
    </div>
     
    </>) : <div>No data found</div>}
  </div>;
};

export default Table;