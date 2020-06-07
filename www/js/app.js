/*
DECLARATIONS
*/
  const apiUrl = 'http://localhost:6985/api';

/*
FONCTIONS
*/
const displayConnectionForm = () => {
    document.getElementById('registerForm').classList.remove('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
  };

// REGISTER AND LOGIN
const register = (formTag, emailTag, passwordTag, nameTag) => {
    // get form
    document.querySelector(formTag).addEventListener('submit', event => {
        event.preventDefault();

      new FETCHrequest(
        apiUrl + '/auth/signup',
        'POST',
        {
            name: document.querySelector(nameTag).value,
            email: document.querySelector(emailTag).value,
            password: document.querySelector(passwordTag).value
        }
      )
      .sendRequest()
      .then(userRegistered())
      .catch(jsonError => console.log(jsonError))
    })
  };

  const userRegistered = () => {
    registerAdded.innerHTML += `
    <p> You've been well registered.<br/><span>Please log you in to access your session</span></p>
    `;
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('registerAdded').classList.add('show');
  };
//


/*
Attendre le chargement du DOM
*/
document.addEventListener('DOMContentLoaded', () => {

    register(
        '#registerForm',
        '#registerForm [name="email"]',
        '#registerForm [name="password"]',
        '#registerForm [name="name"]'
    );
})
//
