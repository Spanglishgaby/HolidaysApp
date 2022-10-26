document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('#country-form');
  const year ='2023' // holiday of 2023
  const tableBody = document.querySelector('#table-body');
  const ul = document.querySelector('#list')
  const aside = document.querySelector('#showFlag')


  fetch(`https://date.nager.at/api/v3/AvailableCountries`)
  .then(resp => resp.json())
  .then(countryData => {  
    processCountries(countryData)
     console.log(countryData)
  })

  function processCountries (countryinfo) {

    countryinfo.forEach(renderCountry);
    }

  function renderCountry (country) {

      const li = document.createElement('li');
      li.innerHTML = country.name;
      ul.appendChild(li);
      //const countryName = obj.name
      const countryCode = country.countryCode;

    li.addEventListener('click', () => {
      //console.log(countryCode) 
      // console.log(body)  
      fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`)
        .then(resp => resp.json())
        .then(holidayData => {
          //console.log(holidayData);
           tableBody.innerHTML = '' 
          holidayData.forEach(obj2 => {
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
    });
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.country.value
    // console.log(capitalizeFirstLetter(name.toLowerCase()));
    const Cname = capitalizeFirstLetter(name.toLowerCase());
   
    
    fetch(`https://date.nager.at/api/v3/AvailableCountries`)
    .then(resp => resp.json())
    .then(data => {  
     // console.log(data)
        data.forEach( cName =>{
        if ( Cname === cName.name ){
          // console.log(cName.countryCode)
          // console.log(`https://countryflagsapi.com/png/${Cname}`)
          fetch(`https://date.nager.at/api/v3/PublicHolidays/2023/${cName.countryCode}`)
          .then(resp => resp.json())
          .then(data => {
            tableBody.innerHTML = '' 
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
        }
        
      })
    })
    form.reset();
  })

  fetch(`https://date.nager.at/api/v3/AvailableCountries`)
    .then(resp => resp.json())
    .then(flagData => { 
       flagData.forEach(flag => {
        const div = document.createElement('div');
        div.id = "printFlag"
        const imgFlag = document.createElement('img');
        imgFlag.src =`https://countryflagsapi.com/png/${flag.name}`
        imgFlag.alt = flag.name;
        imgFlag.width = "100"
        imgFlag.height = "50"
        div.append(imgFlag);
        aside.append(div)

      imgFlag.addEventListener('mouseover', (e) =>{
        e.target.style.cursor = 'pointer';
        // console.log(flag.name)
        fetch(`https://date.nager.at/api/v3/PublicHolidays/2023/${flag.countryCode}`)
        .then(resp => resp.json())
        .then(holidays => {
          //console.log(holidayData);
           tableBody.innerHTML = '' 
          holidays.forEach(obj3 => {
            const tr = document.createElement('tr');
            const date = document.createElement('td');
            date.textContent = obj3.date;
            const name = document.createElement('td');
            name.textContent = obj3.name;
            const type = document.createElement('td');
            type.textContent = obj3.types;
            tr.append(date, name, type);
            tableBody.append(tr);
          });
        });
      })  
        })
   })


  


})



