import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Clock from "../components/Clock";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import * as selectors from '../../store/selectors';
import { fetchNftDetail } from "../../store/actions/thunks";
/*import Checkout from "../components/Checkout";
import Checkoutbid from "../components/Checkoutbid";*/
import api from "../../core/api";
import moment from "moment";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { ethers } from 'ethers'
import axios from 'axios'
import Web3Modal from 'web3modal'
import { nftmarketaddress } from '../config'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
    border-bottom: solid 1px #dddddd;
  }
  .mr40{
    margin-right: 40px;
  }
  .mr15{
    margin-right: 15px;
  }
  .btn2{
    background: #f6f6f6;
    color: #8364E2 !important;
  }
  @media only screen and (max-width: 1199px) {
    .navbar{
      background: #403f83;
    }
    .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
      background: #111;
    }
    .item-dropdown .dropdown a{
      color: #111 !important;
    }
  }
`;

const ItemDetailRedux = ({ nftId }) => {

    const [openMenu0, setOpenMenu0] = React.useState(true);
    const [nfttitle, setNftTitle] = React.useState(false);
    const [nftdesc, setNftDesc] = React.useState(false);  
    const [nftimage, setNftImage] = React.useState(false);    
    const [nftprice, setNftPrice] = React.useState(false);    
    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')

    const dispatch = useDispatch();
    const nftDetailState = useSelector(selectors.nftDetailState);
    const nft = nftDetailState.data ? nftDetailState.data : [];

    const [openCheckout, setOpenCheckout] = React.useState(false);
    const [openCheckoutbid, setOpenCheckoutbid] = React.useState(false);

    useEffect(() => {
        dispatch(fetchNftDetail(nftId));
        loadNFTs(nftId);
    }, [dispatch, nftId]);

    async function loadNFTs(nftId) {        
        const provider = new ethers.providers.JsonRpcProvider("https://matic-mumbai.chainstacklabs.com")                
        const contract = new ethers.Contract(nftmarketaddress, Market.abi, provider)        
    
        let data = null
        try {
          data = await contract.fetchItemProperty(nftId)          
        } catch (error) {          
          return (error || 'Error contract.fetchMarketItems')
        }        
                console.log("data===" + data);
        const response = await axios.get(data.toString().split(',')[1]);      
        setNftTitle(response.data.name)
        setNftDesc(response.data.description)  
        setNftImage(response.data.image) 
        const nftprice_value = data.toString().split(',')[7] / 1000000000000000000;
        setNftPrice(nftprice_value)          
        
        // try {
        //   const items = await Promise.all(data.map(async (i) => {
        //     const tokenUri = await contract.tokenURI(i.id)
        //     const meta = await axios.get(tokenUri)
        //     const price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        //     const item = {
        //       price,
        //       id: i.id.toNumber(),
        //       seller: i.seller,
        //       owner: i.owner,
        //       image: meta.data.image,
        //       name: meta.data.name,
        //       description: meta.data.description,
        //     }
        //     return item
        //   }))
        //   setNfts(items)
        //   setLoadingState('loaded')          
        // } catch (error) {          
        //   setLoadingState('loaded')
        //   return (error || 'Error get NFT List')
        // }
    }

    async function buyNft(nft) {
        /* needs the user to sign the transaction, so will use Web3Provider and sign it */
        const web3Modal = new Web3Modal()
    
        let connection = null
        try {
          connection = await web3Modal.connect()          
        } catch (error) {          
          return (error || 'Error Connection')
        }
    
        const provider = new ethers.providers.Web3Provider(connection)    
        const signer = provider.getSigner()        
        const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)        
        const price = ethers.utils.parseUnits(nftprice.toString(), 'ether')   
        console.log("price--" + price) 
             
        let transaction = null
        try {
          transaction = await contract.createMarketSale(nft.id, {
            value: price
          });   
          console.log(transaction);        
        } catch (error) {   
            console.log(error);         
          return (error || 'Error transaction')
        }
        
    
        try {
          await transaction.wait()
          loadNFTs(nftId)          
        } catch (error) {          
          return (error || 'Error transaction.wait')
        }
    }
     
    loadNFTs(nftId);
    // console.log(nft);

    return (
        <div>
        <GlobalStyles/>
            <section className='container'>
                <div className='row mt-md-5 pt-md-4'>
                    <div className="col-md-6 text-center">

                        <img src={ nftimage } className="img-fluid img-rounded mb-sm-30" alt=""/>
                        
                        <Accordion defaultActiveKey="0" className="mt-5">
                            <Card>
                                <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    <span aria-hidden="true" className="icon_tag_alt" style={{ color: "#28a9c6" }}></span> Properties
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <div className="row">
                                            <div className="col-lg-4 col-md-6 col-sm-6">
                                                <div className="nft_attr">
                                                    <h5>Background</h5>
                                                    <h4>Yellowish Sky</h4>
                                                    <span>85% have this trait</span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-6">
                                                <div className="nft_attr">
                                                    <h5>Eyes</h5>
                                                    <h4>Purple Eyes</h4>
                                                    <span>14% have this trait</span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-6">
                                                <div className="nft_attr">
                                                    <h5>Nose</h5>
                                                    <h4>Small Nose</h4>
                                                    <span>45% have this trait</span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-6">
                                                <div className="nft_attr">
                                                    <h5>Mouth</h5>
                                                    <h4>Smile Red Lip</h4>
                                                    <span>61% have this trait</span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-6">
                                                <div className="nft_attr">
                                                    <h5>Neck</h5>
                                                    <h4>Pink Ribbon</h4>
                                                    <span>27% have this trait</span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-6">
                                                <div className="nft_attr">
                                                    <h5>Hair</h5>
                                                    <h4>Pink Short</h4>
                                                    <span>35% have this trait</span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-6">
                                                <div className="nft_attr">
                                                    <h5>Accessories</h5>
                                                    <h4>Heart Necklace</h4>
                                                    <span>33% have this trait</span>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-sm-6">
                                                <div className="nft_attr">
                                                    <h5>Hat</h5>
                                                    <h4>Cute Panda</h4>
                                                    <span>62% have this trait</span>
                                                </div>
                                            </div>      
                                            <div className="col-lg-4 col-md-6 col-sm-6">
                                                <div className="nft_attr">
                                                    <h5>Clothes</h5>
                                                    <h4>Casual Purple</h4>
                                                    <span>78% have this trait</span>
                                                </div>
                                            </div> 
                                        </div>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                    <span aria-hidden="true" className="icon_adjust-horiz" style={{ color: "#28a9c6" }}></span> Levels
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                <Card.Body> 
                                    <div className="skill-bar style-2">
                                        <h5>Edition</h5>
                                        <div className="de-progress">
                                            <div className="progress-bar" style={{width: `60%` }}>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="skill-bar style-2">
                                        <h5>Rarity</h5>
                                        <div className="de-progress">
                                            <div className="progress-bar" style={{width: `70%` }}>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="skill-bar style-2">
                                        <h5>Popularity</h5>
                                        <div className="de-progress">
                                            <div className="progress-bar" style={{width: `40%` }}>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>                        

                    </div>
                    <div className="col-md-6">
                        <div className="item_info">
                            {nft.item_type === 'on_auction' &&
                                <>
                                    Auctions ends in 
                                    <div className="de_countdown">
                                        <Clock deadline={nft.deadline} />
                                    </div>
                                </>
                            }
                            <h2>{nfttitle}</h2>
                            {/* <div className="item_info_counts">
                                <div className="item_info_type"><i className="fa fa-image"></i>{nft.category}</div>
                                <div className="item_info_views"><i className="fa fa-eye"></i>{nft.views}</div>
                                <div className="item_info_like"><i className="fa fa-heart"></i>{nft.likes}</div>
                            </div> */}
                            <h4 style={{color: "#28A9C6"}}>Description</h4>
                            <p>{nftdesc}</p>

                            {/* <div className="d-flex flex-row">
                                <div className="mr40">
                                    <h6>Creator</h6>
                                    <div className="item_author">                                    
                                        <div className="author_list_pp">
                                            <span>
                                                <img className="lazy" src={nft.author && api.baseUrl + nft.author.avatar.url} alt=""/>
                                                <i className="fa fa-check"></i>
                                            </span>
                                        </div>                                    
                                        <div className="author_list_info">
                                            <span>{nft.author && nft.author.username}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mr40">
                                    <h6>Collection</h6>
                                    <div className="item_author">                                    
                                        <div className="author_list_pp">
                                            <span>
                                                <img className="lazy" src={nft.author && api.baseUrl + nft.author.avatar.url} alt=""/>
                                                <i className="fa fa-check"></i>
                                            </span>
                                        </div>                                    
                                        <div className="author_list_info">
                                            <span>{nft.author && nft.author.username}</span>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                            <div className="contractinformation">
                                <div className="inner">
                                    <h4>Contact Address:</h4>
                                    <p>0x732D312F9f0fA...</p>
                                </div>
                                <div className="inner">
                                    <h4>Token ID:</h4>
                                    <p>{nftId}</p>
                                </div>
                                <div className="inner">
                                    <h4>Blockchain:</h4>
                                    <p>Polygon</p>
                                </div>
                            </div>

                            <div className="spacer-40"></div>

                            <div className="de_tab">                          
           
                                {/* {openMenu0  && (  
                                <div className="tab-1 onStep fadeIn">
                                    <div className="d-block mb-3">
                                        <div className="mr40">
                                            <h6>Owner</h6>
                                            <div className="item_author">                                    
                                                <div className="author_list_pp">
                                                    <span>
                                                        <img className="lazy" src={nft.author && api.baseUrl + nft.author.avatar.url} alt=""/>
                                                        <i className="fa fa-check"></i>
                                                    </span>
                                                </div>                                    
                                                <div className="author_list_info">
                                                    <span>{nft.author && nft.author.username}</span>
                                                </div>
                                            </div>
                                        </div>                                        

                                    </div>
                                </div>
                                )}                                 */}


                                {/* button for checkout */}
                                
                                <div className="d-flex flex-row itemdetailprice">
                                    <div><span>Price:  </span>  <h2>{nftprice}</h2></div>
                                    <button className='btn-main lead mb-5 mr15' onClick={() => buyNft(nft)} >Buy</button>
                                </div>

                                <Accordion defaultActiveKey="0" className="mt-5">
                                    <Card>
                                        <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                            <span aria-hidden="true" className="arrow_left-right_alt" style={{ color: "#28a9c6" }}></span> Transaction History
                                        </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            {nft.history && nft.history.map((bid, index) => (
                                                <div className="p_list" key={index}>
                                                    <div className="p_list_pp">
                                                        <span>
                                                            <img className="lazy" src={api.baseUrl + bid.author.avatar.url} alt=""/>
                                                            <i className="fa fa-check"></i>
                                                        </span>
                                                    </div>                                    
                                                    <div className="p_list_info">
                                                        Bid {bid.author.id === nft.author.id && 'accepted'} <b>{bid.value} ETH</b>
                                                        <span>by <b>{bid.author.username}</b> at {moment(bid.created_at).format('L, LT')}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card>
                                        <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                            <span aria-hidden="true" className="icon_tag_alt" style={{ color: "#28a9c6" }}></span> Offers
                                        </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="1">
                                        <Card.Body> 
                                            {nft.history && nft.history.map((bid, index) => (
                                                <div className="p_list" key={index}>
                                                    <div className="p_list_pp">
                                                        <span>
                                                            <img className="lazy" src={api.baseUrl + bid.author.avatar.url} alt=""/>
                                                            <i className="fa fa-check"></i>
                                                        </span>
                                                    </div>                                    
                                                    <div className="p_list_info">
                                                        Bid {bid.author.id === nft.author.id && 'accepted'} <b>{bid.value} ETH</b>
                                                        <span>by <b>{bid.author.username}</b> at {moment(bid.created_at).format('L, LT')}</span>
                                                    </div>
                                                </div>
                                            ))}

                                            <div style={{ borderTop: "1px solid rgba(0,0,0,.125)", paddingTop: 20 }}>
                                                <button className='btn-main lead mr15' onClick={() => setOpenCheckoutbid(true)}>Make An Offer</button>
                                            </div>
                                        </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>    
    
                        </div>          
                    </div>
                </div>
            </div>
        </section>
        <Footer /> 
        { openCheckout &&
            <div className='checkout'>
            <div className='maincheckout'>
            <button className='btn-close' onClick={() => setOpenCheckout(false)}>x</button>
                <div className='heading'>
                    <h3>Checkout</h3>
                </div>
              <p>You are about to purchase a <span className="bold">AnimeSailorClub #304</span> 
              <span className="bold">from Monica Lucas</span></p>
                <div className='detailcheckout mt-4'>
                    <div className='listcheckout'>
                  <h6>
                    Enter quantity. 
                    <span className="color">10 available</span>
                  </h6>
                  <input type="text" name="buy_now_qty" id="buy_now_qty" className="form-control"/>
                    </div>

                </div>
                <div className='heading mt-3'>
                    <p>Your balance</p>
                    <div className='subtotal'>
                    10.67856 ETH
                    </div>
                </div>
              <div className='heading'>
                <p>Service fee 2.5%</p>
                <div className='subtotal'>
                0.00325 ETH
                </div>
              </div>
              <div className='heading'>
                <p>You will pay</p>
                <div className='subtotal'>
                0.013325 ETH
                </div>
              </div>
                <button className='btn-main lead mb-5'>Checkout</button>
            </div>
            </div>
        }
        { openCheckoutbid &&
            <div className='checkout'>
            <div className='maincheckout'>
            <button className='btn-close' onClick={() => setOpenCheckoutbid(false)}>x</button>
                <div className='heading'>
                    <h3>Place a Bid</h3>
                </div>
              <p>You are about to purchase a <span className="bold">AnimeSailorClub #304</span> 
              <span className="bold">from Monica Lucas</span></p>
                <div className='detailcheckout mt-4'>
                    <div className='listcheckout'>
                        <h6>
                         Your bid (ETH)
                        </h6>
                        <input type="text" className="form-control"/>
                    </div>
                </div>
                <div className='detailcheckout mt-3'>
                    <div className='listcheckout'>
                        <h6>
                         Enter quantity. 
                        <span className="color">10 available</span>
                        </h6>
                        <input type="text" name="buy_now_qty" id="buy_now_qty" className="form-control"/>
                    </div>
                </div>
                <div className='heading mt-3'>
                    <p>Your balance</p>
                    <div className='subtotal'>
                    10.67856 ETH
                    </div>
                </div>
              <div className='heading'>
                <p>Service fee 2.5%</p>
                <div className='subtotal'>
                0.00325 ETH
                </div>
              </div>
              <div className='heading'>
                <p>You will pay</p>
                <div className='subtotal'>
                0.013325 ETH
                </div>
              </div>
                <button className='btn-main lead mb-5'>Checkout</button>
            </div>
            </div>
        }

        </div>
    );
}

export default memo(ItemDetailRedux);