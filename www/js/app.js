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

// REGISTER
const register = (formTag, nameTag, emailTag, passwordTag) => {
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

// LOGIN
const login = (formTag, emailTag, passwordTag, token) => {
document.querySelector(formTag).addEventListener('submit', event => {
    event.preventDefault();

    new FETCHrequest(
    apiUrl + '/auth/login',
    'POST',
    {
        email: document.querySelector(emailTag).value,
        password: document.querySelector(passwordTag).value
    }
    )
    .sendRequest()
    .then( jsonData => {
        localStorage.setItem('token', jsonData.token);
        userAccount();
       })
    .catch( jsonError => console.log(jsonError))
    })

};
//

// User Account
const userAccount = () => {
    new FETCHrequest(
      apiUrl + '/auth/me',
      'GET',
      null,
      localStorage.getItem('token')
    )
    .sendRequest()
    .then( jsonData => {
        document.getElementById('hello').classList.remove('hidden');
        console.log(jsonData);
    })
    .catch( jsonError => console.log(jsonError))
};
//

/*
Attendre le chargement du DOM
*/

document.addEventListener('DOMContentLoaded', () => {

    if(localStorage.getItem('token') !== null){
        // Récupérer info user avec le token
        userAccount();
    }
    else{
        // Afficher les formulaires
        document.querySelector('#registerForm').classList.remove('hidden');
        document.querySelector('#loginForm').classList.remove('hidden');
        displayConnectionForm();
    }

    register(
        '#registerForm',
        '#registerForm [name="name"]',
        '#registerForm [name="email"]',
        '#registerForm [name="password"]',
    );
    login(
        '#loginForm',
        '#loginForm [name="email"]',
        '#loginForm [name="password"]'
    );

})
//
