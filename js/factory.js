
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

function createPlatform() {
    const geometry = new THREE.CylinderGeometry( .6, .6, .4, 32 );
    const material = new THREE.MeshBasicMaterial( {color: 0x78d46a} );
    const cylinder = new THREE.Mesh( geometry, material );
    cylinder.position.y = -.25;
    cylinder.position.x = -4;
    scene.add( cylinder );
}

function createLine() {
    const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
    const points = [];
    points.push( new THREE.Vector3( - 10, -5, 0 ) );
    points.push( new THREE.Vector3( 0, 5, 0 ) );
    // points.push( new THREE.Vector3( 10, 0, 0 ) );

    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometry, material );
    scene.add( line );
}