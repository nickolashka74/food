import {openModal, closeModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, showModalByTimerId) {
    // Forms

    const forms = document.querySelectorAll(formSelector),
          message = {
              load: 'src/img/form/spinner.svg',
              success: 'Спасибо! Мы скоро с вами свяжемся',
              fail: 'Что-то пошло не так...'
          };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.load;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
            })
            .catch(() => showThanksModal(message.fail))
            .finally(() => form.reset());
        });
    }

    function showThanksModal(message) {
        const prevModalDilog = document.querySelector('.modal__dialog');

        prevModalDilog.classList.add('hide');
        openModal('.modal', showModalByTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDilog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }
}

export default forms;