class Creature {
  constructor(clr, sz) {
    this.x = random(-width / 7, width + width / 7);
    this.y = random(-height / 7, height + height / 7);
    this.sz = sz;
    this.clr = clr;
    this.angle = random(360);
    this.off = 1;
    this.deathClock = random(100, 500);
    this.dying = false;
    this.dead = false;
    this.xoff = random(1000);
    this.yoff = random(1000);
    this.angoff = random(1000);
    this.xincr = random(0.0001, 0.001);
    this.yincr = random(0.0001, 0.001);
    this.anginc = random(0.0001, 0.001);
    this.phase = random(360);

    this.gene = random([instr, instr2]);
    this.turtle = new Gurtle(this.x, this.y, clr);
    this.pushNumber =0; // this will be set in the makeGene function
    this.gene2 = this.makeGene();
    
    console.log(this.gene2);
  }

  show() {
    if (!this.dead) {
      this.turtle.x = this.x;
      this.turtle.y = this.y;
      this.turtle.angle = this.angle;
      strokeWeight(1 + this.sz / 10);

      for (let i = 0; i < this.gene.length; i++) {
        // print(i, ins[i][0])
        switch (this.gene[i][0]) {
          case "l":
            this.turtle.left(this.gene[i][1] * this.off);

            break;

          case "r":
            this.turtle.right(this.gene[i][1] * this.off);

            break;
          case "f":
            this.turtle.forward(this.sz);
            break;
          case "push":
            this.turtle.pushIt();
            break;
          case "pop":
            this.turtle.popIt();
            break;
        }
      }
    }
  }

  showGene() {
    if (!this.dead) {
      this.turtle.x = this.x;
      this.turtle.y = this.y;
      this.turtle.angle = this.angle;
      strokeWeight(1 + this.sz / 5);

      for (let i = 0; i < this.gene2.length; i++) {
        // print(i, ins[i][0])
        switch (this.gene2[i][0]) { // this only looks at character
          case "l":
            this.turtle.left(this.gene2[i].substring(1) * this.off);

            break;

          case "r":
            this.turtle.right(this.gene2[i].substring(1) * this.off);

            break;
          case "f":
            this.turtle.forward(this.sz);
            break;
          case "{":
            this.turtle.pushIt();
            //print("pushed")
            break;
          case "}":
            this.turtle.popIt();
            break;
        }
      }
    }
  }

  squirm(n) {
    this.off = sin(n + this.phase);
  }

  move() {
    this.x = map(noise(this.xoff), 0, 1, -width / 7, width + width / 7); //need to spread them out a bit
    this.y = map(noise(this.yoff), 0, 1, -height / 7, height + height / 7);
    this.angle = noise(this.angoff) * 360;
    this.xoff += this.xincr;
    this.yoff += this.yincr;
    this.angoff += this.anginc;
  }

  wither() {
    if (this.dying) {
      this.deathClock--;
      this.sz *= 0.99;
      if (this.deathClock < 0) {
        this.dying = false;
        this.dead = true;
      }
    }
  }

  makeGene() {
    // may need to constrain angles for better result
    let pcount = 0

    let result = ["f"]; // always start with forward
    
    for (let i = 0; i < 10; i++) {
    let gn = ["l", "r", "f", "{"];
    let base = random(gn);
   

    // ten instructions long
   
      // push case
      if (base === "{") {
        result.push("{")
        pcount++
        let basein = ""; // set basin to bank be updated in whiel loop
        while (basein !== "}") {
          basein = random(["l", "r", "f", "}"]);
          let nucleotide = "";
          if (basein === "l" || basein == "r") {
            result.push(basein + floor(random([30,45,60,75]))); // append random angle
            result.push("f"); // always push a forward after a turn
          } else {
            // this case will only be f
            result.push("f");
          }
        }
        // break while
        result.push("}");
      }
      // other cases
      let nucleotide = "";
      if (base === "l" || base == "r") {
        result.push(base + floor(random([30,45,60,75]))); // append random angle
        result.push("f"); // always push a forward after a turn
      } else {
        // this case will only be f
        result.push("f");
      }
    }
    this.pushNumber = pcount;
    return result;
  }
}
