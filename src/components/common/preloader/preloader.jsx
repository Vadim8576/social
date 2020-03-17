import React from 'react';
import preloader from '../../img/loader.gif';

let Preloader = () => {
    return (
        <div>
            <img src={preloader} alt='preloader' style={{width: '50px'}}/>
        </div>
    )
}

export default Preloader;