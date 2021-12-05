const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

renderer.setClearColor(0xb7c3f3, 1);

const light = new THREE.AmbientLight( 0xffffff ); 
scene.add( light );

// global variables
const start_position = 3
const end_position = -start_position
const text = document.querySelector(".text")
const TIME_LIMIT = 10
let gameState = "loading"
let isLookingBackward = true

function createCube(size, positionX, rotY = 0, color = 0xfbc851){
    const geometry = new THREE.BoxGeometry(size.w, size.h, size.d);
    const material = new THREE.MeshBasicMaterial( { color: color } );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.x = positionX;
    cube.rotation.y = rotY;
    scene.add( cube );   
    return cube;
}

camera.position.z = 5;

const loader = new THREE.GLTFLoader();

function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Doll{
    constructor(){
        loader.load("../models/doll/scene.gltf", (gltf) => {
            scene.add(gltf.scene);
            gltf.scene.scale.set(.1, .1, .1);
            gltf.scene.position.set(-3, 0, 0);
            gltf.scene.rotation.y = -1.2

            this.doll = gltf.scene;
        })
    }

    lookBackward(){
        console.log("look doll", this.doll)
        gsap.to(this.doll.rotation, {y: 1.95, duration: .45})
        setTimeout(() => isLookingBackward = true, 450)
    }

    lookForward(){
        gsap.to(this.doll.rotation, {y: -1.2, duration: .45})
        setTimeout(() => isLookingBackward = false, 150)
    }

    async start(){
        this.lookBackward()
        await delay(Math.random() * 1000 + 1000)
        this.lookForward()
        await delay(Math.random() * 750 + 750)
        this.start()
    }
 }

 function createTrack(){
    createCube({w: start_position * 2 + .2, h: 1.5, d: 1}, 0, 0, 0xe5a716).position.z = -1;
    // createCube({w: .2, h: 1.5, d: 1}, start_position, -.35);
    // createCube({w: .2, h: 1.5, d: 1}, end_position, .35);
 }

 createTrack()

 class Player{
     constructor(){

        loader.load("../models/blue_skin/scene.gltf", (gltf) => {
            scene.add(gltf.scene);
            gltf.scene.scale.set(.015, .015, .015);
            gltf.scene.position.set(3, -.5, 0);
            gltf.scene.rotation.y = -2;
            console.log("gltf.scene", gltf.scene)
            this.man = gltf.scene;
        })
        this.manInfo = {
            positionX: start_position,
            velocity: 0
        }
     }

     run(){
        this.manInfo.velocity = .03
     }

     stop(){
         gsap.to(this.manInfo, {velocity: 0, duration: 0.1})
     }

     check(){
        if(this.manInfo.velocity > 0 && isLookingBackward) {
            text.innerText = "You lose!"
            gameState = "over"
        }
        if(this.manInfo.positionX < end_position + .4) {
            text.innerText = "You win!"
            gameState = "over"
        }
     }

     update(){
         this.check()
         if(gameState == "started"){
              this.manInfo.positionX -= this.manInfo.velocity;
              this.man.position.x = this.manInfo.positionX;
         }
     }
 }

let player = new Player();
let doll = new Doll();

async function init(){
    await delay(500)
    text.innerText = "Starting in 3"
    await delay(500)
    text.innerText = "Starting in 2"
    await delay(500)
    text.innerText = "Starting in 1"
    await delay(500)
    text.innerText = "Goo!!!!"
    startGame()
}

function startGame(){
    gameState = "started"
    let progressBar = createCube({w: 5, h: .1, d: 1}, 0)
    progressBar.position.y = 3.35
    gsap.to(progressBar.scale, {x: 0, duration: TIME_LIMIT, ease: "none"})
    doll.start()
    setTimeout(() => {
        if(gameState != "over"){
            text.innerText = "You ran out of time!"
            gameState = "over"
        }
    }, TIME_LIMIT * 1000)
}  

init()

function animate() {
    if(gameState == "over") return
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
    player.update();
}
animate();

window.addEventListener( 'resize', onWindowResize, false);

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

window.addEventListener('keydown', (e) => {
    if(gameState != "started") return
    if(e.key == "ArrowUp") {
        player.run()
    }
})

window.addEventListener('keyup', (e) => {
    if(e.key == "ArrowUp") {
        player.stop()
    }
})
