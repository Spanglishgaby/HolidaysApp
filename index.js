// back tot top

let backToTopBtn = document.querySelector('.back-to-top')

window.onscroll = () => {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        backToTopBtn.style.display = 'flex'
    } else {
        backToTopBtn.style.display = 'none'
    }
}

// top nav menu

let menuItems = document.getElementsByClassName('menu-item')

Array.from(menuItems).forEach((item, index) => {
    item.onclick = (e) => {
        let currMenu = document.querySelector('.menu-item.active')
        currMenu.classList.remove('active')
        item.classList.add('active')
    }
})


// on scroll animation

let scroll = window.requestAnimationFrame || function(callback) {window.setTimeout(callback, 1000/60)}

let elToShow = document.querySelectorAll('.play-on-scroll')

isElInViewPort = (el) => {
    let rect = el.getBoundingClientRect()

    return (
        (rect.top <= 0 && rect.bottom >= 0)
        ||
        (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) && rect.top <= (window.innerHeight || document.documentElement.clientHeight))
        ||
        (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    )
}

loop = () => {
    elToShow.forEach((item, index) => {
        if (isElInViewPort(item)) {
            item.classList.add('start')
        } else {
            item.classList.remove('start')
        }
    })

    scroll(loop)
}

loop()

// mobile nav

let bottomNavItems = document.querySelectorAll('.mb-nav-item')

let bottomMove = document.querySelector('.mb-move-item')

bottomNavItems.forEach((item, index) => {
    item.onclick = (e) => {
        console.log('object')
        let crrItem = document.querySelector('.mb-nav-item.active')
        crrItem.classList.remove('active')
        item.classList.add('active')
        bottomMove.style.left = index * 25 + '%'
    }
})

const createTable = (tableBodyId, countryCode) => {
    const tableBody = document.querySelector(`#${tableBodyId}`);
    fetch(`https://date.nager.at/api/v3/NextPublicHolidays/${countryCode}`)
        .then(resp => resp.json())
        .then(nextData => {
            tableBody.innerHTML = '';
            nextData.forEach(obj => {
            const tr = document.createElement('tr');
            const date = document.createElement('td');
            date.textContent = obj.date;
            const name = document.createElement('td');
            name.textContent = obj.name;
            tr.append(date, name);
            tableBody.append(tr);
            });
        });
    };

createTable("table-bodyMX", "MX");
createTable("table-bodyUS", "US");
createTable("table-bodyPE", "PE");

/////////
const form = document.querySelector('#country-form');
const year = '2023';
const tableBody = document.querySelector('#table-body');
const ul = document.querySelector('#list');
const aside = document.querySelector('#showFlag');
const title = document.querySelector('#holidaysTitle');
const tableBodyweek = document.querySelector('#table-weekend');
const titleWeek = document.querySelector('#longWeekend');
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const targetSection = document.querySelector('#countries');


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.country.value;
    const Cname = capitalizeFirstLetter(name.toLowerCase());
    title.innerHTML = `These are the 2023 holidays for <span class="primary-color">${Cname}</span> `;
    titleWeek.innerHTML = `Long Weekends on 2023 for <span class="primary-color">${Cname}</span>`;

    fetch(`https://date.nager.at/api/v3/AvailableCountries`)
    .then((resp) => resp.json())
    .then((data) => {
        data.forEach((cName) => {
            if (Cname === cName.name) {
                const countryCode = cName.countryCode;
                //console.log(cName.countryCode)
                fetch(`https://date.nager.at/api/v3/PublicHolidays/2023/${countryCode}`)
                    .then(resp => resp.json())
                    .then(data => {
                        tableBody.innerHTML = '';
                        data.forEach(obj2 => {
                            const tr = document.createElement('tr');
                            const date = document.createElement('td');
                            date.textContent = obj2.date;
                            const name = document.createElement('td');
                            name.textContent = obj2.name;
                            const type = document.createElement('td');
                            type.textContent = obj2.types;
                            tr.append(date, name, type);
                            tableBody.append(tr);
                        });
                    });
                ////////LongWeekend fetch////////
                fetch(`https://date.nager.at/api/v3/LongWeekend/2023/${cName.countryCode}`)
                    .then(resp => resp.json())
                    .then(weekData2 => {
                        // console.log(weekData2)
                        tableBodyweek.innerHTML = '';
                        weekData2.forEach(obj4 => {
                            const tr1 = document.createElement('tr');
                            const days = document.createElement('td');
                            days.innerHTML = `${obj4.dayCount} <strong>days<strong>`;
                            const begins = document.createElement('td');
                            const ends = document.createElement('td');
                            const start = new Date(obj4.startDate);
                            const end = new Date(obj4.endDate);
                            begins.innerHTML = `<strong><span class="primary-color">${weekDays[start.getDay()]} </span></strong> ${obj4.startDate}`;
                            ends.innerHTML = `<strong><span class="primary-color">${weekDays[end.getDay()]} </span></strong> ${obj4.endDate}`;
                            tr1.append(days, begins, ends);
                            tableBodyweek.append(tr1);
                        });
                    });
            }
        });
    })

    // Country info section #3
    fetch (`https://restcountries.com/v3.1/name/${Cname}`)
    .then(resp => resp.json())
    .then(data => {
        const officialName = data[0].name.official;
        const capital = data[0].capital[0];
        const continent = data[0].continents[0];
        const population = data[0].population;
        const timezones = data[0].timezones[0];
        const languages = data[0].languages;
        let languageList = '';
        Object.entries(languages).forEach(([key, value]) => {
            languageList += `<li>${key}: ${value}</li>`;
        });
        const maps = data[0].maps.googleMaps;
        const flag = data[0].flags.png;
        console.log(data[0].flags.png)

        const info = document.querySelector("#info");
        const info1 = document.querySelector("#info1");
        const info2 = document.querySelector("#info2");
        const info3 = document.querySelector("#info3");
        const info4 = document.querySelector("#info4");
        const info5 = document.querySelector("#info5");
        const info6 = document.querySelector("#info6");
        const flagImg = document.querySelector("#flag");

        info.innerHTML = `<h3>${officialName}</h3>`;
        info1.innerHTML = `<p> Continent: ${continent}</p>`;
        info2.innerHTML = `<p> Capital: ${capital}</p>`;
        info3.innerHTML = `<p> Population ${population}</p>`;
        info4.innerHTML = `<p> Timezones: ${timezones}</p>`;
        info5.innerHTML = `<ul>Languages: ${languageList}</ul>`;
        info6.innerHTML = `<p><a href="${maps}" target="_blank">Google Maps</a></p>`;
        flagImg.innerHTML = `<img src="${flag}" alt="Flag">`;
    });


targetSection.scrollIntoView({ behavior: 'smooth' });
form.reset();
})