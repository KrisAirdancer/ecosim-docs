let archDiagram_light_SRC = "./assets/ecosim-light.svg";
let archDiagram_dark_src = "./assets/ecosim-dark.svg";

let darkClasses = [
    "bg-dark",
    "font-gray"
]

let darkModeActive = localStorage.getItem("darkModeActive");

if (darkModeActive == null) { darkModeActive = false; }

if (darkModeActive === "true") { darkModeActive = false; }
else { darkModeActive = true; }

toggleDarkMode();

function toggleDarkMode()
{
    let body = document.querySelector("body");
    let lightDarkButton = document.getElementById("lightDarkButton")
    let cards = document.querySelectorAll(".card");
    let archDiagram = document.getElementById("architecture-diagram");
    console.log(archDiagram)
    if (darkModeActive)
    {
        darkClasses.forEach(darkClass => {
            body.classList.remove(darkClass);
        })

        lightDarkButton.innerText = "🌙";
        lightDarkButton.classList.add("btn-dark")

        archDiagram.src = archDiagram_light_SRC;
        
        cards.forEach(card => {
            card.classList.remove("bg-gray-700")
        })
    }
    else
    {
        darkClasses.forEach(darkClass => {
            body.classList.add(darkClass);
        })
        
        lightDarkButton.innerText = "☀️";
        lightDarkButton.classList.remove("btn-dark")
        
        archDiagram.src = archDiagram_dark_src;

        cards.forEach(card => {
            card.classList.add("bg-gray-700")
        });
    }
    
    darkModeActive = !darkModeActive;
    
    localStorage.setItem("darkModeActive", darkModeActive);
}