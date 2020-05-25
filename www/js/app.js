
fetch('/api/workout/all')
.then( rawData => {

    if( rawData.ok ){
        return rawData.json()
    }
})
.then( jsonData => {
    for( let item of jsonData.data ){
        console.log(item)
    }
})
.catch( fetchError => {
    console.log(fetchError)
})

fetch('/api/auth/all')
.then( rawData => {

    if( rawData.ok ){
        return rawData.json()
    }
})
.then( jsonData => {
    for( let item of jsonData.data ){
        console.log(item)
    }
})
.catch( fetchError => {
    console.log(fetchError)
})