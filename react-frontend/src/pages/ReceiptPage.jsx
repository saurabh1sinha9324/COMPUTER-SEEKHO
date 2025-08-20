import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ReceiptPage.css";

const ReceiptPage = () => {
  const location = useLocation();
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState(null);
  const receiptId = location.state?.receiptId;

  useEffect(() => {
    if (!receiptId) {
      setError("❌ Receipt ID not provided.");
      return;
    }

    fetch(`http://localhost:8080/api/receipt/${receiptId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch receipt");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched receipt:", data);
        setReceipt(data);
      })
      .catch((err) => {
        console.error("Error fetching receipt:", err);
        setError("❌ Failed to load receipt");
      });
  }, [receiptId]);

  const handleDownloadPDF = () => {
    fetch(`http://localhost:8080/api/receipt/${receiptId}/pdf`)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `receipt_${receiptId}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => console.error("❌ Error downloading PDF:", err));
  };

  if (error) return <div className="receipt-container">{error}</div>;
  if (!receipt) return <div className="receipt-container">⏳ Loading...</div>;

  return (
    <div className="receipt-container">
      <h1>Receipt Details</h1>
      <div className="receipt-info">
        <p><strong>Receipt ID:</strong> {receipt.receipt_id}</p>
        <p><strong>Receipt Date:</strong> {receipt.receipt_date}</p>
        <p><strong>Receipt Amount:</strong> ₹{receipt.receipt_amount}</p>
        <p><strong>Payment ID:</strong> {receipt.payment_id}</p>
        <p><strong>Payment Date:</strong> {receipt.payment_date}</p>
        <p><strong>Payment Amount:</strong> ₹{receipt.amount}</p>
        <p><strong>Payment Type:</strong> {receipt.payment_type}</p>
        <p><strong>Student Roll No:</strong> {receipt.student_id}</p>
      </div>
      <button className="download-button" onClick={handleDownloadPDF}>
        Download PDF
      </button>
    </div>
  );
};

export default ReceiptPage;
