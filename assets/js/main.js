const nameInput = document.querySelector('.input__name');
const nameBtn = document.querySelector('.input__btn');
const historyBtn = document.querySelector('.history__btn');
const result = document.querySelector('.result');
const nameResult = document.querySelector('.name__result');
const ageResult = document.querySelector('.age__result');
const resultsList = document.querySelector('.results__list');
const errorMsg = document.querySelector('.errorMsg');
let results = [];

nameBtn.addEventListener('click', () => {
    const nameValue = nameInput.value;

    fetch("https://api.agify.io?name=" + nameValue)
    .then((reponse) => reponse.json())
    .then((data) => {
        if(nameValue){
            result.classList.remove('hidden');

            nameResult.textContent = data.name;
            ageResult.textContent = data.age;
            resultsArray = [data.name, data.age];

            saveInfos(resultsArray);

            errorMsg.classList.add('hidden');

        } else{
            result.classList.add('hidden');
            errorMsg.classList.toggle('hidden');
        };
    });
});

function saveInfos(infos){
    
    const savedResults = JSON.parse(localStorage.getItem('Results'));

    if(savedResults){
        results = savedResults;
    };

    if(infos){
        results.push(infos);
        localStorage.setItem('Results', JSON.stringify(results));
    };

    if(results.length > 10){
        results.shift();
        localStorage.setItem('Results', JSON.stringify(results));
    };

    const li = document.createElement('li');
    li.classList.add('list__item');
    li.textContent = infos;
    resultsList.appendChild(li);

    const listItems = document.querySelectorAll('.list__item');
    if(listItems.length > 10){
        listItems[0].remove();
    }
};

function getLocalInfos(){
    const savedResults = JSON.parse(localStorage.getItem('Results'));
    if(savedResults){
        for(let data of savedResults){
            const li = document.createElement('li');
            li.classList.add('list__item');
            li.textContent = data;
            resultsList.appendChild(li);
        };
    };
}
getLocalInfos();

historyBtn.addEventListener('click', () => {
    resultsList.classList.toggle('hidden');
});

//localStorage.clear();