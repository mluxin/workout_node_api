class FETCHrequest {

  constructor(url, requestType, data, token = null) {
      this.url = url;
      this.requestType = requestType;
      this.data = data;
      this.token = token

      // Définition du header de la requête
      this.fetchOptions = {
          method: requestType,
          headers: {
              'Content-Type': 'application/json',
              'x-access-token': token
          }
      };

      // Ajouter les données dans les requêtes POST et PUT
      if( this.requestType === 'POST' || this.requestType === 'PUT' || this.requestType === 'DELETE'){
          this.fetchOptions.body = JSON.stringify(data);
      };
  }

  sendRequest(){
      return new Promise( (resolve, reject) => {
          fetch( this.url, this.fetchOptions )
          .then( fetchResponse => {
              // Vérifier le status de la requête
              if( fetchResponse.ok ){
                  // Extraire les données JSON de la réponse
                  return fetchResponse.json();
              }
              else{
                  return fetchResponse.json()
                  .then( message => reject(message) )
              };
          })
          .then( jsonData => resolve(jsonData))
          .catch( jsonError => reject(jsonError));
      })
  }
}