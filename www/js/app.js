/*
DECLARATIONS
*/
  const apiUrl = 'http://localhost:6985/api';

/*
FONCTIONS
*/

/* ---------------------------------------------------------------------------------------------------- */
/* USER CONNECTION
/* ---------------------------------------------------------------------------------------------------- */

    const displayConnectionForm = () => {
        document.getElementById('registerForm').classList.remove('hidden');
        document.getElementById('loginForm').classList.remove('hidden');
    };

// REGISTER
    const register = (formTag, nameTag, emailTag, passwordTag) => {
        // get form
        document.querySelector(formTag).addEventListener('submit', event => {
            console.log('click');
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

    /* const userRegistered = () => {
        registerAdded.innerHTML += `
        <p> You've been well registered.<br/><span>Please log you in to access your session</span></p>
        `;
        document.getElementById('registerForm').classList.add('hidden');
        document.getElementById('registerAdded').classList.add('show');
    }; */
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
            document.getElementById('connect').classList.add('hidden');
            document.getElementById('registerForm').classList.add('hidden');
            document.getElementById('loginForm').classList.add('hidden');
            console.log(jsonData);
            practices(jsonData);
            createPractice(jsonData);
            goals(jsonData);
            createGoal(jsonData);
        })
        .catch( jsonError => console.log(jsonError))
    };
//

/* ---------------------------------------------------------------------------------------------------- */
/* PRACTICES
/* ---------------------------------------------------------------------------------------------------- */

// Create a practice

    // Display creation form
    const displayPracticeForm = () => {
        document.getElementById('practiceForm').classList.remove('hidden');
    };

    const createPractice = data => {

        const formTag = document.querySelector('#practiceForm');
        const practiceTag = document.querySelector('#practiceForm [name="practice"]');

        // get form
        formTag.addEventListener('submit', event => {
            event.preventDefault();

        new FETCHrequest(
            apiUrl + '/practice/create',
            'POST',
            {
                sport: practiceTag.value,
/*                 goalId: data.goals.label,
 */                userId: data.user._id
            }
        )
        .sendRequest()
        .then(jsonData => console.log(jsonData))
        .catch(jsonError => console.log(jsonError))

        setTimeout(() => {
            userAccount();
            document.getElementById('practiceForm').classList.add('hidden');
            }, 500)
        })
    };
//


// Display Practices by user
    const practices = collection => {
        practicesUl.innerHTML = '';

        for (let i=0; i < collection.practices.length; i++){
        practicesUl.innerHTML += `
            <div>
                <li><button onclick="moreAboutPractice()">${collection.practices[i].sport}</button></li>
            </div>
        `;
        };
    }
//


/* ---------------------------------------------------------------------------------------------------- */
/* GOALS
/* ---------------------------------------------------------------------------------------------------- */

    const moreAboutPractice = () => {
        document.getElementById('practices').classList.add('hidden');
        document.getElementById('goals').classList.remove('hidden');
    };

// Create a practice

    const displayGoalForm = () => {
        document.getElementById('createGoal').classList.remove('hidden');
        document.getElementById('goalForm').classList.remove('hidden');
    };

    const createGoal = data => {

        const formTag = document.querySelector('#goalForm');
        const goalTag = document.querySelector('#goalForm [name="goal"]');
        const statusTag = document.querySelectorAll('[name="status"]');

        // get form
        formTag.addEventListener('submit', event => {
            let status = null;
            event.preventDefault();

            for (let i=0; i < statusTag.length; i++){
                if(statusTag[i].checked){
                    status = statusTag[i].value;
                    console.log(status);
                    break;
                }
            }


        new FETCHrequest(
            apiUrl + '/goal/create',
            'POST',
            {
                label: goalTag.value,
                status: status,
                practiceId: data.practices._id,
                userId: data.user._id
            }
        )
        .sendRequest()
        .then(jsonData => console.log(jsonData))
        .catch(jsonError => console.log(jsonError))

        setTimeout(() => {
            userAccount();
            document.getElementById('goalForm').classList.add('hidden');
            }, 500)
        })
    };
//


// Display Goals by user
    const goals = collection => {
        goalsUl.innerHTML = '';

        for (let i=0; i < collection.goals.length; i++){
        goalsUl.innerHTML += `
            <div>
                <li>${collection.goals[i].label}</li>
                <p>${collection.goals[i].status} </p>
            </div>
        `;
        };
    }
//


/*
Attendre le chargement du DOM
*/

document.addEventListener('DOMContentLoaded', () => {

    if(localStorage.getItem('token') !== null){
        // Récupérer info user avec le token
        userAccount();
        document.querySelector('#practices').classList.remove('hidden');
        document.querySelector('#createPractice').classList.remove('hidden');
    }
    else {
        document.querySelector('#registerForm').classList.remove('hidden');
        document.querySelector('#loginForm').classList.remove('hidden');
        displayConnectionForm();
    }

    register(
        '#registerForm',
        '#registerForm [name="name"]',
        '#registerForm [name="email"]',
        '#registerForm [name="password"]'
    );
    login(
        '#loginForm',
        '#loginForm [name="email"]',
        '#loginForm [name="password"]'
    );
})
