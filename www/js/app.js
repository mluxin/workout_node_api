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
        .then( jsonData => console.log(jsonData))
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
            /* document.getElementById('practices').classList.remove('hidden'); */
            displayPractices(jsonData);
            createPractice(jsonData);
            displayGoals(jsonData);
            createWorkout(jsonData);
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
    const displayPractices = collection => {
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

    const moreAboutPractice = (praticeId) => {
        document.getElementById('practices').classList.add('hidden');
        document.getElementById('goalPage').classList.remove('hidden');
        document.getElementById('displayGoals').classList.remove('hidden');
        document.getElementById('workoutPage').classList.remove('hidden');
        document.getElementById('displayWorkouts').classList.remove('hidden');
        document.getElementById('practiceId').value = praticeId;
    };

    const displayGoalsPart = () => {
        document.getElementById('goals').classList.remove('hidden');
        document.getElementById('workoutPage').classList.add('hidden');
    }

    const displayWorkoutsPart = () => {
        document.getElementById('workouts').classList.remove('hidden');
        document.getElementById('workoutPage').classList.remove('hidden');
        document.getElementById('goalPage').classList.add('hidden');
    }


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
    const displayGoals = collection => {

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

// Create a workout

    const displayWorkoutForm = () => {
        let practiceIdforWorkout = document.getElementById('practiceIdforWorkout').value;
        document.getElementById('createWorkout').classList.remove('hidden');
        document.getElementById('workoutForm').innerHTML += `<button type="submit" onclick="createWorkout('${practiceIdforWorkout}')">Enregistrer</button>`;
        document.getElementById('workoutForm').classList.remove('hidden');
    };

    const createWorkout = (practiceIdforWorkout) => {
        const formTag = document.querySelector('#workoutForm');
        const titleTag = document.querySelector('#workoutForm [name="workout_title"]');
        const dateTag = document.querySelector('#workoutForm [name="workout_date"]');
        const durationTag = document.querySelector('#workoutForm [name="workout_time"]');
        const commentTag = document.querySelector('#workoutForm [name="workout_comment"]');
        const intensityTag = document.querySelectorAll('[name="intensity"]');
        const moodTag = document.querySelectorAll('[name="mood"]');

        // get form
        formTag.addEventListener('submit', event => {
            let intensity = null;
            let mood = null;
            event.preventDefault();

            for (let i=0; i < intensityTag.length; i++){
                if(intensityTag[i].checked){
                    intensity = intensityTag[i].value;
                    break;
                }
            }

            for (let i=0; i < moodTag.length; i++){
                if(moodTag[i].checked){
                    mood = moodTag[i].value;
                    break;
                }
            }

        new FETCHrequest(
            apiUrl + '/workout/create',
            'POST',
            {
                title: titleTag.value,
                date: dateTag.value,
                duration: durationTag.value,
                comment: commentTag.value,
                intensity: intensity,
                mood: mood,
                practiceId: practiceIdforWorkout,
                userId: localStorage.getItem('userId')
            }
        )
        .sendRequest()
        .then(jsonData => console.log(jsonData))
        .catch(jsonError => console.log(jsonError))

        setTimeout(() => {
            userAccount();
            document.getElementById('workoutForm').classList.add('hidden');
            }, 500)
        })
        console.log(titleTag.value, dateTag.value, durationTag.value);
    };
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
       /*  document.getElementById('practices').classList.add('hidden'); */
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
