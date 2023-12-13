// on charge le fichier conf.json
fetch('conf.json')
  .then(response => response.json())
  .then(conf => {
    // On utilise les données de conf.json une fois chargées
    fetch(`https://api.weatherapi.com/v1/current.json?key=${conf.APIKey}&q=${conf.defaultCity}`)
      .then(response => response.json())
      .then(data => {
        // On traite les données ici et les afficher
        console.log(data);
        // On affiche les données de l'API
        const weatherDiv = document.querySelector('.weather-info');
        weatherDiv.innerHTML = `
          <h2>Météo pour ${conf.defaultCity}</h2>
          <p>Température : ${data.current.temp_c} °C</p>
          <p>Condition climatique : ${data.current.condition.text}</p>
          <p>Date dernière mise à jour : ${data.current.last_updated}</p>
          <img src="${data.current.condition.icon}" alt="Condition climatique" />
          <!-- Ajoute d'autres informations si nécessaire -->
        `;
      })
      .catch(error => console.error('Erreur lors de la récupération des données météo :', error));
  })
  .catch(error => console.error('Erreur lors du chargement du fichier de configuration (conf.json) :', error));
 
// Mise à jour des données toutes les heures
setInterval(() => {
  fetch('conf.json')
    .then(response => response.json())
    .then(conf => {
      fetch(`https://api.weatherapi.com/v1/current.json?key=${conf.APIKey}&q=${conf.defaultCity}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          const weatherDiv = document.querySelector('.weather-info');
          weatherDiv.innerHTML = `
            <h2>Météo pour ${conf.defaultCity}</h2>
            <p>Température : ${data.current.temp_c} °C</p>
            <p>Condition climatique : ${data.current.condition.text}</p>
            <p>Date dernière mise à jour : ${data.current.last_updated}</p>
            <img src="${data.current.condition.icon}" alt="Condition climatique" />
            <!-- Ajoute d'autres informations si nécessaire -->
          `;
        })
        .catch(error => console.error('Erreur lors de la récupération des données météo :', error));
    })
    .catch(error => console.error('Erreur lors du chargement du fichier de configuration (conf.json) :', error));
}, 3600000);