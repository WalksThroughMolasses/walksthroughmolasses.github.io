// Ambience Player Sketch
let ambiencePlayer = function(p) {
  let ambience;
  let fft;
  let img;
  let canvasSize = 400;
  let imgDiameter = 250; // Diameter of the circle
  let radius = imgDiameter / 2; 
  let maskGraphics;
  let panAmount = 0;

  p.preload = function() {
    ambience = p.loadSound('audio/casurina_sands.mp3');
    img = p.loadImage('img/head-square.jpg'); // Load the image in preload
  };

  p.setup = function() {
    let canvas = p.createCanvas(canvasSize, canvasSize);
    canvas.parent('dummy');
    canvas.mousePressed(playSound);
    p.angleMode(p.DEGREES);
    fft = new p5.FFT();

    // Create mask for the image
    maskGraphics = p.createGraphics(imgDiameter, imgDiameter);
    maskGraphics.ellipse(imgDiameter / 2, imgDiameter / 2, imgDiameter, imgDiameter);
    img.mask(maskGraphics); // Apply the mask to the image once
    maskGraphics.imageMode(p.CENTER);
    maskGraphics.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = function() {
    p.background(255);
    p.stroke(0);
    p.strokeWeight(4);
    p.noFill();

    p.translate(p.width / 2, p.height / 2);

    let wave = fft.waveform();

    // Update the circle boundary based on waveform
    for (let t = -1; t <= 1; t += 2) {
      p.beginShape();
      for (let i = 0; i <= 180; i += 4) {
        let index = p.floor(p.map(i, 0, 180, 0, wave.length - 1));
        let r = p.map(wave[index], -1, 1, 0, 250);

        let x = r * p.sin(i) * t;
        let y = r * p.cos(i);
        p.vertex(x, y);
      }
      p.endShape();
    }

    // Draw the masked image centered at the canvas
    p.imageMode(p.CENTER);
    p.image(img, 0, 0, imgDiameter, imgDiameter);

    // Check if the mouse is over the circular area
    let d = p.dist(p.mouseX, p.mouseY, p.width / 2, p.height / 2); // Distance from mouse to circle center
    if (d <= radius) {
      p.cursor(p.HAND); // Change cursor to hand if over circle
      panAmount = p.map(p.mouseX, 0, p.width, -0.75, 0.75);
    } else {
      p.cursor(p.ARROW); // Change cursor back to arrow if not over circle
      panAmount = 0;
    }

    ambience.pan(panAmount);
  };

  function playSound() {
    if (ambience.isPlaying()) {
      ambience.pause();
    } else {
      ambience.play();
    }
  }
};


// Bells Sketch
let bellsSketch = function(p) {
  let ripples = [];
  const rippleWidth = 3;

  let rippleShader;
  let rippleSource;
  let rippleSpeed = 4; // Speed at which the ripple source moves towards the mouse
  let currBuff, prevBuff;

  let mousePressed = false

  const canvasWidth = p.windowWidth;
  const canvasHeight = p.windowHeight;

  // TODO: see if there's a way to make the ripple trigger the bells itself

  let damping = 1;

  let bells = [];
  const bellNotes = {
    A3: 160,
    C3: 120,
    D3: 80,
    E3: 40,
    G3: 20,
    A4: 10
  };

  p.preload = function () {
    rippleShader = p.loadShader('ripple.vert', 'ripple.frag');
  }

  p.setup = function() {
    // setup canvas
    let canvas = p.createCanvas(canvasWidth, canvasHeight, this.WEBGL);
    canvas.parent("bells");
    // canvas.mousePressed(createRipple);
    p.pixelDensity(1);
    p.noSmooth();

    rippleSource = p.createVector(0, 0); // Start at the center

    // create bells
    // for(const note in bellNotes) {
    //   s = bellNotes[note]; // size
    //   bells.push(new makeBells(p.random(75, canvasWidth-50), p.random(75, canvasHeight-50), s));
    // }

    // create buffers
    currBuff = p.createGraphics(canvasWidth, canvasHeight);
    currBuff.pixelDensity(1);
    currBuff.noSmooth();

    prevBuff = p.createGraphics(canvasWidth, canvasHeight);
    prevBuff.pixelDensity(1);
    prevBuff.noSmooth();
    
    // set the shader
    p.shader(rippleShader);

    rippleShader.setUniform("damping", damping);
    rippleShader.setUniform("res", [canvasWidth, canvasHeight]);

  }

  p.draw = function() {
    //p.background('0')

    let target = p.createVector(p.mouseX - p.width / 2, p.mouseY - (p.height / 2));

    rippleSource.lerp(target, rippleSpeed / rippleSource.dist(target));

    p.stroke(255);
    if (p.mouseIsPressed) {
      if (!mousePressed) {
        rippleSource.x = p.mouseX - p.width / 2;
        rippleSource.y = p.mouseY - (p.height / 2);
      }
      p.strokeWeight(10)
      p.point(rippleSource.x, rippleSource.y);
      mousePressed = true
    }
    else {
      mousePressed = false
    }
  

    // add rain drop
    p.stroke(p.random(255));
    p.point(p.random(p.width) - p.width/2, p.random(p.height) - p.height/2);

    // update buffers
    prevBuff.image(currBuff, 0, 0);
    currBuff.image(p.get(), 0, 0);
    
    // set the buffers inside the shader
    rippleShader.setUniform('currBuff', currBuff);
    rippleShader.setUniform('prevBuff', prevBuff);

    // give shader geometry to draw on
    p.rect(-p.width/2, -p.height/2, p.width, p.height);

    // update and display bells each time draw loops
    for (let i = 0; i < bells.length; i++) {
      bells[i].ellipse();
    }

    // update and display ripples each time draw loops
    for (let i = 0; i < ripples.length; i++) {
      ripples[i].update();
      ripples[i].display();

      for (let j = 0; j < bells.length; j++) {
        // check for collision and play bell sound
          overlap = checkOverlap(ripples[i], bells[j])
          if (overlap && bells[j].triggered === false) {
            note = Object.keys(bellNotes)[j];
            const sound = new Audio(`audio/${note}.mp3`);
            sound.play();

            // Mark the bell as triggered to avoid repeated triggering
            bells[j].triggered = true;
            // triggered bells glow brighted
            bells[j].g += 50;
            bells[j].b += 50;
          }

          //console.log(`Bell ${j + 1} trigger state: ${bells[j].triggered}`);
      }

      // delete ripple if reach lifespan
      if (ripples[i]. lifespan <= 0) {
        ripples.splice(i, 1);
      }
    }
  }

  // add a ripple whenever the mouse is clicked (will need to add exception for clicking on a bell)
  // function createRipple(){
  //   console.log(p.mouseX, p.mouseY)
  //   //prevBuff[p.mouseX][p.mouseY] = 2500;
  //   stroke(255)
  //   point(p.mouseX - canvasWidth/2, p.mouseY - canvasHeight/2);
  //   //ripples.push(new makeRipple(p.mouseX, p.mouseY, 1, rippleWidth)) // third parameter is a random size
  // }

  function selectBell() {
    return
  }

  function makeBells(x, y, s) {
    // set properties
    this.x = x; // x pos
    this.y = y; // y pos
    this.s = s; // size

    // color values
    this.r = p.random(205);
    this.g = p.random(205);
    this.b = p.random(205);
    this.a = 255;

    // property to track if the bell has been triggered
    this.triggered = false;

    this.ellipse = function() {
      // define visual properties
      p.fill(this.r, this.g, this.b, this.a);
      p.noStroke();

      // draw ellipse
      p.ellipse(this.x, this.y, this.s);
    }

  }

  // class for making ripples
  function makeRipple(x, y, s, w) {
    // set properties
    this.x = x; // x pos
    this.y = y; // y pos
    this.s = s; // size
    this.w = w; // line width

    // color values
    this.r = 0;
    this.g = 170;
    this.b = 255;
    this.a = 0; // 0 alpha with new ripple effect

    // lifespan
    this.lifespan = 750

    // function to create ripple
    this.display = function() {
      // define visual properties
      p.stroke(this.r, this.g, this.b, this.a);
      p.strokeWeight(this.w);
      p.noFill();

      // draw ellipse
      p.ellipse(this.x, this.y, this.s);
    }

    // grow the ellipse and fade
    this.update = function() {
      this.s = this.s + 1.41;
      this.lifespan--;
      p.stroke(this.r, this.g, this.b, this.a);
    }
  }

  // Function to check if two circles overlap
  function checkOverlap(circle1, circle2) {
    const dx = circle1.x - circle2.x;
    const dy = circle1.y - circle2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const bellRadiiPlusRipple = circle1.s/2 + circle2.s/2;

    return distance < bellRadiiPlusRipple;
  }
}
