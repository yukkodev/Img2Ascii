// app/page.tsx
"use client";
import { useState } from 'react';



export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [ascii, setAscii] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append('file', image);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || 'Failed to upload image');
        return;
      }

      const data = await res.json();
      setAscii(data.ascii);
      setError('');
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred');
    }
  };

  return (
    <div>
      <h1>Image to ASCII Art Converter</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button type="submit">Upload and Convert</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {ascii && <pre>{ascii}</pre>}
    </div>
  );
}
