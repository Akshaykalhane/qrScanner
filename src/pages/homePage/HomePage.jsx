import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import styles from './homepage.module.css'
import qrFrame from "/frameqr.png"

const HomePage = () => {
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
        <div className={`flex-col-center ${styles.homePage}`}>
            <div className={styles.heading}>
                <h1>Scan QR Code</h1>
            </div>
            <div className={styles.qrReader}>
                <div className={styles.cameraWindow}>
                    <video ref={videoRef} className={styles.qrScanVideo}></video>
                    {/* <img src={qrFrame} alt='frameqr' /> */}
                </div>
            </div>
            {scanResult && <p>Scanned Data: {scanResult}</p>}
        </div>
    );
};

export default HomePage;
