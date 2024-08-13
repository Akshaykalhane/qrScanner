import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';

const QrCodeScannerNew = () => {
  const [scanResult, setScanResult] = useState(null);
  const videoRef = useRef(null);
  const qrScannerRef = useRef(null);

  useEffect(() => {
    // Initialize QR Scanner when component mounts
    qrScannerRef.current = new QrScanner(videoRef.current, result => {
      setScanResult(result);
      qrScannerRef.current.stop(); // Stop scanning after successful result
    });

    qrScannerRef.current.start()
      .catch(error => console.error('Error starting QR scanner:', error));

    // Cleanup on unmount
    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.stop();
      }
    };
  }, []);

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <video ref={videoRef} style={{ width: '600px' }}></video>
      {scanResult && <p>Scanned Data: {scanResult}</p>}
    </div>
  );
};

export default QrCodeScannerNew;
