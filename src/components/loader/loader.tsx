import React, {FC} from "react";
import styles from "./loader.module.css"
import loader from "../../images/loader.gif";

type TLoaderProps = {
    title?: string
}

const Loader: FC<TLoaderProps> = ({title}) => {
    return (
        <section className={styles.section}>
            <img src={loader} alt={"loader"} width={70} height={70}/>
            <h2 className="text text_type_main-large mt-10">{title || "Загрузка..."}</h2>
        </section>
    )
}

export default Loader