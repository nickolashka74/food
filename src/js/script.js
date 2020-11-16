import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import {openModal} from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {

    const showModalByTimerId = setTimeout(() => openModal('.modal', showModalByTimerId), 50000);

    tabs('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
    modal('.modal', '[data-modal]', showModalByTimerId);
    timer('.timer', '2020-12-31');
    cards();
    calc();
    forms('form', showModalByTimerId);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
});