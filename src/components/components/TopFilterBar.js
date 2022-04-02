import React, { memo, useCallback } from 'react';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { categories, status, itemsType } from './constants/filters';
import { filterCategories, filterStatus, filterItemsType, filterNftTitle } from '../../store/actions';

const TopFilterBar = () => {
    const dispatch = useDispatch();
    const handleCategory = useCallback((option) => {
        const { value } = option;
        dispatch(filterCategories({value, singleSelect: true}));
    }, [dispatch]);
    
    const handleStatus = useCallback((option) => {
        const { value } = option;
        dispatch(filterStatus({value, singleSelect: true}));
    }, [dispatch]);
    
    const handleItemsType = useCallback((option) => {
        const { value } = option;
        dispatch(filterItemsType({value, singleSelect: true}));
    }, [dispatch]);

    const filterNftTitles = useCallback((event) => {
        const value = event.target.value;
        dispatch(filterNftTitle(value));
    }, [dispatch]);

    const defaultValue = {
        value: null,
        label: 'Select Filter'
    };
    
    const customStyles = {
        option: (base, state) => ({
            ...base,
            background: "#fff",
            color: "#333",
            borderRadius: state.isFocused ? "0" : 0,
            "&:hover": {
                background: "#eee",
            }
        }),
        menu: base => ({
            ...base,
            borderRadius: 0,
            marginTop: 0
        }),
        menuList: base => ({
            ...base,
            padding: 0
        }),
        control: (base, state) => ({
            ...base,
            padding: 2
        })
    };

    return (
        <div className="items_filter">
            <ul onChange={handleCategory} className="explorerfilterlist">
                { categories && categories.map((item, index) => (
                    <li> {item.value} </li>
                ))}
            </ul>
            
            {/* <div className='dropdownSelect one'>
                <Select 
                    styles={customStyles} 
                    menuContainerStyle={{'zIndex': 999}}
                    options={[defaultValue, ...categories]}
                    onChange={handleCategory}
                />
            </div> */}
        </div>
    );
}

export default memo(TopFilterBar);