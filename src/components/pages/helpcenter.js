import React from 'react';
import Footer from '../components/footer';
import { Link } from '@reach/router';
import { createGlobalStyle } from 'styled-components';
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar .search #quick_search{
    color: #000000;
    background: rgba(255, 255, 255, .1);
    border: 1px solid #000000;
  }
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
  .card-header .btn {
    color: #000000;
  }
`;

const logintwo= () => (
<div>
<GlobalStyles/>

  <section className='jumbotron breadcumb no-bg' style={{backgroundImage: `url(${'./img/background/helpcenter.png'})`, marginTop: 85}}>
    <div className='mainbreadcumb' style={{padding: "140px 0px"}}>
      <div className='container'>
        <div className='row'>
          <div className="col-md-8 offset-md-2 text-center">        

              <div className="spacer-20"></div>
              <form className="row" id='form_sb' name="myForm">
              <div className="col text-center">
                  <input className="helpcenterinput form-control" id='name_1' name='name_1' placeholder="Search" type='text'/> 
                  <span aria-hidden="true" className="icon_search helpcentericon"></span>
                  {/* <button id="btn-submit"><i className="arrow_right"></i></button> */}
              </div>
              </form>
              <div className="spacer-20"></div>
              
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className='container'>
    <div className="row" style={{background: "#f2f2f2", padding: "30px 15px"}} >
      <div className="col-lg-4 col-md-6 mb-4">
          <div className="feature-box f-boxed style-3 text-center">
              <div className="text">
                  <h4>Getting Started</h4>
                  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam.</p>
                  <Link to="" className="btn-main m-auto">Read more</Link>
              </div>
          </div>
      </div>    

      <div className="col-lg-4 col-md-6 mb-4">
          <div className="feature-box f-boxed style-3 text-center">
              <div className="text">
                  <h4>Buying</h4>
                  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam.</p>
                  <Link to="" className="btn-main m-auto">Read more</Link>
              </div>
          </div>
      </div>  

      <div className="col-lg-4 col-md-6 mb-4">
          <div className="feature-box f-boxed style-3 text-center">
              <div className="text">
                  <h4>Selling</h4>
                  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam.</p>
                  <Link to="" className="btn-main m-auto">Read more</Link>
              </div>
          </div>
      </div>  

      <div className="col-lg-4 col-md-6 mb-4">
          <div className="feature-box f-boxed style-3 text-center">
              <div className="text">
                  <h4>Creating</h4>
                  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam.</p>
                  <Link to="" className="btn-main m-auto">Read more</Link>
              </div>
          </div>
      </div>  

      <div className="col-lg-4 col-md-6 mb-4">
          <div className="feature-box f-boxed style-3 text-center">
              <div className="text">
                  <h4>Partners</h4>
                  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam.</p>
                  <Link to="" className="btn-main m-auto">Read more</Link>
              </div>
          </div>
      </div>  

      <div className="col-lg-4 col-md-6 mb-4">
          <div className="feature-box f-boxed style-3 text-center">
              <div className="text">
                  <h4>Developers</h4>
                  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam.</p>
                  <Link to="" className="btn-main m-auto">Read more</Link>
              </div>
          </div>
      </div>  
    </div>
  </section>

  <section className='container' style={{paddingTop: 0}}>
    <h2 style={{textAlign: "center", marginBottom: 30}}>Promoted Articles</h2>
    <div className="row">
      <div className="col-lg-10 col-md-10" style={{margin: "auto"}}>
        <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    How do I set my NFT as my Twitter profile picture?
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
                    eaque ipsa quae ab illo inventore veritatis et.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    How do I create an MyFencing account?
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body> 
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
                    eaque ipsa quae ab illo inventore veritatis et.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                    What are the key terms to know in NFTs and Web3?
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="3">
                <Card.Body> 
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
                  eaque ipsa quae ab illo inventore veritatis et.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="3">
                  How do I create an NFT?
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="3">
                <Card.Body> 
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
                  eaque ipsa quae ab illo inventore veritatis et.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
        </Accordion>
      </div>
    </div>
  </section>

  <Footer />
</div>

);
export default logintwo;