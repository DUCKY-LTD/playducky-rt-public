import React from 'react';
import styles from './Button.module.css';

function Button({name}) {
    return (
        <button className={styles.button} type='button'>{name}</button>
    );
}

export default Button;