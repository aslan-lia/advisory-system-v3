'use client';

import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddCustomer() {
  const router = useRouter();
  const [customerName, setCustomerName] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/customers', {  // Ensure this URL is correct
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_name: customerName,
          contact_email: contactEmail,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error adding customer');
      }
  
      console.log('Customer added successfully');
    } catch (error: unknown) {
      const err = error as Error;
      console.error('Error adding customer:', err.message);
    }
  };
  
  

  return (
    <div>
      <h1>Add New Customer</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Contact Email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
}
