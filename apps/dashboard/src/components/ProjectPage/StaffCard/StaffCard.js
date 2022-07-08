import React from 'react';
import styles from './StaffCard.module.css';

function StaffCard({title, name}) {
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{title}</h3>
            <img className={styles.img} src="https://dd7tel2830j4w.cloudfront.net/f1632981488134x138990652275506000/newbie.svg" alt="staff"
                     width={73} height={73}/>
            <p className={styles.name}>{name}</p>
        </div>
    );
}

export default StaffCard;