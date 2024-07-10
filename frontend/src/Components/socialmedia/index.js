import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { getAllSocialMediaUrl } from '../../services/socialmedia.service';
import { SocialMediaContext } from '../../context/SocialMediaContext';

const SocialIcons = () => {
  const [close, setClose]= useState(true)
  const { social } = useContext(SocialMediaContext)
  const handleIconClick = () => {
    setClose(!close)
  };

  return (
    <div className="social-left-main">
      <div className="social-left-inner">
        <div className="float-sm">
          {/* Commented out the onclick attribute as we'll handle it using React events */}
          {/* <div onClick={handleIconClick} id="float-plus" style={{ cursor: 'pointer', position: 'fixed', zIndex: 999, left: '12.96px' }} className="fl-fl float-plus ui-draggable ui-draggable-handle">
            <img src="images/www.png" alt="target" />
          </div> */}
          <div onClick={handleIconClick} style={{ cursor: 'pointer' }} className="fl-fl float-cross soc">
            {close ? <>
              <i style={{ color: 'red' }} className="fa fa-close fa-social"></i>
            </>
            :
            <>
            <img src="../images/www.png" alt="target" />
            </>
}
            
          </div>
          {close && social?.length>0 && 
          <ul className="social-ul">
            {social[0].facebook && <li>
              <a href={social[0].facebook} target="_blank">
                <i style={{ color: '#4267B2' }} className="fa fa-facebook fa-social"></i>
              </a>
            </li>}
           {social[0].twitter && <li>
              <a href={social[0].twitter} target="_blank">
                <i style={{ color: '#00acee' }} className="fa fa-twitter fa-social"></i>
              </a>
            </li>}
           {social[0].linkedin && <li>
              <a href={social[0].linkedin} target="_blank">
                <i style={{ color: '#0077b5' }} className="fa fa-linkedin fa-social"></i>
              </a>
            </li>}
           {social[0].instagram && <li>
              <a href={social[0].instagram} target="_blank">
                <i style={{ color: '#cd486b' }} className="fa fa-instagram fa-social"></i>
              </a>
            </li>}
            {social[0].youtube && <li>
              <a href={social[0].youtube} target="_blank">
                <i style={{ color: 'red' }} className="fa fa-youtube-play fa-social"></i>
              </a>
            </li>}
            {social[0].whatsapp && <li>
              <a href={social[0].whatsapp} target="_blank">
                <i style={{ color: '#25D366' }} className="fa fa-whatsapp fa-social"></i>
              </a>
            </li>}
            {social[0].telegram && <li>
              <a href={social[0].telegram} target="_blank">
                <i style={{ color: 'blue' }} className="fa fa-paper-plane"></i>
              </a>
            </li>}
            {/* Commented out the Telegram icon as it's not currently used */}
            {/* <li>
              <a href={socialMediaUrl[0].facebook} target="_blank">
                <i style={{ color: '#25D366!important' }} className="fa fa-telegram" aria-hidden="true"></i>
              </a>
            </li> */}
          </ul>
}
        </div>
      </div>
    </div>
  );
};

export default SocialIcons;
