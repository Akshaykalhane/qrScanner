// import React, { useState } from 'react';
// import {QrScanner} from 'react-qr-scanner';

// const ReactQrCodeScanner = () => {
//   const [scanResult, setScanResult] = useState(null);

//   const handleScan = data => {
//     if (data) {
//       setScanResult(data);
//       // Optionally call an API or perform other actions
//     }
//   };

//   const handleError = err => {
//     console.error(err);
//   };

//   return (
//     <div>
//       <h1>QR Code Scanner</h1>
//       <QrScanner
//         onScan={handleScan}
//         onError={handleError}
//         style={{ width: '100%' }}
//       />
//       {scanResult && <p>Scanned Data: {scanResult}</p>}
//     </div>
//   );
// };

// export default ReactQrCodeScanner;
