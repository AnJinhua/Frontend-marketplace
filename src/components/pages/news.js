import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { navigate } from '@reach/router';
import * as selectors from '../../store/selectors';
import { getBlogPosts } from "../../store/actions/thunks";
import api from "../../core/api";
import moment from "moment";
import Slider from "react-slick";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #000000;
  }
  header#myHeader .dropdown-toggle::after{
    color: #000000;
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: block !important;
  }
`;

const News = () => {
  const navigateTo = (link) => {
      navigate(link);
  }

  const dispatch = useDispatch();
  const blogsState = useSelector(selectors.blogsState);
  const blogPosts = blogsState.data ? blogsState.data : [];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  useEffect(() => {
      dispatch(getBlogPosts());
  }, [dispatch]);
  
return (
  <div>
  <GlobalStyles/>

    {/* <section className='jumbotron breadcumb no-bg'>
      <div className='mainbreadcumb'>
        <div className='container'>
          <div className='row m-10-hor'>
            <div className='col-12 text-center'>
              <h1>Blogs</h1>
            </div>
          </div>
        </div>
      </div>
    </section> */}

    <section className='container'>
      <div className="topbannerbloglist">
        <Slider {...settings}>
          {blogPosts && blogPosts.map((blog, index) => (            
              <div className="post-content">
                  <div className="topleft">
                      <img alt="" src={api.baseUrl + blog.cover.url} className="lazy"/>
                  </div>
                  <div className="topright">                  
                      <h2><span>{blog.title}<span></span></span></h2>
                      <p>{blog.content.substring(0, 250)}...</p>
                      <span onClick={() => navigateTo(`news/${blog.id}`)} className="btn-main">Read more</span>
                  </div>
              </div>            
          ))}
        </Slider>
      </div>
      <div className="mainbloglist">
          <div className="row">
            {blogPosts && blogPosts.map((blog, index) => (
              <div className="col-lg-4 col-md-6 mb30" key={index}>
                <div className="bloglist item">
                    <div className="post-content">
                        <div className="post-image">
                            <img alt="" src={api.baseUrl + blog.cover.url} className="lazy"/>
                        </div>
                        <div className="post-text">
                            <span className="p-tagline">Tips &amp; Tricks</span>                        
                            <h4><span>{blog.title}<span></span></span></h4>
                            <p>{blog.content.substring(0, 134)}...</p>
                            <span className="p-date">{moment(blog.timestamp).format('L, LT')}</span>
                            <span onClick={() => navigateTo(`news/${blog.id}`)} className="btn-main" style={{ float: "right" }}>Read more</span>
                        </div>
                    </div>
                </div>
              </div>
            ))}

              <div className="spacer-single"></div>
                      
              <ul className="pagination">
                  <li><span className='a'>Prev</span></li>
                  <li className="active"><span className='a'>1</span></li>
                  <li><span className='a'>2</span></li>
                  <li><span className='a'>3</span></li>
                  <li><span className='a'>4</span></li>
                  <li><span className='a'>5</span></li>
                  <li><span className='a'>Next</span></li>
              </ul>
              
          </div>
      </div>
    </section>

    <Footer />
  </div>
  )
};

export default memo(News);