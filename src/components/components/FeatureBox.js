// import React from 'react';
// import Reveal from 'react-awesome-reveal';
// import { keyframes } from "@emotion/react";

// const fadeInUp = keyframes`
//   0% {
//     opacity: 0;
//     -webkit-transform: translateY(40px);
//     transform: translateY(40px);
//   }
//   100% {
//     opacity: 1;
//     -webkit-transform: translateY(0);
//     transform: translateY(0);
//   }
// `;

// const featurebox= () => (
//  <div className='row'>
//             <div className="col-lg-4 col-md-6 mb-3">
//                 <div className="feature-box f-boxed style-3">
//                   <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
//                     <i className="bg-color-2 i-boxed icon_wallet"></i>
//                   </Reveal>
//                     <div className="text">
//                       <Reveal className='onStep' keyframes={fadeInUp} delay={100} duration={600} triggerOnce>
//                         <h4 className="">Set up your wallet</h4>
//                       </Reveal>
//                       <Reveal className='onStep' keyframes={fadeInUp} delay={200} duration={600} triggerOnce>
//                         <p className="">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem.</p>
//                       </Reveal>
//                     </div>
//                     <i className="wm icon_wallet"></i>
//                 </div>
//             </div>

//           <div className="col-lg-4 col-md-6 mb-3">
//               <div className="feature-box f-boxed style-3">
//                 <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
//                   <i className=" bg-color-2 i-boxed icon_cloud-upload_alt"></i>
//                 </Reveal>
//                   <div className="text">
//                     <Reveal className='onStep' keyframes={fadeInUp} delay={100} duration={600} triggerOnce>
//                       <h4 className="">Add your NFT's</h4>
//                     </Reveal>
//                     <Reveal className='onStep' keyframes={fadeInUp} delay={200} duration={600} triggerOnce>
//                       <p className="">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem.</p>
//                     </Reveal>
//                   </div>
//                   <i className="wm icon_cloud-upload_alt"></i>
//               </div>
//           </div>

//           <div className="col-lg-4 col-md-6 mb-3">
//               <div className="feature-box f-boxed style-3">
//                 <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
//                   <i className=" bg-color-2 i-boxed icon_tags_alt"></i>
//                 </Reveal>
//                   <div className="text">
//                     <Reveal className='onStep' keyframes={fadeInUp} delay={100} duration={600} triggerOnce>
//                       <h4 className="">Sell your NFT's</h4>
//                     </Reveal>
//                     <Reveal className='onStep' keyframes={fadeInUp} delay={200} duration={600} triggerOnce>
//                       <p className="">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem.</p>
//                     </Reveal>
//                   </div>
//                   <i className="wm icon_tags_alt"></i>
//               </div>
//           </div>
//         </div>
// );
// export default featurebox;

import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Slider from "react-slick";
import styled from "styled-components";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Clock from "./Clock";
import { carouselNew } from './constants';
import * as selectors from '../../store/selectors';
import { fetchNftsBreakdown } from "../../store/actions/thunks";
import api from "../../core/api";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const featurebox = () => {

    const dispatch = useDispatch();
    const nftsState = useSelector(selectors.nftBreakdownState);
    const nfts = nftsState.data ? nftsState.data : [];

    const [height, setHeight] = useState(0);

    const onImgLoad = ({target:img}) => {
        let currentHeight = height;
        if(currentHeight < img.offsetHeight) {
            setHeight(img.offsetHeight);
        }
    }
    
    useEffect(() => {
        dispatch(fetchNftsBreakdown());
    }, [dispatch]);

    return (
        <div className='row'>          
          {nfts && nfts.slice(0, 3).map( (nft, index) => (
            <div className='col-md-4 col-sm-12 col-log-4 mb-3' index={index + 1} key={index}>
              <div className="d-item">
                <div>                    
                    <div className="frontendnewimage" style={{height: `${height}px`}}>
                      <Outer>
                        <span>
                            <img  style={{width: "100%"}} src={api.baseUrl + nft.preview_image.url} className="lazy nft__item_preview" onLoad={onImgLoad} alt=""/>
                        </span>
                      </Outer>
                    </div>
                    <div className="nft__item_info">
                        
                        <span onClick={()=> window.open("/#", "_self")}>
                            <h3>{nft.title}</h3>
                        </span>
                        <div className="nft__desc">                            
                            {nft.description}
                        </div>                                                      
                    </div> 
                </div>
              </div>
            </div>
          ))}
        </div>
    );
}

export default memo(featurebox);
