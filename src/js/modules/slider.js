import {getZero} from './timer';

function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // Slider

    const slider = document.querySelector(container),
          sliderWrapper = slider.querySelector(wrapper),
          sliderField = sliderWrapper.querySelector(field),
          slides = sliderField.querySelectorAll(slide),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          width = window.getComputedStyle(sliderWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    total.textContent = getZero(slides.length);
    current.textContent = getZero(slideIndex);

    sliderField.style.cssText = `
        width: ${slides.length}00%;
        display: flex;
        transition: .5s all;
    `;

    sliderWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    const indicators = document.createElement('ul'),
          dots = [];
    
    slider.style.position = 'relative';
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        indicators.append(dot);
        if (i == 0) {
            dot.style.opacity = 1;
        }
        dots.push(dot);
    }

    function deleteNotDigits(arg) {
        return +arg.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        sliderField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex += 1;
        }

        current.textContent = getZero(slideIndex);

        dots.forEach(dot => dot.style.opacity = 0.5);
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        sliderField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex -= 1;
        }

        current.textContent = getZero(slideIndex);

        dots.forEach(dot => dot.style.opacity = 0.5);
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            
            slideIndex = +slideTo;

            offset = deleteNotDigits(width) * (slideTo - 1);
            sliderField.style.transform = `translateX(-${offset}px)`;

            dots.forEach(dot => dot.style.opacity = 0.5);
            dots[slideTo - 1].style.opacity = 1;

            current.textContent = getZero(slideIndex);
        });
    });
}

export default slider;