import React from 'react';

function StaffCard({title, name}) {
    return (
        <div>
            <h3>{title}</h3>
            <img src="https://dd7tel2830j4w.cloudfront.net/f1632981488134x138990652275506000/newbie.svg" alt="staff"
            width={73} height={73}/>
            <p>{name}</p>
        </div>
    );
}

export default StaffCard;