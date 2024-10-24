'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProduct() {
  const router = useRouter();
  const [productName, setProductName] = useState('');
  const [siteId, setSiteId] = useState('');
  const [productType, setProductType] = useState('');
  const [serialNumber, setSerialNumber] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_name: productName,
        product_type: productType,
        serial_number: serialNumber,
        site_id: Number(siteId),
      }),
    });
  
    if (response.ok) {
      router.push('/products'); // Redirect to product list after adding
    } else {
      console.error('Error adding product');
    }
  };

  return (
    <div>
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product Type"
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Serial Number"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
        />
        <input
          type="number"
          placeholder="Site ID"
          value={siteId}
          onChange={(e) => setSiteId(e.target.value)}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}
