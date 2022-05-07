import React from 'react';
import SliderMain from '../components/SliderMain';
import FeatureBox from '../components/FeatureBox';
import CarouselCollectionRedux from '../components/CarouselCollectionRedux';
import CarouselNewRedux from '../components/CarouselNewRedux';
import AuthorListRedux from '../components/AuthorListRedux';
import Catgor from '../components/Catgor';
import Footer from '../components/footer';


const home= () => (
  <div>
      <section className="jumbotron breadcumb no-bg h-vh" style={{backgroundImage: `url(${'./img/bg-shape-1.jpg'})`}}>
         <SliderMain/>
      </section>

      <section className='container'>
        
        <div className='row'>
          <div className='col-lg-12'>
            <div className='text-center'>
              <h1>Featured NFTs</h1>              
            </div>
          </div>
          <div className='col-lg-12'>
            <FeatureBox/>
          </div>
        </div>
      </section>

      <section className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='text-center'>
              <h1>Hot Collections</h1>
              {/* <div className="small-border"></div> */}
            </div>
          </div>
          <div className='col-lg-12'>
            <CarouselCollectionRedux/>
          </div>
        </div>
      </section>

      <section className='homenewitems'>
        <div className='container'>  
          <div className='row'>
            <div className='col-lg-12'>
              <div className='text-center'>
                <h1>New Items</h1>
                {/* <div className="small-border"></div> */}
              </div>
            </div>
            <div className='col-lg-12'>
              <CarouselNewRedux/>
            </div>
          </div>
        </div>
      </section>

      <section className='container no-bottom'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='text-center'>
              <h1>Top Sellers</h1>
              {/* <div className="small-border"></div> */}
            </div>
          </div>
          <div className='col-lg-12'>
            <AuthorListRedux/>
          </div>
        </div>
      </section>

      {/* <section className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='text-center'>
              <h2>Browse by category</h2>
              <div className="small-border"></div>
            </div>
          </div>
        </div>
        <Catgor/>
      </section> */}
      <section className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='text-center'>
              <h1>Create and Sell Your NFTs</h1>
              {/* <div className="small-border"></div> */}
            </div>
          </div>
        </div>
        <div className='row footerguidelist'>
          <div className='col-md-3 col-sm-6 col-log-3 mb-3'>
            <img src="./img/setwallet.png" class="lazy bottomlist" alt="" />
            <h3>Set up your wallet</h3>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis.</p>
          </div>
          <div className='col-md-3 col-sm-6 col-log-3 mb-3'>
            <img src="./img/createcollect.png" class="lazy bottomlist" alt="" />
            <h3>Create your collection</h3>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis.</p>
          </div>
          <div className='col-md-3 col-sm-6 col-log-3 mb-3'>
            <img src="./img/addnft.png" class="lazy bottomlist" alt="" />
            <h3>Add your NFTs</h3>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis.</p>
          </div>
          <div className='col-md-3 col-sm-6 col-log-3 mb-3'>
            <img src="./img/listnft.png" class="lazy bottomlist" alt="" />
            <h3>List them for sale</h3>
            <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis.</p>
          </div>
        </div>
      </section>

    <Footer />

  </div>
);
export default home;