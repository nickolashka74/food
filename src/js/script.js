import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import openModal from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {

    const showModalByTimerId = setTimeout(() => openModal('.modal', showModalByTimerId), 5000);

    tabs();
    modal('.modal', '[data-modal]', showModalByTimerId);
    timer();
    cards();
    calc();
    forms(showModalByTimerId);
    slider();
});