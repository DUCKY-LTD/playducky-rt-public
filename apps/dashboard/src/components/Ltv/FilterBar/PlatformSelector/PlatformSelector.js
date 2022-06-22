import React from 'react';
import styles from "./PlatformSelector.module.css";


function PlatformSelector ({gpStatus, iosStatus, platformHandler}){

    return (
        <div className={styles.container}>
            <form>
                <label className={styles.text}>
                    <input
                        value='iosStatus'
                        type='checkbox'
                        checked={iosStatus}
                        onChange={platformHandler}
                    />
                    IOS
                </label>
                <label className={styles.text}>
                    <input
                        value='gpStatus'
                        type='checkbox'
                        checked={gpStatus}
                        onChange={platformHandler}
                    />
                    Android
                </label>
            </form>
        </div>
    )
}

export default PlatformSelector;