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
import { navigate } from '@reach/router';
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

const [status, setStatus] = useState("");
const [nfts, setNfts] = useState([])
const [loadingState, setLoadingState] = useState('not-loaded')

const dispatch = useDispatch();
const authorsState = useSelector(selectors.authorsState);
const author = authorsState.data ? authorsState.data[0] : {};

useEffect(() => {
  loadNFTs();
}, []);

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
    data = await marketplaceContract.fetchMarketItems()        
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

const navigateTo = (link) => {
  navigate(link);
}

console.log(nfts);

return (
<div>
<GlobalStyles/>

    <section className='jumbotron breadcumb no-bg'>
      <div className='mainbreadcumb'>
        <div className='container'>
          <div className='row m-10-hor'>
            <div className='col-12'>
              <h1 className='text-center'>Explore Items</h1>
            </div>
          </div>
        </div>
      </div>
    </section>


    <section className='container'>
        <div className='row'>             
            {
              nfts.map((nft, i) => (
              <div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4">
                <div key={i} className="nft__item m-0">
                  <div className="nft__item_wrap">
                    <img src={nft.image} className="rounded" />
                  </div>                  
                  <div className="nft__item_info">      
                    <span onClick={() => navigateTo(`/ItemDetail/${nft.id}`)}>
                        <h4>Item {nft.tokenId}</h4>
                        <p>Item {nft.tokenId}</p>
                    </span>              
                    <div className="nft__item_price"><h4>Price</h4>{nft.price} ETH</div>                    
                    <div className="nft__item_action"><span onClick={() => navigateTo(`/ItemDetail/${nft.tokenId}`)}>Buy Now</span></div>
                    <div className="nft__item_like"><i className="fa fa-heart"></i><span>0</span></div>
                  </div>
                </div>
              </div>              
              ))
            } 
        </div>      
    </section>

  <Footer />
</div>
);
}
export default memo(Colection);