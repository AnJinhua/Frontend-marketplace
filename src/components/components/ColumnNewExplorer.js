import React, { memo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../../store/selectors';
import CustomCollection from "./CustomCollection";
import { fetchHotCollections } from "../../store/actions/thunks";
import api from "../../core/api";

//react functional component
const ColumnNewExplorer = ({ showLoadMore = true, shuffle = false, authorId = null }) => {

    const dispatch = useDispatch();    
    const hotCollectionsState = useSelector(selectors.hotCollectionsState);
    const hotCollections = hotCollectionsState.data ? hotCollectionsState.data : [];
  
    useEffect(() => {
      dispatch(fetchHotCollections());
  }, [dispatch]);

    return (
        <div className='row'>
            { hotCollections && hotCollections.map((item, index) => (
                <div className='col-lg-4 col-md-6 col-sm-12'><CustomCollection
                key={index}
                index={index + 1}
                avatar={api.baseUrl + item.author.avatar.url}
                banner={api.baseUrl + item.banner.url}
                username={item.name}
                description={item.Description}
                collectionId={item.id}
                /></div>
            ))}
        </div>              
    );
};

export default memo(ColumnNewExplorer);