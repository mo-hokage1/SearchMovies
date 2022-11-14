const ApiKey = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BaseUrl = 'https://api.themoviedb.org/3';
const ApiUrl = BaseUrl + '/discover/movie?sort_by=popularity.desc&'+ApiKey;
const ImgUrl = 'https://image.tmdb.org/t/p/w500';

const genres = [
       {
          "id":28,
          "name":"Action"
       },
       {
          "id":12,
          "name":"Adventure"
       },
       {
          "id":16,
          "name":"Animation"
       },
       {
          "id":35,
          "name":"Comedy"
       },
       {
          "id":80,
          "name":"Crime"
       },
       {
          "id":99,
          "name":"Documentary"
       },
       {
          "id":18,
          "name":"Drama"
       },
       {
          "id":10751,
          "name":"Family"
       },
       {
          "id":14,
          "name":"Fantasy"
       },
       {
          "id":36,
          "name":"History"
       },
       {
          "id":27,
          "name":"Horror"
       },
       {
          "id":10402,
          "name":"Music"
       },
       {
          "id":9648,
          "name":"Mystery"
       },
       {
          "id":10749,
          "name":"Romance"
       },
       {
          "id":878,
          "name":"Science Fiction"
       },
       {
          "id":10770,
          "name":"TV Movie"
       },
       {
          "id":53,
          "name":"Thriller"
       },
       {
          "id":10752,
          "name":"War"
       },
       {
          "id":37,
          "name":"Western"
       }
    ]

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const searchUrl = BaseUrl + '/search/movie?' + ApiKey; 
const tags = document.getElementById('tags')

let selectedGenre = []

const showGenres = () => {
    tags.innerHTML = ''
    genres.forEach(genre => {
        const tag = document.createElement('div');
        tag.innerText = genre.name;
        tag.id = genre.id;
        tag.classList.add('tag')
        tag.addEventListener('click', () => {
            if(selectedGenre.length == 0){
                selectedGenre.push(genre.id)
            }else{
                if(selectedGenre.includes(genre.id)){
                    selectedGenre.forEach((id, idx) => {
                        if(id == genre.id){
                            selectedGenre.splice(idx, 1)
                        }
                    })
                }else{
                    selectedGenre.push(genre.id)
                    console.log(selectedGenre)
                }
            }
            getMovies(ApiUrl + '&with_genres='+encodeURI(selectedGenre.join(',')))
        })
        tags.append(tag);
    })
}
showGenres();

function highlightSelection() {
    // const tags = document.querySelectorAll('.tag');
    // tags.forEach(tag => {
    //     tag.classList.remove('highlight')
    // })
    // clearBtn()
    if(selectedGenre.length !=0){   
        selectedGenre.forEach(id => {
            const hightlightedTag = document.getElementById(id);
            hightlightedTag.classList.add('highlight');
        })
    }

}

highlightSelection();

const getMovies = async (url) => {
    const res = await axios.get(url);
    showMovies(res.data.results);
}

getMovies(ApiUrl);

const showMovies = (data) => {
    main.innerHTML = '';
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${ImgUrl+poster_path}" alt="${title}">
        <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getColor(vote_average)}">${vote_average}</span>    
        </div>
        <div class="overview">
        <h3>Overview</h3>
        ${overview}
        </div>
        
        `
        main.appendChild(movieEl)
    })
    
}
    const getColor = (vote) => {
    if(vote >= 8) {
        return 'green';
    }
    else if(vote >= 5) {
        return 'orange';
    }
    else {
        return 'red';
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if(searchTerm){
        getMovies(searchUrl + '&query=' + searchTerm);
    }else{
        getMovies(ApiUrl)
    }
})