import React from 'react';
import Reveal from 'react-awesome-reveal';
import { keyframes } from "@emotion/react";

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const slidermain= () => (
 <div className="container">
    <div className="row align-items-center">
          <div className="col-md-6">
              <div className="spacer-single"></div>
              <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
              <h2 className="">Discover Best Digital</h2>
              </Reveal>
              <div className="spacer-10"></div>
              <Reveal className='onStep' keyframes={fadeInUp} delay={300} duration={600} triggerOnce>
              <h1 className="">Art and Collects NFT’s</h1>
              </Reveal>
              <Reveal className='onStep' keyframes={fadeInUp} delay={600} duration={600} triggerOnce>
              <p className=" lead">
                I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system.
              </p>
              <p className=" lead">
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, 
                or randomised words which don't look even slightly believable. 
                If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.
              </p>
              </Reveal>
              <div className="spacer-10"></div>
              <Reveal className='herobannerbtnsection' keyframes={fadeInUp} delay={800} duration={900} triggerOnce>
                <span onClick={()=> window.open("/#", "_self")} className="btn-main lead">Get Started</span>
                <span onClick={()=> window.open("/#", "_self")} className="btn-main lead ndbtnhero">Check Details</span>
              <div className="mb-sm-30"></div>
              </Reveal>
          </div>
          <div className="col-md-6 xs-hide">
              <div className='herobannerimg'>
                <Reveal className='onStep' keyframes={fadeIn} delay={900} duration={1500} triggerOnce>
                  <img src="./img/misc/nft.png" className="lazy img-fluid" alt=""/>
                  <h3>BAYC NFT</h3>
                  <div>
                    <span>Lorem Ipsum</span>
                    <h3>3.5 ETH</h3>
                  </div>
                  <Reveal className='heronftbtnsection' keyframes={fadeInUp} delay={800} duration={900} triggerOnce>
                    <span onClick={()=> window.open("/#", "_self")} className="btn-main lead">Lorem Ipsum</span>
                    <span onClick={()=> window.open("/#", "_self")} className="btn-main lead ndbtnhero">Lorem Ipsum</span>              
                  </Reveal>
                </Reveal>
              </div>            
          </div>
      </div>
    </div>
);
export default slidermain;