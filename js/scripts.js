// Christy Eang
let names = [];
let randomArr = [];
let NFO = JSON.parse(localStorage.getItem("List"));
let displayName = document.getElementById("displayName");
let second = false;
let newName = document.getElementById("newName");
let outputList = document.getElementById("outputList");
let listGroup = document.getElementById("listGroup");
let numPerG = document.getElementById("numPerG");
let numOfG = document.getElementById("numOfG");

let submitName = document.getElementById("submitName").addEventListener('click', function(){
    second = false;
    create(newName.value);
    newName.value = "";
})
let PerGroupBtn = document.getElementById("PerGroupBtn").addEventListener('click', function(){
    if(numPerG.value == null || numPerG == ""){
        alert("Enter A Number Plz");
    }else{
        numOfPeeps();
    }


})
let OfGroupBtn = document.getElementById("OfGroupBtn").addEventListener('click', function(){
    if(numOfG.value !=null || numOfG !=""){
        numberOfGroups();
    }else{
        alert("Enter A Number Plz")
    }
})
let randomBtn = document.getElementById("randomBtn").addEventListener('click', function(){
    if(NFO != null||NFO!=""){
        randomizer();
    }else{
        alert("Please Enter Names!")
    }

})
function create(list){
    // console.log(list)
    let liElement = document.createElement("li");
    liElement.innerText = list;
    liElement.classList.add("list-group-item");
    liElement.addEventListener('click', function(e){
        e.target.remove();
        for(let i=0; i<names.length;i++){
            if(names[i] == liElement.innerText){
                names.splice(i , 1);
            }
        }
        localStorage.setItem("List", JSON.stringify(names));
    })
    outputList.appendChild(liElement);
    names.push(list);
    localStorage.setItem("List", JSON.stringify(names));
}
if(NFO!="" || NFO != null){
    for(let i=0;i<NFO.length;i++){
        create(NFO[i])
    }
}
function randomizer(){
    displayName.innerText = names[Math.floor(Math.random() * names.length)]
}
function shuffle(){
    randomArr = names
    .map((a) => ({sort: Math.random(),value: a}))
    .sort((a,b) => a.sort - b.sort)
    .map((a)=> a.value)
}
function numberOfGroups(){
    // console.log(names);
    let result1 = [];
    // push an empty array in your for loop
    for(let i=0; i<numOfG.value; i++){
        result1[i] = [];
    }
    // console.log(result1);

    let wordsPerLine = Math.ceil(names.length/numOfG.value)
    for(let L=0; L<numOfG.value; L++){
        for(let i=0; i<wordsPerLine;i++){
            let value = names[i + L * wordsPerLine]
            if(!value) continue
            result1[L].push(value);
        }
    }
    console.log(result1);
}

function numOfPeeps(){
    console.log(numPerG.value)
    console.log(names);

    let result = new Array(Math.ceil(names.length/numPerG.value))
    .fill()
    .map(_=>names.splice(0 , numPerG.value));
    console.log(result)
}