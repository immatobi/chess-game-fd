import $ from 'jquery';

var interval;

let body = {};

body.changeBackground = (cn) => {

    const elem = document.querySelector('.body');

    if(elem){
        elem.classList.add(cn);
    }

}

body.dismissBackground = (cn) => {

    const elem = document.querySelector('.body');

    if(elem){
        elem.classList.remove(cn)
    }

}

body.splitQueries = (q, key) => {

    let value;

    for(let i = 0; i < q.length; i++){

        let pair = q[i].split('=');
        if(pair[0] === key){
            value = pair[1];
        }

    }

    return value;

}

body.fitMenus = () => {

    var boxMenus = document.querySelectorAll('#select-box');

    for(let i = 0; i < boxMenus.length; i++){

        var selectBoxMenu = $(boxMenus[i]).children('.menu')[0];
        var selectBoxSearch = $(selectBoxMenu).children('.menu-search')[0];
        var selectBoxSearchInput = $(selectBoxSearch).children('.menu-search__input')[0];
        var selectControl = $(boxMenus[i]).children('.control')[0];
        var selectIndicator = $(selectControl).children('.indicator-box')[0];
        var selectBoxSingle = $(selectControl).children('.single')[0];
        var indicator = $(selectIndicator).children('.indicator')[0];
        var arrow = $(indicator).children('.arrow')[0];
        var path = $(arrow).children('path')[0];

        $(selectControl).attr('id', `select-box-control-${i}`);
        $(selectBoxMenu).attr('id', `select-box-menu-${i}`);
        $(selectBoxSearch).attr('id', `select-box-search-${i}`)
        $(selectBoxSearchInput).attr('id', `select-box-input-${i}`)
        $(selectBoxSingle).attr('id', `select-box-single-${i}`);
        $(indicator).attr('id', `select-box-indicator-${i}`);
        $(arrow).attr('id', `select-box-arrow-${i}`);
        $(path).attr('id', `select-box-path-${i}`);
        
    }

}

body.hideMenu = () => {

    var boxMenus = document.querySelectorAll('#select-box');

    window.onclick=function(e) {

        // console.log(e.target);

        for(let j = 0; j < boxMenus.length; j++){

            var selectBoxMenu = document.getElementById(`select-box-menu-${j}`);
            var selectBoxSearch = document.getElementById(`select-box-search-${j}`);
            var selectBoxInput = document.getElementById(`select-box-input-${j}`);
            var selectBoxSingle = document.getElementById(`select-box-single-${j}`);
            var indicator = document.getElementById(`select-box-indicator-${j}`);
            var arrow = document.getElementById(`select-box-arrow-${j}`);
            var path = document.getElementById(`select-box-path-${j}`);
            var control = document.getElementById(`select-box-control-${j}`);

            var singleLabel = $($(control).children()[0]).children('.single__label')[0];
            var singlePlace = $($($(control).children()[0]).children('.single__placeholder')[0]).children('span');
            var singleImage = $($($(control).children()[0]).children('.single__image')[0]).children('img')[0];

            if(e.target !== selectBoxMenu && e.target !== selectBoxSingle && 
                e.target !== indicator && e.target !== arrow && e.target !== path && e.target !== singleImage
                && e.target !== selectBoxSearch && e.target !== selectBoxInput && e.target !== singlePlace
                && e.target !== control && e.target !== singleLabel) {

                if($(selectBoxMenu).hasClass('is-open')){
                    $(selectBoxMenu).removeClass('is-open');
                }
    
            }else{

                if($(selectBoxMenu).hasClass('is-open')){
                    console.log('');
                }

                // $(selectBoxMenu).addClass('is-open');

            }

        }
        
    }

}

body.initDrop = () => {
    body.fitMenus();
    body.hideMenu();
}

body.fixNav = () => {

    window.addEventListener('scroll', (e) => {

        console.log(window.scrollY);
        const headBox = $('.header.header-nav');

        if(window.scrollY > 96){
            headBox.addClass('blocked');
        }else {
            headBox.removeClass('blocked');
            if(headBox.hasClass('flat')){
                headBox.addClass('blocked');
            }
        }

    })

}

body.fixSpecialNav = () => {

    window.addEventListener('scroll', (e) => {

        console.log(window.scrollY);
        const navHead = $('.nav-head');

        if(window.scrollY > 40){
            navHead.addClass('blocked')
        }else {
            navHead.removeClass('blocked')
        }

    })

}

body.getBase64Image = (data) => {

    const img = new Image();
    img.src = data;

    return img;

}

body.getBase64Dim = (data) => {

    let result = {
        width: '',
        height: ''
    }
    const img = new Image();
    img.src = data;

    img.onload = function() {
        result.width = img.naturalWidth.toString();
        result.height = img.naturalHeight.toString();
    };

    return result;

}

body.base64ImgIsSquare = (data) => {

    const rs = body.getBase64Dim(data);
    const { width, height } = rs;

    if(width === height){
        return true
    }else{
        return false;
    }

}

body.isObjectEmpty = (obj) => {
    return Object.getOwnPropertyNames(obj).length === 0 ? true : false;
}

body.isArrayEmpty = (arr) => {
    return arr.length <= 0 ? true : false;
}

body.arraymove = (arr, fromIndex, toIndex) =>  {

    const newArray = arr;
    var element = newArray[fromIndex];
    newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, element);
    return newArray;
}

body.captialize = (s) => {

    return s.charAt(0).toUpperCase() + s.slice(1)

}

body.sortData = (data) => {

   const sorted = data.sort((a,b) => {
        if(a.name < b.name ) { return -1 }
        else if(a.name > b.name ) { return 1 }
        else { return 0 }
    })

    return sorted;

}

body.timer = (dur, disp) => {


    clearInterval(interval);

    let timer = dur, minutes, seconds;
    let elem;

     interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        elem = $(disp);
        elem.text(minutes + ":" + seconds);

        if(minutes === 0){
            clearInterval(interval);
        }else{

            if (--timer < 0) {
                timer = dur;
            }
            
        }

    }, 1000);

}


export default body;