import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TransactionTable.css";

const TransactionTable = ({ selectedMonth, handleMonthChange }) => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/transactions",
          {
            params: { page, perPage, search, month: selectedMonth },
          }
        );
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [page, perPage, search, selectedMonth]);

  return (
    <div className="transaction-table-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="transaction-controls">
          <input
            type="text"
            className="search-btn"
            placeholder="Search transaction"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="month">Select Month: </label>
          <select id="month" value={selectedMonth} onChange={handleMonthChange}>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
      </div>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction._id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price.toFixed(2)}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? "Yes" : "No"}</td>
              <td>
                <img
                  src={transaction.image}
                  alt={transaction.title}
                  width="50"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <span>Page No: {page}</span>
        <div>
          <button onClick={() => setPage(page > 1 ? page - 1 : 1)}>
            Previous
          </button>&nbsp;
          <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
        <span>PerPage: {perPage}</span>
      </div>
    </div>
  );
};

export default TransactionTable;
