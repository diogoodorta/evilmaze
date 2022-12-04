const input = document.querySelector('.login_input');
const button = document.querySelector('.butao');

function validateInput({ target}) {
    if (target.value.length > 2){
        button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled', '');
    }
}

input.addEventListener('input', validateInput);