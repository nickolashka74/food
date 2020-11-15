import {openModal, closeModal} from './modal';

function forms(showModalByTimerId) {
    // Forms

    const forms = document.querySelectorAll('form'),
          message = {
              load: 'src/img/form/spinner.svg',
              success: 'Спасибо! Мы скоро с вами свяжемся',
              fail: 'Что-то пошло не так...'
          };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

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