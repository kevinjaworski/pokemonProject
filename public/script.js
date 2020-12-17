// Setting URL base, defining buttons and doc sections for data insertion
const baseURL = "https://api.pokemontcg.io/v1/cards/swsh4-";
const openPack = document.getElementById('openPack');
const refreshPage = document.getElementById('refreshPage');
const cardsList = document.getElementById('cardLandingList');
const landing = document.getElementById('cardLanding');
const startContainer = document.getElementById('startContainer');
const body = document.getElementById('body');
var functionIsRunning = false;
refreshPage.style.display = 'none'; 

// Defining base arrays for rarities
const commonArray =     [1,4,6,8,10,13,17,23,27,31,33,38,41,45,51,53,55,57,63,67,69,72,73,75,77,80,83,86,90,91,94,96,100,103,107,110,112,116,123,130,133,135,139,143];
const uncommonArray =   [2,11,18,19,24,28,34,40,54,56,58,62,65,70,74,85,88,104,105,108,117,122,124,124,134,136,144,146,147,148,149,150,151,152,153,155,156,157,158,159,160,161];
const rareArray =       [3,5,7,12,14,25,26,30,35,39,42,47,52,59,64,66,68,76,81,84,87,95,97,11,109,111,113,114,118,120,137,145];
const rareHoloArray =   [15,16,32,46,48,60,61,71,78,79,89,92,93,121,128,129,131,132,142,154];
const RUArray =         [166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185];
const URRArray =        [20,21,22,29,36,37,43,44,49,98,99,106,115,126,127,140,141];
const AArray =          [9,50,82,102,119,138];
const secretArray =     [186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203];

//combining rarity arrays for pull determination. Multiple of the same array added in reduces odds of rarer cards. (harder to pull ABBBB than AB)

                                                    //ARRAY                 PULL                            ROUGH
let standardPulls1 =    commonArray;                // C+C                  C                               100%

let standardPulls2 =    commonArray                 // C+C+C+U              C                               75%
                        .concat(commonArray)        //                      U                               25%
                        .concat(commonArray)
                        .concat(uncommonArray);

let reversePulls =      uncommonArray               // U+U+U+R              U                               75%
                        .concat(uncommonArray)      //                      R                               25%
                        .concat(uncommonArray)
                        .concat(rareArray);

let guaranteedPulls =   rareArray                   // R*10 + RHO*2 +
                        .concat(rareArray)          // RU*2 + URR + 
                        .concat(rareArray)          // AA + SEC             R                               73%                             
                        .concat(rareArray)          //                      RHO                             9%
                        .concat(rareArray)          //                      RU                              8%
                        .concat(rareArray)          //                      URR                             5%
                        .concat(rareArray)          //                      AA                              1%
                        .concat(rareArray)          //                      SEC                             4%
                        .concat(rareArray)
                        .concat(rareArray)
                        .concat(rareHoloArray)
                        .concat(rareHoloArray)
                        .concat(RUArray)
                        .concat(RUArray)
                        .concat(URRArray)
                        .concat(AArray)
                        .concat(secretArray);

// pull determination
let standardSelection1 =    selectRandomFromArray(standardPulls1);
let standardSelection2 =    selectRandomFromArray(standardPulls1);
let standardSelection3 =    selectRandomFromArray(standardPulls1);
let standardSelection4 =    selectRandomFromArray(standardPulls1);
let standardSelection5 =    selectRandomFromArray(standardPulls2);
let standardSelection6 =    selectRandomFromArray(standardPulls2);
let standardSelection7 =    selectRandomFromArray(standardPulls2);
let standardSelection8 =    selectRandomFromArray(standardPulls2);
let reverseSelection =      selectRandomFromArray(reversePulls);
let pullSelection =         selectRandomFromArray(guaranteedPulls);


// Listeners
openPack.addEventListener('click', fetchCards);
refreshPage.addEventListener('click', refreshFunction);


// call fetch stack
function fetchCards(e){

    e.preventDefault();// stops default autoreload of page on form submission

    fetchCard(standardSelection1);
    fetchCard(standardSelection2);
    fetchCard(standardSelection3);
    fetchCard(standardSelection4);
    fetchCard(standardSelection5);
    fetchCard(standardSelection6);
    fetchCard(standardSelection7);
    fetchCard(reverseSelection);
    fetchCard(standardSelection8);
    fetchCard(pullSelection);
    

    refreshPage.style.display = 'block';
    openPack.style.display = 'none'; 
    openHeader.style.display = 'none'; 
    startContainer.style.display = 'none'; 
}

// Grab individual card's object from API

function fetchCard(selectOne){
    // console.log(e);
 
    
    fetch(`${baseURL}${selectOne}`)
        .then(responseObj => responseObj.json())
        .then(jsonData => displayCards(jsonData))
        .then (sleep(120));                         
    }


//Select specific obj fields for nth card, generate HTML items, place data on screen

function displayCards(json){
    console.log('Results', json);
    console.log(json.card.name);
    

        let eachWrapper = document.createElement('article');
        let cardName = document.createElement('li');
        let para = document.createElement('p');
        let img = document.createElement('img');
        let clearfix = document.createElement('div'); 


        cardName.innerText = json.card.name;
        img.src = json.card.imageUrl;
        para.innerText = json.card.rarity;
            
        // EASTEREGG - if card is Regirock, insert alt text
            if (cardName.innerText === 'Regirock'){
                cardName.innerText = `${json.card.name}! ün ün ün...`;;
        }   

        // Set Wrapper Background by Rarity Returned
        if (para.innerText === 'Common'){
            eachWrapper.style.backgroundColor = "lightGrey"  
        }
        
        if (para.innerText === 'Uncommon'){
            eachWrapper.style.backgroundColor = "lightBlue"  
        }

        if (para.innerText === 'Rare'){
            eachWrapper.style.backgroundColor = "lightPink"  
        }
        if (para.innerText === 'Rare Ultra'){
            eachWrapper.style.backgroundColor = "#8872d8" 
        }
        if (para.innerText === 'Rare Secret'){
            eachWrapper.style.backgroundColor = "Orange"  
        }

        if (para.innerText === 'Rare Rainbow'){
                eachWrapper.style.backgroundImage = "url(https://images-na.ssl-images-amazon.com/images/I/41nkIH+pBXL.jpg)"
                cardName.style.color = 'charcoal';
                para.style.color = 'charcoal';
        } 
            if (para.innerText === 'Rare Holo' || para.innerText === 'Rare Holo V' || para.innerText === 'Rare Holo VMAX'){
                eachWrapper.style.backgroundImage = "url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b3c54c95-8c44-4e5b-93ae-389fe559bcbf/de1hwmt-d4d05b09-58c8-4b01-abc7-36352994d686.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYjNjNTRjOTUtOGM0NC00ZTViLTkzYWUtMzg5ZmU1NTliY2JmXC9kZTFod210LWQ0ZDA1YjA5LTU4YzgtNGIwMS1hYmM3LTM2MzUyOTk0ZDY4Ni5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.H5XexPWrhZnYeFxjy-5y6uTDwknz-JYdrMIlBdNS1TE')";
                cardName.style.color = 'Red';
                para.style.color = 'Red';
        }
            if (para.innerText === 'Amazing Rare'){
                eachWrapper.style.backgroundImage = "url('https://images.assetsdelivery.com/compings_v2/cobalt/cobalt1601/cobalt160100033.jpg')";
        }
            if (para.innerText === 'Amazing Rare' || para.innerText === 'Rare Rainbow'){
                para.innerText = `${json.card.rarity}, Great Pull!`;
        }

        //Append Name, Rarity, image, spacer to wrapper; append wrapper to list
        clearfix.setAttribute('class', 'clearfix');
        eachWrapper.appendChild(cardName);
        eachWrapper.appendChild(para);
        eachWrapper.appendChild(img);
        eachWrapper.appendChild(clearfix);
        cardsList.appendChild(eachWrapper);
        cardsList.appendChild(clearfix);
}

// Select random from given array 

function selectRandomFromArray(item){
    let randomElement = item[Math.floor(Math.random() * item.length)];
    return randomElement;
}



// DELAY TO KEEP THINGS IN ORDER - ASK IF THERES A BETTER WAY

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

// Refresh the page

function refreshFunction(){
    location.reload();
}


