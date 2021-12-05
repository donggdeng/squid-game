class Doll{
    constructor(){
        const scale = 0.1
        loader.load("../models/doll/scene.gltf", (gltf) => {
            scene.add(gltf.scene);
            gltf.scene.scale.set(scale, scale, scale);
            gltf.scene.position.set(-3, 0.4, 0);
            gltf.scene.rotation.y = -1.3

            this.doll = gltf.scene;
        })
    }

    lookBackward(){
        gsap.to(this.doll.rotation, {y: 1.95, duration: .45})
        setTimeout(() => isLookingBackward = true, 450)
    }

    lookForward(){
        gsap.to(this.doll.rotation, {y: -1.3, duration: .45})
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

