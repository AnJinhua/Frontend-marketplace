import React, { memo, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import ColumnNewAuthor from '../components/ColumnNewAuthor';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import * as selectors from '../../store/selectors';
import { fetchAuthorList } from "../../store/actions/thunks";
import api from "../../core/api";
import { connectWallet, getCurrentWalletConnected, } from "../../core/nft/interact";
import NftCardAuthor from '../components/NftCardAuthor';
import auth from '../../core/auth';
// import NftMusicCard from '../components/NftMusicCard';

import axios from 'axios'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import {nftmarketaddress} from '../config'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #fff;
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

const Colection = ({ authorId }) => {
const [openMenu, setOpenMenu] = React.useState(true);
const [openMenu1, setOpenMenu1] = React.useState(false);
const [openMenu2, setOpenMenu2] = React.useState(false);
const [walletAddress, setWallet] = useState("");
const [status, setStatus] = useState("");
const [nfts, setNfts] = useState([])
const [loadingState, setLoadingState] = useState('not-loaded')
const handleBtnClick = () => {
  setOpenMenu(!openMenu);
  setOpenMenu1(false);
  setOpenMenu2(false);
  document.getElementById("Mainbtn").classList.add("active");
  document.getElementById("Mainbtn1").classList.remove("active");
  document.getElementById("Mainbtn2").classList.remove("active");
};
const handleBtnClick1 = () => {
  setOpenMenu1(!openMenu1);
  setOpenMenu2(false);
  setOpenMenu(false);
  document.getElementById("Mainbtn1").classList.add("active");
  document.getElementById("Mainbtn").classList.remove("active");
  document.getElementById("Mainbtn2").classList.remove("active");
};
const handleBtnClick2 = () => {
  setOpenMenu2(!openMenu2);
  setOpenMenu(false);
  setOpenMenu1(false);
  document.getElementById("Mainbtn2").classList.add("active");
  document.getElementById("Mainbtn").classList.remove("active");
  document.getElementById("Mainbtn1").classList.remove("active");
};

const dispatch = useDispatch();
const authorsState = useSelector(selectors.authorsState);
const author = authorsState.data ? authorsState.data[0] : {};

useEffect(() => {
  dispatch(fetchAuthorList(authorId));
  loadNFTs();
}, [dispatch, authorId]);

async function loadNFTs() {
  const web3Modal = new Web3Modal({
    network: "mainnet",
    cacheProvider: true,
  })  

  let connection = null
  try {
    connection = await web3Modal.connect()        
  } catch (error) {    
    return error(error || 'Error web3Modal.connect')
  }

  const provider = new ethers.providers.Web3Provider(connection)  
  const signer = provider.getSigner()  
  const marketplaceContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)    

  let data = null
  try {
    data = await marketplaceContract.fetchMyNFTs()        
  } catch (error) {    
    return error(error || 'Error marketplaceContract.fetchMyNFTs')
  }

  try {
    const items = await Promise.all(data.map(async (i) => {
      const tokenURI = await marketplaceContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenURI)
      const price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      const item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        tokenURI
      }
      return item
    }))
    setNfts(items)
    setLoadingState('loaded')       
  } catch (error) {    
    setLoadingState('loaded')
    return error(error || 'Error get NFT List')
  }
}

function listNFT(nft) {
  // console.log('nft:', nft)
  router.push(`/nft-demo/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)
}

console.log(nfts);

return (
<div>
<GlobalStyles/>
  { author.banner && 
    <section id='profile_banner' className='jumbotron breadcumb no-bg' style={{backgroundImage: `url(${api.baseUrl + author.banner.url})`}}>
      <div className='mainbreadcumb'>
      </div>
    </section>
  }

  <section className='container no-bottom'>
    <div className='row'>
      <div className="col-md-12">
         <div className="d_profile de-flex">
              <div className="de-flex-col">
                  <div className="profile_avatar">                                          
                      <img src={(author && author.avatar && author.avatar.url) ? (api.baseUrl + author.avatar.url) : (api.baseUrl + "/uploads/author_default.jpg")} alt="" style={{width: '150px', height: '150px'}}/>
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                          <h4>
                            {author.username}                                          
                              <span className="profile_username">{author.social}</span>
                              <span id="wallet" className="profile_wallet">{author.wallet}</span>
                              <button id="btn_copy" title="Copy Text">Copy</button>
                          </h4>
                      </div>
                  </div>
              </div>
              <div className="profile_follow de-flex">
                  <div className="de-flex-col">
                      <div className="profile_follower">{author.followers} followers</div>
                  </div>
                  <div className="de-flex-col">
                      <span className="btn-main">Follow</span>
                  </div>
              </div>

          </div>
      </div>
    </div>
  </section>

  <section className='container no-top'>
        <div className='row'>
          <div className='col-lg-12'>
              <div className="items_filter">
                <ul className="de_nav text-left">
                    <li id='Mainbtn' className="active"><span onClick={handleBtnClick}>On Sale</span></li>
                    <li id='Mainbtn1' className=""><span onClick={handleBtnClick1}>Owned</span></li>
                    <li id='Mainbtn2' className=""><span onClick={handleBtnClick2}>Liked</span></li>
                </ul>
            </div>
          </div>
        </div>
      {openMenu && (  
        <div id='zero1' className='onStep fadeIn'>
         <ColumnNewAuthor shuffle showLoadMore={false} authorId={author.id}/>
        </div>
      )}
      {openMenu1 && ( 
        <div id='zero2' className='onStep fadeIn'>
         <ColumnNewAuthor shuffle showLoadMore={false} authorId={author.id}/>
        </div>
      )}
      {openMenu2 && ( 
        <div id='zero3' className='onStep fadeIn'>
         <ColumnNewAuthor shuffle showLoadMore={false}/>
        </div>
      )}
      </section>


  <Footer />
</div>
);
}
export default memo(Colection);