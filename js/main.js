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

function createCube(size, positionX, positionY, rotX = 0, color = 0xfbc851){
    const geometry = new THREE.BoxGeometry(size.w, size.h, size.d);
    const material = new THREE.MeshBasicMaterial( { color: color } );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.x = positionX;
    cube.position.y = positionY;
    cube.rotation.x = rotX;
    scene.add( cube );   
    return cube;
}

camera.position.z = 5;

const loader = new THREE.GLTFLoader();

function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

 function createTrack(){
    createCube({w: start_position * 3 + .2, h: 2, d: 1}, 0, -1.08, 1.6, 0xe5a716).position.z = -1;
    // createCube({w: .2, h: 1.5, d: 1}, start_position, -.35);
    // createCube({w: .2, h: 1.5, d: 1}, end_position, .35);
 }

 createTrack()

 

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
