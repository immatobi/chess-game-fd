import React from 'react';

import DropSelect from '../globals/DropSelect'

const DropDown = ({ options, 
    className, 
    selected, 
    defaultValue, 
    placeholder, 
    search, 
    displayImage, 
    displayControlLeft, 
    displayOptionLeft, 
    displayLabel, 
    disabled,
    position 
    }) => {

    const onSelectChange = (sel) => {
        selected(sel);
    }
    
    const getDefault = () => {
        
        if(defaultValue && typeof(defaultValue) === 'object'){
            return defaultValue;
        }else if (defaultValue && typeof(defaultValue) === 'number'){
            return options ? options()[defaultValue] : options()[0];
        }else{
            return;
        }
        

    }



    return (
        <>

            <DropSelect 

                isSearchable={search === undefined ? false : search}
                disableSeparator={true}
                className={className ? className + ' font-metrolight' : ''} 
                controlDisplayImage={displayImage ? true : false}
                controlDisplayLabel={displayLabel ? true : false}
                controlDisplayLeft={displayControlLeft ? true : false} 
                optionDisplayLeft={displayOptionLeft ? true : false}
                optionDisplayImage={displayImage ? true : false}
                defaultValue={getDefault()}
                options={options}
                onChange={(item) => onSelectChange(item)} 
                placeholder={placeholder ? placeholder : 'Select option'}
                isDisabled={disabled ? disabled : false}
                menuPosition={position ? position : 'bottom'}
            />

        </>
    )

}

export default DropDown;