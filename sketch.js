
let creatureClr; 
let fated = false;
let greg; //variable to hold gurtle
let population=[];
let pressed = false //for de bouncing
function setup() {
  createCanvas(800,800);
  angleMode(DEGREES);
  for (let i =0;i<30;i++){
    population[i]= new Creature(10) // all the same elemet size
  
  }
   
}


function draw(){
  background(170,230,246)
  for (let i = 0; i<population.length; i++){
  population[i].showGene();
  population[i].squirm(frameCount)
  population[i].wither(); // forgot to call tis
  population[i].move();
  }
  
  if (!fated){
    fill(0,0,255)
    textSize(30)
    noStroke()
    text("Press to do selection for fittest",10,100)
  } else{
    fill(255,0,0)
    textSize(30)
    noStroke()
    text("Press to reset population",10,100)
  }
}


function mouseClicked(){
  let fate = random([instr,instr2])
  if (!pressed){
    pressed = true;
  if (!fated){
  for (let i =0;i<population.length;i++){
    // select branches 3 and over
     // count number of "push" branch in dna
     // i can do this in the creature when i create dna
     if(population[i].pushNumber<4){
      population[i].dying = true
      print(population[i].pushNumber)
     }
    fated = true
  }
} else{
  for (let i =0;i<population.length;i++){
    population[i].gene = random([instr,instr2])
    population[i].dying = false;
    population[i].dead = false;
    population[i].sz = 10;//random(5,30); //reset size
    population[i].deathClock = random(100,500); // need to reset death clock too
    population[i].gene2 = population[i].makeGene(); //get new dna but have to set it to gene
  }
  fated = false

}
  }
}


function mouseReleased(){
  pressed = false;
}