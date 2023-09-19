(async () => {
// console.log("Movie");
let myFetch = await fetch("./data.json");
let myMovieData = await myFetch.json();
// console.log(myMovieData);
let yearOpt = document.getElementById("year");
let genreOpt = document.getElementById("genre");
let nameOpt = document.getElementById("name");
let movieConatiner = document.querySelector(".movList");
// console.log(movieConatiner);
let myGenre = [... new Set(myMovieData.flatMap((e) => e.genres).filter(Boolean))];
let myYear = [... new Set(myMovieData.map((e) => e.release_date.slice(0,4)).filter(Boolean))];
let myName = myMovieData.map((e) => e.title).filter(Boolean);
myGenre.sort();
myYear.sort((a,b) => b-a);
myName.sort();
// console.log(myName);
const createOpt = (option,value) => {
    value.forEach(element => {
        let creOpt = document.createElement("option");
    creOpt.innerHTML = element;
    creOpt.value = element;
    option.appendChild(creOpt);
    });
};
createOpt(yearOpt,myYear);
createOpt(genreOpt,myGenre);
createOpt(nameOpt,myName);
const timeFormat = (minute) => {
    // let minute = 113;
    let myHour = Math.floor(minute/60);
    let myMin = minute%60;
    // console.log(myMin);
    return `${myHour}h ${myMin}m`;
};
const createCard = (result) => {
    movieConatiner.innerHTML = ``;
    result.forEach((element) => {
        let movieRunTime = timeFormat(element.runtime);
        movieConatiner.innerHTML += `<div class="movieCard">
        <p class="time">${movieRunTime}</p>
        <img src="https://image.tmdb.org/t/p/w400/${element.poster_path}" alt="movie">
       <div class="mtitle">
        <h2>${element.title}</h2>
        <p>${element.original_language},${element.release_date.slice(0,4)}</p>
        <p class="gen">${element.genres}</p>
       </div>
    </div>`;
    });
};
let cardLen = 0;
(() => {
    for(let i=cardLen; i<cardLen+30 && i<myMovieData.length; i++){
        let myData = myMovieData[i];
        let movieRunTime = timeFormat(myData.runtime);
        movieConatiner.innerHTML += `<div class="movieCard">
        <p class="time">${movieRunTime}</p>
        <img src="https://image.tmdb.org/t/p/w400/${myData.poster_path}" alt="movie">
       <div class="mtitle">
        <h2>${myData.title}</h2>
        <p>${myData.original_language},${myData.release_date.slice(0,4)}</p>
        <p class="gen">${myData.genres}</p>
       </div>
    </div>`;
    }
    cardLen +=30;
})();
const genreSearch = () => {
    let serGenre = genreOpt.value.toLowerCase();
    let fetchResult = myMovieData.filter((element) => {
        if(Array.isArray(element.genres)){
            return element.genres.join(" ").toLowerCase().includes(serGenre);
        }
        return false;
    });
    if(serGenre == "all"){
        movieConatiner.innerHTML = ``;
        genreOpt.value = "all";
        cardLen = 0; 
    }else{
        createCard(fetchResult);
        genreOpt.value ="all";
    }
};
const yearSearch = () => {
    let serYear = yearOpt.value.toLowerCase();
    let fetchResult = myMovieData.filter((element) => {
        return element.release_date.toLowerCase().includes(serYear);
    });
    if(serYear == "all"){
        movieConatiner.innerHTML = ``;
        yearOpt.value = "all";
        // cardLen = 0; 
    }else{
        createCard(fetchResult);
        yearOpt.value ="all";
    }
};
const nameSerach = () => {
    let serName = nameOpt.value.toLowerCase();
    let fetchResult = myMovieData.filter((element) => {
            return element.title.toLowerCase().includes(serName);
    });
    if(serName == "all"){
        movieConatiner.innerHTML = ``;
        nameOpt.value = "all";
        cardLen = 0; 
    }else{
        createCard(fetchResult);
        nameOpt.value ="all";
    }
}
let movieBtn = document.getElementById("nav-btn");
movieBtn.addEventListener("click",() => {
    if(genreOpt.value != "all"){
        genreSearch();
    }else if(yearOpt.value != "all"){
        yearSearch();
    } else if(nameOpt.value!= "all"){
        nameSerach();
    }else{
        genreSearch();
    }
})
// genreSearch();

})();