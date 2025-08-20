import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PaymentPage.css';

const PAYMENT_TYPES = {
  1: "Cash",
  2: "Credit Card",
  3: "Debit Card",
  4: "UPI",
  5: "Bank Transfer",
  6: "Cheque",
};

const PaymentPage = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [formData, setFormData] = useState({
    amount: '',
    payment_date: new Date().toISOString().split('T')[0],
    payment_type: ''
  });

  const fetchPayments = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/payments/student/${studentId}`);
      const data = await response.json();
      setPayments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  useEffect(() => {
    if (studentId) {
      fetchPayments();
    }
  }, [studentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(formData.amount),
          payment_date: formData.payment_date,
          payment_type: parseInt(formData.payment_type),
          student_id: parseInt(studentId)
        })
      });

      if (response.ok) {
        setFormData({
          amount: '',
          payment_date: new Date().toISOString().split('T')[0],
          payment_type: ''
        });
        fetchPayments();
      } else {
        alert('Failed to create payment.');
      }
    } catch (error) {
      console.error('Error posting payment:', error);
    }
  };

  const handleViewReceipt = (receiptId) => {
    if (receiptId) {
      navigate(`/receipt/${studentId}`, { state: { receiptId } });
    }
  };

  return (
    <div className="payment-container">
      <h2>Create Payment for Student ID: {studentId}</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="payment_date"
          value={formData.payment_date}
          onChange={handleChange}
          required
        />
        <select
          name="payment_type"
          value={formData.payment_type}
          onChange={handleChange}
          required
        >
          <option value="">Select Payment Type</option>
          {Object.entries(PAYMENT_TYPES).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        <button type="submit">Submit Payment</button>
      </form>

      <h3>Payments History</h3>
      <table className="payment-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Payment Type</th>
            <th>Receipt ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.payment_id}>
              <td>{payment.payment_id}</td>
              <td>₹{payment.amount.toFixed(2)}</td>
              <td>{payment.payment_date}</td>
              <td>{PAYMENT_TYPES[payment.payment_type] || 'Unknown'}</td>
              <td>{payment.receipt_id || '—'}</td>
              <td>
                {payment.receipt_id ? (
                  <button
                    className="view-btn"
                    onClick={() => handleViewReceipt(payment.receipt_id)}
                  >
                    View Receipt
                  </button>
                ) : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentPage;
