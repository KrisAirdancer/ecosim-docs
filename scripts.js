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
    let navbar = document.querySelector("nav");
    if (darkModeActive)
    {
        darkClasses.forEach(darkClass => {
            body.classList.remove(darkClass);
        })

        lightDarkButton.innerText = "🌙";
        lightDarkButton.classList.add("btn-dark")

        // navbar.classList.add("font-sky-600")
        // navbar.classList.remove("font-sky-400")
    }
    else
    {
        darkClasses.forEach(darkClass => {
            body.classList.add(darkClass);
        })
        
        lightDarkButton.innerText = "☀️";
        lightDarkButton.classList.remove("btn-dark")

        // navbar.classList.remove("font-sky-600")
        // navbar.classList.add("font-sky-400")
    }

    darkModeActive = !darkModeActive;

    localStorage.setItem("darkModeActive", darkModeActive);
}