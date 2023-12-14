document.addEventListener('mousedown', function (event) {
    var form = document.getElementById('myform');
    var loginForm = document.getElementById('myform_login');
    var blurContainer = document.querySelector('.blur-container');

    if (!form.contains(event.target) && form.style.display === 'block') {
        closeForm();
    }

    if (!loginForm.contains(event.target) && loginForm.style.display === 'block') {
        closeForm();
    }
});

function openForm() {
    document.getElementById('myform').style.display = 'block';
    document.querySelector('.blur-container').classList.add('blur');
}

function closeForm() {
    document.getElementById('myform').style.display = 'none';
    document.getElementById('myform_login').style.display = 'none';
    document.querySelector('.blur-container').classList.remove('blur');
}

function openLoginForm() {
    closeForm(); // Close myform before opening myform_login
    document.getElementById('myform_login').style.display = 'block';
    document.querySelector('.blur-container').classList.add('blur');
}
function closeLoginForm() {
      document.getElementById('myform_login').style.display = 'none';
      document.querySelector('.blur-container').classList.remove('blur');
}
// test nic neznamená
console.log('test')