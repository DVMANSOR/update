function AddLog(text) {
    const parent = document.getElementById("log");
    const breakk = document.createElement("br");
    const engninestate = document.getElementById("enginestatus");

    parent.append(text);
    parent.append(breakk);
    log.scrollTop = log.scrollHeight;
}

function EngineText(text){
    const enginestate = document.getElementById("enginestatus");
    const led = document.getElementById("led")
    enginestate.innerHTML = text;
    if (text === "Engine Status: Starting"){
      led.style = "background: var(--warn);"
    }
    if (text === "Engine Status: Running"){
      led.style = "background: var(--good);"
    }
    if (text === "Engine Status: OFF"){
      led.style = "background: var(--bad);"
    }
}
// Sync
async function Sync() {
  await window.pywebview.api.sync()
}

// tabs control

const tabs = document.getElementById("tabs")
tabs.addEventListener("click", () => {
    closeSkins()
});


// Window Management Part
async function Close() {
    const respons = await window.pywebview.api.close()
}
async function Minimize() {
    const respons = await window.pywebview.api.minimize() 
}
async function Maximize() {
    const respons = await window.pywebview.api.fullscreen()
}
// ------------------------------------------------------------
// OpenSkinList
function ShowSkins(Name){
  const skinspart = document.getElementById("skinspart");
  if (skinspart) {
  skinspart.classList.add("show");
} else {
  console.error("skinspart not found!");
}
  window.pywebview.api.loadskins(Name);
}
function closeSkins(){
    const skinspart = document.getElementById("skinspart")
    const parent = document.getElementById("bottomlist");
    parent.innerHTML = "";
    skinspart.classList.remove("show");
}

// ------------------------------------------------------------
// Download Skin
function downloadskin(url, name, champname){
    window.pywebview.api.download_file(url, name, champname);
}

// ------------------------------------------------------------
// Load Skins Images
function addSkin(Name, img, url, champname){
    const parent = document.getElementById("bottomlist");
    const child = document.createElement("div");
    child.className = "card";
    child.id = "card";
    child.dataset.url = url;
    child.addEventListener("click", () => {
        downloadskin(url, Name, champname)
    })
    parent.addEventListener("contextmenu", () => {
        closeSkins();
    })
    parent.appendChild(child);
    const child2 = document.createElement("div");
    child2.className = "name";
    child2.innerText = Name;
    const child3 = document.createElement("img");
    child3.src = img;
    child.append(child2);
    child.append(child3);
}


// Loading Champions
function addChamps(Name, imgurl) {
    const parent = document.getElementById("grid");

    const child = document.createElement("div");
    child.className = "card";
    child.id = "card"
    child.addEventListener("click", () => {
        ShowSkins(Name);
    });
    parent.appendChild(child);
    const child2 = document.createElement("div");
    child2.className = "name";
    child2.innerText = Name;
    const child3 = document.createElement("img");
    child3.src = imgurl;
    child.append(child2);
    child.append(child3);
}
// ------------------------------------------------------------
// Delete Skin

function DeleteSkin(champ, name){
  window.pywebview.api.delete_skin(name+"@"+champ);
}

// Load Installed Skins
function clearInstalled(){
    const parent = document.getElementById("installedgrid");
    parent.innerHTML = "";
}
function addInstalled(Name, imgurl) {
    const parent = document.getElementById("installedgrid");

    const child = document.createElement("div");
    child.className = "card";
    child.id = "card"
    child.addEventListener("click", () => {
    })
    parent.appendChild(child);
    const child2 = document.createElement("div");
    child2.className = "name";
    child2.innerText = Name;
    const child3 = document.createElement("img");
    child3.src = imgurl;
    child.append(child2);
    child.append(child3);
}
// ------------------------------------------------------------
// Searching
const searchInput = document.getElementById("search")
const grid = document.getElementById("grid")

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const cards = grid.querySelectorAll(".card");
    console.log(query);

    cards.forEach(card => {
        const name = card.querySelector(".name").innerText.toLowerCase();
        if (name.includes(query)){
            card.style.display = "";
        } else{card.style.display = "none";}
    });
});
// ------------------------------------------------------------
// Status
function UpdateStatus(Text) {
    const state = document.getElementById("toptext");
    state.innerHTML = "";
    state.innerHTML = Text;
}