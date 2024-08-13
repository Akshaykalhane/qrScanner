import React from "react";
import styles from "./preloader.module.css";
import { ClipLoader } from "react-spinners";

const PreLoader=()=>{
    return <>
    <div className={`flex-col-center ${styles.PreLoader}`}>
        <ClipLoader />
    </div>
    </>
}

export default PreLoader;