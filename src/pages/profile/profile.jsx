import {Outlet} from "react-router-dom";
import React from "react";
import ProfileMenu from "../../components/profile-menu/profile-menu";
import styles from "./profile.module.css";

const Profile = () => {
    return (
        <section className={styles.section}>
            <ProfileMenu/>
            <Outlet/>
        </section>
    )
}

export default Profile