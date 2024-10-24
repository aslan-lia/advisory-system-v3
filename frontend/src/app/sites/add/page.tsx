'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddSite() {
  const router = useRouter();
  const [siteName, setSiteName] = useState('');
  const [customerId, setCustomerId] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const response = await fetch('/api/sites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        site_name: siteName,
        customer_id: Number(customerId),
      }),
    });
  
    if (response.ok) {
      router.push('/sites'); // Redirect to site list after adding
    } else {
      console.error('Error adding site');
    }
  };
  

  return (
    <div>
      <h1>Add New Site</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Site Name"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <button type="submit">Add Site</button>
      </form>
    </div>
  );
}
