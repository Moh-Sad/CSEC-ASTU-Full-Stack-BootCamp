let x = 5;
let y = 10;

function swap(x, y) {
    let temp = x;
    x = y;
    y = temp;
    console.log("After Swap")
    console.log(x, y); 
}
console.log("Before Swap")
console.log(x, y); 
swap(x, y);
