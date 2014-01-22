function loadProcessSpawn() {
    var processSpawnRoomLoader = new THREE.JSONLoader();
    processSpawnRoomLoader.load("models/process_spawn_room.js", function ( geometry, materials ) { createScene("processspawnroom", false, 0, -Math.PI/2, 0, geometry, materials, 0,  floor.position.y, -300, 150, loadProcessSpawnProps) } );
}

function loadProcessSpawnProps(){
    var processSpawnMesh = scene.getObjectByName("processspawnroom");
    processSpawnMesh.name = "process_spawn";
}
