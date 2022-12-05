const input = document.querySelector('.login_input');
const button = document.querySelector('.butao');
const form = document.querySelector('.inicio')

function validateInput({ target}) {
    if (target.value.length > 2){
        button.removeAttribute('disabled');
        return;
    }

    button.setAttribute('disabled', '');
}

const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem('player', input.value);
    window.location = 'index.html';
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);