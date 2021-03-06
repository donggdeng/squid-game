class Player{
    constructor(){

       loader.load("../models/blue_skin/scene.gltf", (gltf) => {
           scene.add(gltf.scene);
           gltf.scene.scale.set(.015, .015, .015);
           gltf.scene.position.set(start_position, -.5, 0);
           gltf.scene.rotation.y = -1.8;
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
       if(this.manInfo.positionX < end_position + .05) {
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