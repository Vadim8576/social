import React from 'react';
import preloader from '../../img/preloader.gif';

let Preloader = () => {
    return (
        <div>
            <img src={preloader} alt='preloader' style={{width: '80px'}}/>
        </div>
    )
}

export default Preloader;