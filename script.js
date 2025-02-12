"use strict";

const maxPoints = 42;
const maxSkill = 8;
const skillWeights = [1, 6, 3, 7, 8, 9, 1, 6, 3, 4]
const sliders = document.querySelectorAll(".slider")
let sliderValues = [7,7,7,7,7,7,7,7,7,7]
sliders.forEach((x,i) => sliderValues[i] = +x.value * 10)

document.querySelectorAll(".slider").forEach(x => x.value = 7)

const Build = function(build){
    Object.assign(this, {

        bodyDamage : build[0],
        maxHealth : build[1],
        bulletSpeed : build[2],
        bulletHealth : build[3],
        bulletPenetration : build[4],
        bulletDamage : build[5],
        reload : build[6],
        movementSpeed : build[7],
        shieldRegen : build[8],
        shieldCapacity : build[9],
    
    });
    
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const getRWP = function (keys, values) {
    let randomArray = [];
    keys.forEach((item, index) => {
      var clone = Array(values[index]).fill(item);
      randomArray.push(...clone);
    });
  
    return randomArray[~~(Math.random() * randomArray.length)];
  };

const generateRandomBuild = function(points, max, weights){
    let build = new Build([0,5,0,0,0,0,0,0,0,0])
    let i = points - 5;
    while(i > 0){
        const randomIndex = getRWP(Object.keys(build), weights)
        const value =  build[randomIndex]
        if (value < max && randomIndex !== "maxHealth") {
        build[randomIndex]++
        i--
        }
    }
    return build;
}

sliders.forEach((x,i) => x.addEventListener("input", function(){
    sliderValues[i] = +x.value
}))

document.querySelector(".generate").addEventListener("click", function(){
    document.querySelector(".output").textContent = Object.values(generateRandomBuild(maxPoints, maxSkill, sliderValues)).join("/")
})