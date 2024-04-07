window.addEventListener('load',() =>{
    fetch('data.json') // requête vers le fichier JSON
    .then(response => response.json()) // convertir la réponse textuelle en JSON
    .then(data => {
        // traiter les données
        console.log(data);
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
        let artists= getDisplayArtists(data[i].artists);

        // remplir le clone
        clone.querySelector('.card-title').textContent = data[i].name;
        clone.querySelector('.card-subtitle').textContent = artists;
        clone.querySelector('.card-img-top').src = data[i].album.images[0].url;
        clone.querySelector('.card-img-top').alt = data[i].name;
        clone.querySelector('.card-header').textContent = "#" + rank;
        clone.querySelector('.audio').src = data[i].preview_url
        // ajouter le clone au DOM dans le conteneur
        document.getElementById('trackList').appendChild(clone);
        
    }
}


function getDisplayArtists(artists) {

    return artists.map(artist => artist.name).join(', ');
}




fetch('data.json')
    .then(response => response.json())
    .then(data => {
        let genreCounts = {};
        data.forEach(item => {
            item.artists.forEach(artist => {
                artist.genres.forEach(genre => {
                    if (genreCounts[genre]) {
                        genreCounts[genre] += 1;
                    } else {
                        genreCounts[genre] = 1;
                    }
                });
            });
        });

        let labels = Object.keys(genreCounts);
        let dataCounts = Object.values(genreCounts);

        // Créer un graphique avec Chart.js
        let ctx = document.getElementById('myChart').getContext('2d');
        let myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Genres',
                    data: dataCounts,
                    backgroundColor: labels.map(genre => {
                        const count = genreCounts[genre];
                        return count < 2 ? 'green' :
                            count < 10 ? 'red' :
                                'orange';
                    })
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Nombre de musiques par genre'
                    }
                }
            }
        });
    });
