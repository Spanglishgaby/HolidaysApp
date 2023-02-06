document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('#country-form');
  const year ='2023' // holiday of 2023
  const tableBody = document.querySelector('#table-body');
  const ul = document.querySelector('#list')
  const aside = document.querySelector('#showFlag')
  const title = document.querySelector('#holidaysTitle')
  const tableBodyUS = document.querySelector('#table-bodyUS');
  const tableBodyweek = document.querySelector('#table-weekend');
  const titleWeek = document.querySelector('#longWeekend')

  // fetch('https://date.nager.at/api/v3/LongWeekend/2023/US')
  // .then(resp => resp.json())
  // .then(weekData => { 
  //   console.log(weekData)
  //   weekData.forEach(obj4 =>{
  //     const tr1 = document.createElement('tr');
  //           const days = document.createElement('td');
  //           days.innerHTML = `${obj4.dayCount} <strong>days</strong>`;
  //           const begins = document.createElement('td');
  //           const ends = document.createElement('td');
  //           const start = new Date(obj4.startDate)
  //           const end = new Date(obj4.endDate)
            
  //             console.log(end.getDay());
  //           if(start.getDay() === 0){
  //             begins.innerHTML= `<strong>Sunday</strong> ${obj4.startDate}`;
  //           }
  //           else if(start.getDay() === 1){
  //             begins.innerHTML= `<strong>Monday</strong> ${obj4.startDate}`;
  //           }
  //           else if(start.getDay() === 2){
  //             begins.innerHTML= `<strong>Tuesday</strong> ${obj4.startDate}`;
  //           }
  //           else if(start.getDay() === 3){
  //             begins.innerHTML= `<strong>Wednesday</strong> ${obj4.startDate}`;
  //           }
  //           else if(start.getDay() === 4){
  //             begins.innerHTML= `<strong>Thursday</strong> ${obj4.startDate}`;
  //           }
  //           else if(start.getDay() === 5){
  //             begins.innerHTML= `<strong>Friday</strong> ${obj4.startDate}`;
  //           }
  //           else {
  //             begins.innerHTML= `<strong>Saturday</strong> ${obj4.startDate}`;
  //           }

  //           if(end.getDay() === 0){
  //             ends.innerHTML= `<strong>Sunday</strong> ${obj4.endDate}`;
  //           }
  //           else if(end.getDay() === 1){
  //             ends.innerHTML= `<strong>Monday</strong> ${obj4.endDate}`;
  //           }
  //           else if(end.getDay() === 2){
  //             ends.innerHTML= `<strong>Tuesday</strong> ${obj4.endDate}`;
  //           }
  //           else if(end.getDay() === 3){
  //             ends.innerHTML= `<strong>Wednesday</strong> ${obj4.endDate}`;
  //           }
  //           else if(end.getDay() === 4){
  //             ends.innerHTML= `<strong>Thursday</strong> ${obj4.endDate}`;
  //           }
  //           else if(end.getDay() === 5){
  //             ends.innerHTML= `<strong>Friday</strong> ${obj4.endDate}`;
  //           }
  //           else {
  //             ends.innerHTML= `<strong>Saturday</strong> ${obj4.endDate}`;
  //           }
  //           tr1.append(days, begins,ends);
  //           tableBodyweek.append(tr1);
  //   })
  // })

   fetch('https://date.nager.at/api/v3/NextPublicHolidays/US')
   .then(resp => resp.json())
   .then(nextData => { 
    //console.log(nextData)
    tableBodyUS.innerHTML = '' 
          nextData.forEach(obj => {
            const tr = document.createElement('tr');
            const date = document.createElement('td');
            date.textContent = obj.date;
            const name = document.createElement('td');
            name.textContent = obj.name;
            tr.append(date, name);
            tableBodyUS.append(tr);
          });
   })

  fetch(`https://date.nager.at/api/v3/AvailableCountries`)
  .then(resp => resp.json())
  .then(countryData => {  
    processCountries(countryData)
    // console.log(countryData)
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
           title.innerHTML = '' 
            const h4title = document.createElement('p')
            h4title.innerHTML = `These are the 2023 holidays for <strong>${country.name}</strong>`
            title.append(h4title)
            titleWeek.innerHTML = '' 
            const h4titleWeek = document.createElement('p')
            h4titleWeek.innerHTML = `Long Weekends on 2023 for <strong>${country.name}</strong>`
            titleWeek.append(h4titleWeek)
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
     ////////LongWeekend fetch////////
     fetch(`https://date.nager.at/api/v3/LongWeekend/2023/${countryCode}`)
     .then(resp => resp.json())
     .then(weekData => { 
      // console.log(weekData)
      tableBodyweek.innerHTML = ''
       weekData.forEach(obj4 =>{
         const tr1 = document.createElement('tr');
               const days = document.createElement('td');
               days.innerHTML = `${obj4.dayCount} <strong>days</strong>`;
               const begins = document.createElement('td');
               const ends = document.createElement('td');
               const start = new Date(obj4.startDate)
               const end = new Date(obj4.endDate)
               
                 console.log(end.getDay());
                 if(start.getDay() === 0){
                  begins.innerHTML= `<strong>Monday</strong> ${obj4.startDate}`;
                }
                else if(start.getDay() === 1){
                  begins.innerHTML= `<strong>Tuesday</strong> ${obj4.startDate}`;
                }
                else if(start.getDay() === 2){
                  begins.innerHTML= `<strong>Wednesday</strong> ${obj4.startDate}`;
                }
                else if(start.getDay() === 3){
                  begins.innerHTML= `<strong>Thursday</strong> ${obj4.startDate}`;
                }
                else if(start.getDay() === 4){
                  begins.innerHTML= `<strong>Friday</strong> ${obj4.startDate}`;
                }
                else if(start.getDay() === 5){
                  begins.innerHTML= `<strong>Saturday</strong> ${obj4.startDate}`;
                }
                else {
                  begins.innerHTML= `<strong>Sunday</strong> ${obj4.startDate}`;
                }
    
                if(end.getDay() === 0){
                  ends.innerHTML= `<strong>Monday</strong> ${obj4.endDate}`;
                }
                else if(end.getDay() === 1){
                  ends.innerHTML= `<strong>Tuesday</strong> ${obj4.endDate}`;
                }
                else if(end.getDay() === 2){
                  ends.innerHTML= `<strong>Wednesday</strong> ${obj4.endDate}`;
                }
                else if(end.getDay() === 3){
                  ends.innerHTML= `<strong>Thursday</strong> ${obj4.endDate}`;
                }
                else if(end.getDay() === 4){
                  ends.innerHTML= `<strong>Friday</strong> ${obj4.endDate}`;
                }
                else if(end.getDay() === 5){
                  ends.innerHTML= `<strong>Saturday</strong> ${obj4.endDate}`;
                }
                else {
                  ends.innerHTML= `<strong>Sunday</strong> ${obj4.endDate}`;
                }
               tr1.append(days, begins,ends);
               tableBodyweek.append(tr1);
       })
     })

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
    title.innerHTML = '' 
    const h4title = document.createElement('p')
    h4title.innerHTML = `These are the 2023 holidays for <strong>${Cname}</strong>`
    title.append(h4title)
    titleWeek.innerHTML = '' 
    const h4titleWeek = document.createElement('p')
    h4titleWeek.innerHTML = `Long Weekends on 2023 for <strong>${Cname}</strong>`
    titleWeek.append(h4titleWeek)
    
    fetch(`https://date.nager.at/api/v3/AvailableCountries`)
    .then(resp => resp.json())
    .then(data => {  
     // console.log(data)
        data.forEach( cName =>{
        if ( Cname === cName.name ){
          console.log(cName.countryCode)
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
            ////////LongWeekend fetch////////
              fetch(`https://date.nager.at/api/v3/LongWeekend/2023/${cName.countryCode}`)
              .then(resp => resp.json())
              .then(weekData2 => { 
                console.log(weekData2)
                tableBodyweek.innerHTML = ''
                weekData2.forEach(obj4 =>{
                  const tr1 = document.createElement('tr');
                        const days = document.createElement('td');
                        days.innerHTML = `${obj4.dayCount} <strong>days</strong>`;
                        const begins = document.createElement('td');
                        const ends = document.createElement('td');
                        const start = new Date(obj4.startDate)
                        const end = new Date(obj4.endDate)
                        
                          //console.log(end.getDay());
                        if(start.getDay() === 0){
                          begins.innerHTML= `<strong>Monday</strong> ${obj4.startDate}`;
                        }
                        else if(start.getDay() === 1){
                          begins.innerHTML= `<strong>Tuesday</strong> ${obj4.startDate}`;
                        }
                        else if(start.getDay() === 2){
                          begins.innerHTML= `<strong>Wednesday</strong> ${obj4.startDate}`;
                        }
                        else if(start.getDay() === 3){
                          begins.innerHTML= `<strong>Thursday</strong> ${obj4.startDate}`;
                        }
                        else if(start.getDay() === 4){
                          begins.innerHTML= `<strong>Friday</strong> ${obj4.startDate}`;
                        }
                        else if(start.getDay() === 5){
                          begins.innerHTML= `<strong>Saturday</strong> ${obj4.startDate}`;
                        }
                        else {
                          begins.innerHTML= `<strong>Sunday</strong> ${obj4.startDate}`;
                        }
            
                        if(end.getDay() === 0){
                          ends.innerHTML= `<strong>Monday</strong> ${obj4.endDate}`;
                        }
                        else if(end.getDay() === 1){
                          ends.innerHTML= `<strong>Tuesday</strong> ${obj4.endDate}`;
                        }
                        else if(end.getDay() === 2){
                          ends.innerHTML= `<strong>Wednesday</strong> ${obj4.endDate}`;
                        }
                        else if(end.getDay() === 3){
                          ends.innerHTML= `<strong>Thursday</strong> ${obj4.endDate}`;
                        }
                        else if(end.getDay() === 4){
                          ends.innerHTML= `<strong>Friday</strong> ${obj4.endDate}`;
                        }
                        else if(end.getDay() === 5){
                          ends.innerHTML= `<strong>Saturday</strong> ${obj4.endDate}`;
                        }
                        else {
                          ends.innerHTML= `<strong>Sunday</strong> ${obj4.endDate}`;
                        }
                        tr1.append(days, begins,ends);
                        tableBodyweek.append(tr1);
                })
              })
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
        title.innerHTML = '' 
        const h4title = document.createElement('p')
        h4title.innerHTML = `These are the 2023 holidays for <strong>${flag.name}<strong>`
        title.append(h4title)
        titleWeek.innerHTML = '' 
        const h4titleWeek = document.createElement('p')
        h4titleWeek.innerHTML = `Long Weekends on 2023 for <strong>${flag.name}</strong>`
        titleWeek.append(h4titleWeek)
          fetch(`https://date.nager.at/api/v3/PublicHolidays/2023/${flag.countryCode}`)
          .then(resp => resp.json())
          .then(holidays => {
            //console.log(holidayData);
            tableBody.innerHTML = '' 
            tableBodyweek.innerHTML = ''
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
          fetch(`https://date.nager.at/api/v3/LongWeekend/2023/${flag.countryCode}`)
          .then(resp => resp.json())
          .then(weekData => { 
            // console.log(weekData)
            tableBodyweek.innerHTML = ''
            weekData.forEach(obj4 =>{
              const tr1 = document.createElement('tr');
                    const days = document.createElement('td');
                    days.innerHTML = `${obj4.dayCount} <strong>days</strong>`;
                    const begins = document.createElement('td');
                    const ends = document.createElement('td');
                    const start = new Date(obj4.startDate)
                    const end = new Date(obj4.endDate)
                    
                      console.log(end.getDay());
                      if(start.getDay() === 0){
                        begins.innerHTML= `<strong>Monday</strong> ${obj4.startDate}`;
                      }
                      else if(start.getDay() === 1){
                        begins.innerHTML= `<strong>Tuesday</strong> ${obj4.startDate}`;
                      }
                      else if(start.getDay() === 2){
                        begins.innerHTML= `<strong>Wednesday</strong> ${obj4.startDate}`;
                      }
                      else if(start.getDay() === 3){
                        begins.innerHTML= `<strong>Thursday</strong> ${obj4.startDate}`;
                      }
                      else if(start.getDay() === 4){
                        begins.innerHTML= `<strong>Friday</strong> ${obj4.startDate}`;
                      }
                      else if(start.getDay() === 5){
                        begins.innerHTML= `<strong>Saturday</strong> ${obj4.startDate}`;
                      }
                      else {
                        begins.innerHTML= `<strong>Sunday</strong> ${obj4.startDate}`;
                      }
          
                      if(end.getDay() === 0){
                        ends.innerHTML= `<strong>Monday</strong> ${obj4.endDate}`;
                      }
                      else if(end.getDay() === 1){
                        ends.innerHTML= `<strong>Tuesday</strong> ${obj4.endDate}`;
                      }
                      else if(end.getDay() === 2){
                        ends.innerHTML= `<strong>Wednesday</strong> ${obj4.endDate}`;
                      }
                      else if(end.getDay() === 3){
                        ends.innerHTML= `<strong>Thursday</strong> ${obj4.endDate}`;
                      }
                      else if(end.getDay() === 4){
                        ends.innerHTML= `<strong>Friday</strong> ${obj4.endDate}`;
                      }
                      else if(end.getDay() === 5){
                        ends.innerHTML= `<strong>Saturday</strong> ${obj4.endDate}`;
                      }
                      else {
                        ends.innerHTML= `<strong>Sunday</strong> ${obj4.endDate}`;
                      }
                    tr1.append(days, begins,ends);
                    tableBodyweek.append(tr1);
            })
          })
      })  
    })
   })
   
 
  


})



