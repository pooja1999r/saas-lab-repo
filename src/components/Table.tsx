import React, { useEffect, useState } from "react";
import "../css/Table.css";
import { TABLE_RESPONSE_TYPE } from "./constant";
import { fetchTableData } from "./service";
import Pagination from "./Pagination";

const Table = () => {
  const [tableData, setTableData] = useState<TABLE_RESPONSE_TYPE[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currPageData, setCurrPageData] = useState<TABLE_RESPONSE_TYPE[]>([]);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchTableData().then((data) => {
      setTableData(data);
      getCurrPageData(1, data);
    });
  }, []);

  const getCurrPageData = (page: number, data?: TABLE_RESPONSE_TYPE[]) => {
      const currPageData = (data ?? tableData)?.slice((page - 1) * itemsPerPage, page * itemsPerPage);
      setCurrPageData(currPageData ?? []);
  }

  const updateCurrentPage = (page: number) => {
    setCurrentPage(page);
    getCurrPageData(page);
  }

  return <div className="parent-container">
    <h2>Table</h2>
    <table className="table-container">
        <thead>
            <tr>
                <th>S.No.</th>
                <th>Percentage funded</th>
                <th>Amount pledged</th>
            </tr>
        </thead>
        <tbody>
          {tableData.length > 0 && currPageData.map((item: TABLE_RESPONSE_TYPE, index: number) => (
            item ? (<tr key={index}>
              <td>{item["s.no"].toString()}</td>
              <td>{item["percentage.funded"].toString()}</td>
              <td>{item["amt.pledged"].toString()}</td>
            </tr>) : (<tr>
              <td>No data</td>
            </tr>)
          ))}
        </tbody>
    </table>
    <Pagination
      currentPage={currentPage}
      totalPages={Math.ceil(tableData.length / itemsPerPage)}
      onPageChange={updateCurrentPage}
    />
  </div>;
};

export default Table;