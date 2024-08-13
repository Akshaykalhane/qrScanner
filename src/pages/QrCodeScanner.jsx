import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';

const QrCodeScannerZXing = () => {
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const codeReader = useRef(null);

  useEffect(() => {
    // Initialize ZXing reader
    codeReader.current = new BrowserMultiFormatReader();

    const startScanner = async () => {
      try {
        // Access the camera
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', true);
        videoRef.current.play();

        // Start scanning
        codeReader.current.decodeFromVideoDevice(null, videoRef.current, (result, error) => {
          if (result) {
            setScanResult(result.text); // Update state with scanned result
            codeReader.current.reset(); // Stop scanning after successful scan
          }
          if (error) {
            console.error('Scanning error:', error);
            setError('Error scanning QR code. Please try again.');
          }
        });
      } catch (err) {
        console.error('Error accessing camera:', err);
        setError('Error accessing camera. Please ensure camera permissions are granted.');
      }
    };

    startScanner();

    // Cleanup function
    return () => {
      if (codeReader.current) {
        codeReader.current.reset(); // Stop scanning on unmount
      }
    };
  }, []);

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <video ref={videoRef} style={{ width: '100%', height: 'auto' }}></video>
      {scanResult && <p>Scanned Data: {scanResult}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default QrCodeScannerZXing;
