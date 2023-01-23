
const ACCESS_KEY = 'IpqH5mdy_mWx_ornR0Hsu23Y1i43tqfOnK8VniySDaI';
const SECRET_KEY = 'ReNOBQYhMJtpcCWI2WYiPBcMNxtBEceV_6NOKrZEzWQ';

// const Link =  '<https://api.unsplash.com/photos?page=1>; rel="first", <https://api.unsplash.com/photos?page=1>; rel="prev", <https://api.unsplash.com/photos?page=346>; rel="last", <https://api.unsplash.com/photos?page=3>; rel="next"'
// X-Ratelimit-Limit: 1000
// X-Ratelimit-Remaining: 999

let CURRENT_PAGE_NO = 1;
let CURRENT_QUERY = "nature";

const nextPage = () => {
    CURRENT_PAGE_NO += 1;
    const cardHolder = document.getElementById('card-holder');
    cardHolder.innerHTML = null;
    populatePage();
}


const prevPage = () => {
    if (CURRENT_PAGE_NO > 1) {
        CURRENT_PAGE_NO -= 1;
        const cardHolder = document.getElementById('card-holder');
        cardHolder.innerHTML = null;
        populatePage();
    }
    else alert("This is the first page")
}

const  filterQuery = () => {
    const input = document.getElementById('input');
    CURRENT_QUERY = input.value;
    const cardHolder = document.getElementById('card-holder');
    cardHolder.innerHTML = null;
    populatePage();
}

function populatePage() {

    fetch(`https://api.unsplash.com/search/photos?page=${CURRENT_PAGE_NO}&per_page=30&query=${CURRENT_QUERY}&client_id=${ACCESS_KEY}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            const cardHolder = document.getElementById('card-holder');
            data.results.forEach(e => {
                const url = e.urls.small;
                const image = document.createElement('img');

                image.classList.add('d-inline-block', 'img-thumbnail', 'mw-25', 'mh-25');
                image.src = url;
                // image.classList.add('fix-img-size');
                // console.log(url);
                cardHolder.appendChild(image);
            });

        })
        .catch((err) => { console.log(err.errors) });

}

populatePage();