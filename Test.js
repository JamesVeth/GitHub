const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");

let background = "green";

ctx.fillStyle = background;
ctx.fillRect(10,20, 100, 100);