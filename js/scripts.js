// Christy Eang
let names = [];
let randomArr = [];
let NFO = JSON.parse(localStorage.getItem("List"));
let displayName = document.getElementById("displayName");
let second=false;
let newName = document.getElementById("newName");
let outputList = document.getElementById("outputList");
let listGroup = document.getElementById("listGroup");
let numPerG = document.getElementById("numPerG");
let numOfG = document.getElementById("numOfG");
let result1 = [];
let result;

let submitName = document.getElementById("submitName").addEventListener('click', function () {
    if ((/^[a-zA-Z ]+$/).test(newName.value)){
        second = false;
        double();
        if (second == false) {
            create(newName.value);
            newName.value = "";
        }
    }else{
        alert("enter letters dude.")
    }
})
let PerGroupBtn = document.getElementById("PerGroupBtn").addEventListener('click', function () {
    if (numPerG.value == null || numPerG == "") {
        alert("Enter A Number Plz");
    } else {
        numOfPeeps();
    }
})
let OfGroupBtn = document.getElementById("OfGroupBtn").addEventListener('click', function () {
    if (numOfG.value != null || numOfG != "") {
        numberOfGroups();
    } else {
        alert("Enter A Number Plz")
    }
})
let randomBtn = document.getElementById("randomBtn").addEventListener('click', function () {
    if (NFO != null || NFO != "") {
        randomizer();
    } else {
        alert("Please Enter Names!")
    }
})
function create(list) {
    let liElement = document.createElement("li");
    liElement.innerText = list;
    liElement.classList.add("list-group-item");
    liElement.addEventListener('click', function (e) {
        e.target.remove();
        for (let i = 0; i < names.length; i++) {
            if (names[i] == liElement.innerText) {
                names.splice(i, 1);
            }
        }
        localStorage.setItem("List", JSON.stringify(names));
    })
    outputList.appendChild(liElement);
    names.push(list);
    localStorage.setItem("List", JSON.stringify(names));
}
if (NFO != "" || NFO != null) {
    for (let i = 0; i < NFO.length; i++) {
        create(NFO[i])
    }
}
function randomizer() {
    displayName.innerText = names[Math.floor(Math.random() * names.length)]
}
function shuffle() {
    randomArr = Array.from(names)
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value)
}
function numberOfGroups() {
    let wordsPerLine = 0;
    result1 = [];
    let groupNum = Array.from(names);
    wordsPerLine = Math.ceil(groupNum.length / numOfG.value)
    for (let L = 0; L < numOfG.value; L++) {
        result1[L] = [];
        for (let i = 0; i < wordsPerLine; i++) {
            let value = groupNum[i + L * wordsPerLine]
            if (!value) continue
            result1[L].push(value);
        }
    }
    console.log(result1);
    createResults(result1);
}
function numOfPeeps() {

    console.log(numPerG.value)
    console.log(names);
    let peepsArr = Array.from(names);
    result = new Array(Math.ceil(peepsArr.length / numPerG.value))
        .fill()
        .map(_ => Array.from(peepsArr.splice(0, numPerG.value)));
    console.log(result)
    createResults(result);
}
function double() {
    for (let i = 0; i < names.length; i++) {
        if (newName.value == names[i]) {
            alert("This name is already in the list dude.")
            second = true;
            newName.value = "";
        }
    }
}
function createResults(Array){
    listGroup.innerHTML ="";
    for(let i=0; i<Array.length;i++){
        let olElement = document.createElement("div");
        let createh4 = document.createElement("h4");
        let olLi = document.createElement("h5");
        olElement.classList = "box my-1 text-center";
        createh4.innerText = `Group ${i+1}`;
        olLi.innerText = Array[i];

        olElement.appendChild(createh4);
        olElement.appendChild(olLi);
        listGroup.appendChild(olElement)
    }

}
