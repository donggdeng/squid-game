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

