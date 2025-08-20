import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PaymentPage.css';

const PAYMENT_TYPES = {
  "Cash": "Cash",
  "Credit Card": "Credit Card",
  "Debit Card": "Debit Card",
  "UPI": "UPI",
  "Bank Transfer": "Bank Transfer",
  "Cheque": "Cheque",
};

const PaymentPage = () => {
  const { studentId } = useParams();
  const [payments, setPayments] = useState([]);
  const [studentData, setStudentData] = useState(null);
  const [formData, setFormData] = useState({
    amount: '',
    paymentDate: new Date().toISOString().split('T')[0],
    paymentType: ''
  });

  // 🔹 Fetch all payments for the student
  const fetchPayments = async () => {
    try {
      const res = await fetch(`https://localhost:7094/api/Payment/by-student/${studentId}`);
      const data = await res.json();
      setPayments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  // 🔹 Fetch student info (for payment due calculation)
  const fetchStudent = async () => {
    try {
      const res = await fetch(`https://localhost:7094/api/Student/${studentId}`);
      const data = await res.json();
      setStudentData(data);
    } catch (error) {
      console.error('Error fetching student:', error);
    }
  };

  useEffect(() => {
    if (studentId) {
      fetchStudent();
      fetchPayments();
    }
  }, [studentId]);

  // 🔹 Form input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 🔹 Submit payment
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paymentDue <= 0) {
      alert("No further payments required. Payment due is already cleared.");
      return;
    }

    try {
      const response = await fetch('https://localhost:7094/api/Payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(formData.amount),
          paymentDate: formData.paymentDate,
          paymentType: formData.paymentType,
          studentId: parseInt(studentId)
        })
      });

      if (response.ok) {
        setFormData({
          amount: '',
          paymentDate: new Date().toISOString().split('T')[0],
          paymentType: ''
        });
        fetchStudent();
        fetchPayments();
      } else {
        alert('Failed to create payment.');
      }
    } catch (error) {
      console.error('Error posting payment:', error);
    }
  };

  // 🔹 Download receipt as PDF
  const handleDownloadReceipt = async (paymentId) => {
    try {
      const res = await fetch(`https://localhost:7094/api/Payment/${paymentId}/receipt`, {
        method: 'GET'
      });
      if (!res.ok) throw new Error("Failed to fetch receipt");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a hidden link and trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt_${paymentId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading receipt:", err);
      alert("Could not download receipt.");
    }
  };

  // 🔹 Calculate payment due
  const paymentDue = studentData
    ? studentData.paymentDue - payments.reduce((sum, p) => sum + p.amount, 0)
    : 0;

  return (
    <div className="payment-container">
      <h2>Payments for Student ID: {studentId}</h2>
      {studentData && (
        <p>
          <strong>Payment Due:</strong>{" "}
          ₹{paymentDue.toFixed(2)}
        </p>
      )}

      {paymentDue > 0 ? (
        <form onSubmit={handleSubmit} className="payment-form">
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
            min="1"
            max={paymentDue}
          />
          <input
            type="date"
            name="paymentDate"
            value={formData.paymentDate}
            onChange={handleChange}
            required
          />
          <select
            name="paymentType"
            value={formData.paymentType}
            onChange={handleChange}
            required
          >
            <option value="">Select Payment Type</option>
            {Object.keys(PAYMENT_TYPES).map((type) => (
              <option key={type} value={type}>
                {PAYMENT_TYPES[type]}
              </option>
            ))}
          </select>
          <button type="submit">Submit Payment</button>
        </form>
      ) : (
        <p style={{ color: "green", fontWeight: "bold" }}>
          ✅ Payment is fully cleared. No further payments required.
        </p>
      )}

      <h3>Payments History</h3>
      <table className="payment-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Payment Type</th>
            <th>Receipt</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.paymentId}>
              <td>{payment.paymentId}</td>
              <td>₹{payment.amount.toFixed(2)}</td>
              <td>{payment.paymentDate?.split('T')[0]}</td>
              <td>{payment.paymentType}</td>
              <td>
                <button
                  className="view-btn"
                  onClick={() => handleDownloadReceipt(payment.paymentId)}
                >
                  Download PDF
                </button>
              </td>
            </tr>
          ))}
          {payments.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                No payments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentPage;
