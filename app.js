window.addEventListener('load',() =>{
    fetch('data.json') // requête vers le fichier JSON
    .then(response => response.json()) // convertir la réponse textuelle en JSON
    .then(data => {
        // traiter les données
        console.log(data);
        console.log(data[0].name)
        setTrackList(data)


    });
})

function setTrackList(data){
    // récupération du template
    let template = document.getElementById('trackCard');

    // parcourir les chansons
    for (let i = 0; i < data.length; i++) {
        // faire un clone tu template
        const clone = template.content.cloneNode(true);
        let rank = i + 1

        // remplir le clone
        clone.querySelector('.card-title').textContent = data[i].name;
        clone.querySelector('.card-text').textContent = artists;
        clone.querySelector('.card-img-top').src = data[i].album.images[0].url;
        clone.querySelector('.card-img-top').alt = data[i].name;
        clone.querySelector('.card-header').textContent = "#" + rank;
        // ajouter le clone au DOM dans le conteneur
        document.getElementById('trackList').appendChild(clone);
    }
}

// Définition de la fonction getDisplayArtists
function getDisplayArtists(artists) {
    // Votre logique pour obtenir les artistes affichables
    // Par exemple, concaténer les noms des artistes séparés par des virgules
    return artists.map(artist => artist.name).join(', ');
}
