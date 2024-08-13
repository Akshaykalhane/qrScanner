import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QrCodeScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    // Initialize the scanner
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 240,
        height: 240,
      },
      fps: 10,
    }, false);

    // Success callback
    const success = (result) => {
        console.log(result.text)
      setScanResult(result.text); // Update state with scanned result
      scanner.clear(); // Stop scanning
      fetchApi(result.text); // Optionally call an API
    };

    // Error callback
    const error = (err) => {
      console.error('Error scanning QR code:', err);
    };

    // Start scanning
    scanner.render(success, error);

    // Cleanup function
    return () => {
      scanner.clear(); // Stop scanning on unmount
    };
  }, []);

  // Function to call API with the scanned result
//   const fetchApi = async (scannedData) => {
//     try {
//       const response = await fetch('https://your-api-endpoint.com', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ data: scannedData }),
//       });
//       const result = await response.json();
//       console.log('API Response:', result);
//     } catch (error) {
//       console.error('API Error:', error);
//     }
//   };

  return (
    <div>
      <h1>QR Code Scanning in React</h1>
      <div id="reader" style={{ width: '300px' }}></div>
      {scanResult && <p>Scanned Data: {scanResult}</p>}
    </div>
  );
};

export default QrCodeScanner;
