import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import styles from './homepage.module.css';
import qrFrame from "/frameqr.png";
import PreLoader from '../../components/preLoader/PreLoader';

const HomePage = () => {
    const [scanResult, setScanResult] = useState(null);
    const videoRef = useRef(null);
    const qrScannerRef = useRef(null);
    const [isScannerView, setScannerView] = useState(false);
    const [isLoading,setIsLoading]=useState(false);

    useEffect(() => {
        if (isScannerView) {
            setIsLoading(true)
            // Initialize QR Scanner when the scanner view is active
            qrScannerRef.current = new QrScanner(videoRef.current, result => {
                setScanResult(result);
                if(result){
                    console.log(result);
                }
                setScannerView(false);
                qrScannerRef.current.stop(); // Stop scanning after successful result
            });

            qrScannerRef.current.start().then(()=>{
                setIsLoading(false);
            })
                .catch(error => console.error('Error starting QR scanner:', error));

            // Cleanup on unmount or when switching views
            return () => {
                if (qrScannerRef.current) {
                    qrScannerRef.current.stop();
                }
            };
        }

    }, [isScannerView]);

    const restart=()=>{
        
    }

    const handleScanButtonClick = () => {
        setScannerView(true);
    };

    return (
        <div className={`flex-col-center ${styles.homePage}`}>
            <div className={`flex-col-center ${styles.heading}`}>
                <h1>Scan QR Code</h1>
            </div>
            <div className={`${styles.buttonContainer}`}>
                    <button onClick={handleScanButtonClick}>Scan</button>
            </div>
            {
                isScannerView && (
                    <div className={`flex-col-center ${styles.qrReader}`}>
                        <div className={`flex-col-center ${styles.cameraWindow}`}>
                            {isLoading && <PreLoader />}
                            <video ref={videoRef} className={styles.qrScanVideo}></video>
                            <div className={`flex-col-center ${styles.frameContainer}`}>
                                <div className={styles.scannerLine}></div>
                                <img src={qrFrame} alt='frameqr' className={styles.frameImage} />
                            </div>
                        </div>
                    </div>
                )
            }
            
            {
                scanResult && <div className={styles.resultWindow}>
                    <p>Scanned Data: {scanResult}</p>
                </div>
            }
            {
                
            }
           
        </div>
    );
};

export default HomePage;
