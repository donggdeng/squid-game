const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

renderer.setClearColor(0xb7c3f3, 1);

const light = new THREE.AmbientLight( 0xffffff ); 
scene.add( light );

// global variables
const start_position = 4
const end_position = -3
const doll_position = -4
const text = document.querySelector(".text")
const TIME_LIMIT = 13
let gameState = "loading"
let isLookingBackward = true

camera.position.z = 5;

const loader = new THREE.GLTFLoader();

function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

 function createTrack(){
    createCube({w: start_position * 3 + .2, h: 3, d: .2}, 0, -0.68, 1.6, 0xe5a716).position.z = -1;
 }

 function createEndLine(){
    createCube({w: .1, h: 3, d: .2}, end_position, -0.68, 1.6, 0x000000).position.z = -1;
 }

createTrack()
createPlatform()
createEndLine()

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
