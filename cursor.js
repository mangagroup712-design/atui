document.addEventListener("mousemove", (e) => {
    let x = e.clientX - 25;
    let y = e.clientY - 15;

    const image = document.getElementById("cursor-image");
    image.style.transform = `translate(${x}px, ${y}px)`;
});

const area = document.getElementById("myTextBox");
const img = document.getElementById("cursor-image");
document.addEventListener("mouseover", (e) => {
    const img = document.getElementById("cursor-image");
    if (e.target.id === "myTextBox" || e.target.id === "button") {
        img.src = "atsu-sanso.gif";
    }
    });
    
    document.addEventListener("mouseout", (e) => {
    const img = document.getElementById("cursor-image");
    if (e.target.id === "myTextBox" || e.target.id === "button") {
        img.src = "astukun.gif";
    }
    });