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
        .then()
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
            console.log(jsonData);
            localStorage.setItem('token', jsonData.token);
            localStorage.setItem('userId', jsonData.userId);
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
            document.getElementById('practices').classList.remove('hidden');
            practices(jsonData);
            createPractice(jsonData);
            goals(jsonData);
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
                userId: data.user._id
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
        document.getElementById('goals').classList.add('hidden');

        practicesUl.innerHTML = '';
        for (let i=0; i < collection.practices.length; i++){
            practicesUl.innerHTML += `
                <li>
                    <button onclick="moreAboutPractice('${collection.practices[i]._id}')" practice-id="${collection.practices[i]._id}" class="practiceButton">${collection.practices[i].sport}</button>
                </li>
            `;
        };
    }
//


/* ---------------------------------------------------------------------------------------------------- */
/* PRACTICE'S DASHBOARD
/* ---------------------------------------------------------------------------------------------------- */

    const displayGoals = () => {
        document.getElementById('goals').classList.remove('hidden');
    }

    const displayWorkouts = () => {
        document.getElementById('workout').classList.remove('hidden');
    }

    const moreAboutPractice = (praticeId) => {
        document.getElementById('practices').classList.add('hidden');
        document.getElementById('goalPage').classList.remove('hidden');
        document.getElementById('displayGoals').classList.remove('hidden');
        document.getElementById('workoutPage').classList.remove('hidden');
        document.getElementById('displayWorkouts').classList.remove('hidden');
        document.getElementById('practiceId').value = praticeId;
    };


/* ---------------------------------------------------------------------------------------------------- */
/* GOALS
/* ---------------------------------------------------------------------------------------------------- */

// Create a goal

    const displayGoalForm = () => {
        let practiceId = document.getElementById('practiceId').value;
        document.getElementById('createGoal').classList.remove('hidden');
        document.getElementById('goalForm').innerHTML += `<button type="submit" onclick="createGoal('${practiceId}')">Enregistrer</button>`;
        document.getElementById('goalForm').classList.remove('hidden');
    };

    const createGoal = (practiceId) => {
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
                    break;
                }
            }

        new FETCHrequest(
            apiUrl + '/goal/create',
            'POST',
            {
                label: goalTag.value,
                status: status,
                practiceId: practiceId,
                userId: localStorage.getItem('userId')
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


// Display Goals by practice and user
    const goals = collection => {
        let practiceId = '';
        for (let button of document.querySelectorAll('.practiceButton')) {
            button.addEventListener('click', () => {
                practiceId = button.getAttribute('practice-id');

                goalsUl.innerHTML = '';
                for (let i=0; i < collection.goals.length; i++) {
                    if (collection.goals[i].practiceId === practiceId) {
                        goalsUl.innerHTML += `
                            <div>
                                <li>${collection.goals[i].label}</li>
                                <p>${collection.goals[i].status} </p>
                            </div>
                        `;
                    }
                };
            })
        };
    }
//


/* ---------------------------------------------------------------------------------------------------- */
/* WORKOUTS
/* ---------------------------------------------------------------------------------------------------- */


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
        displayConnectionForm();
        document.querySelector('#registerForm').classList.remove('hidden');
        document.querySelector('#loginForm').classList.remove('hidden');
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
