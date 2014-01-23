var textureCache = {};

//cache materials
var materialsToCache = 
[
    "eye-iris-blue.jpg",
    "scout_blue.jpg",
    "scout_head.jpg",
    "scout_red.jpg",
    "soldier_blue.jpg",
    "soldier_head.jpg",
    "soldier_red.jpg",
    "medic_blue.jpg",
    "medic_head.jpg",
    "medic_red.jpg",
    "demoman_blue.jpg",
    "demoman_head.jpg",
    "demoman_red.jpg",
    "smiley.jpg",
    "barrel01.jpg",
    "barrel_crate.jpg",
    "bench001a.jpg",
    "concretefloor003.jpg",
    "concretewall014a.jpg",
    "factory_pipe005.jpg",
    "heavy_head.jpg",
    "hvyweapon_red.jpg",
    "leaves_01.jpg",
    "mop_and_bucket01.jpg",
    "orange_cone001.jpg",
    "pickup_blue.jpg",
    "security_fence_alpha.png",
    "sky_night_01ft.jpg",
    "train_container_blue.png",
    "unform_locker_red.jpg",
    "uv_layout.jpg",
    "watercooler_bottle.jpg",
    "watercooler_sheet.jpg",
    "western_wood_door001b.jpg",
];

$(document).ready(function (){
    var currentPlayer = { 'Name':'', 'Team':'', 'Role':''};
    var currentBackground = "snakewater_last";
    var doorOpen = false;
    var dashHostname = 'http://'+document.location.hostname+':3600';
    var dashSocket = io.connect(dashHostname);
    // 3D standard global variables
    var container, scene, camera, renderer,  stats, composer;
    // 3D custom global variables
    var blenderMesh,
    material_depth,
    skyBox,
    parameters, i, j, k, h, color, x, y, z, s, n, nobjects,
    cameraStartPos;
    var cameraRotate = true;
    var clock = new THREE.Clock();
    var spotlight, light;
    var animation;
    var height = window.innerHeight;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    var postprocessing = { enabled  : true };
    var hBlur, vBlur;
    var profileTextMesh = {}; //collection of lines of 3d text (excluding player name)
     

    var matIndex = 0;
    var matCount = materialsToCache.length;
//    loadUp(matIndex); //commented because caching is not working right now

    function loadUp(_matIndex){
        textureCache[''+materialsToCache[_matIndex]+''] = THREE.ImageUtils.loadTexture('models/'+materialsToCache[_matIndex], {}, function() {
            cacheMat(_matIndex);
        });
    }
    
    function cacheMat(_matIndex) {
        if(_matIndex + 1 < matCount){ //first 4 parts
            _matIndex++;
            loadUp(_matIndex); //load next part
        }
        else {
            init();
            animate();
        }
    }
    
	function updateDashboard() {
		dashSocket.emit('send', {message:{type:'door', doorstatus:doorOpen}});
		dashSocket.emit('send', {message:{type:'background', backgroundname: currentBackground}});
		dashSocket.emit('send', {message:{type:'player', playername: currentPlayer.Name}});
	}
	
	setInterval(updateDashboard, 1000);
    
    dashSocket.on('message', function (data) {
        if( data.content == "playerInfo"){
                var playerInfo = JSON.parse(data.message);
                showPlayer(playerInfo);
        }
     });
    
    function showPlayer(_playerInfo){
        if(JSON.stringify(currentPlayer) !=  JSON.stringify(_playerInfo)){ //hacky object comparison
            //hide screen with door
            //if(doorOpen == true) {
                closeDoor(_playerInfo);
            //}
        }
    }

    function removePlayer(_pInfo){
        //remove text
        removeText();
        var callback = openDoor();
        //load new player
        if(currentPlayer.Team != _pInfo.Team){
            callback = null;
            removeModel(_pInfo);
            removeBackground();
        } 
        else if(currentPlayer.Role != _pInfo.Role){
            callback = null;
            removeModel(_pInfo);
        }

        insertText(_pInfo, callback);
        currentPlayer = _pInfo;
    }

    function insertModel(_pInfo){
        var teamName = (_pInfo.Team == 1) ? "blue" : "red";
        var playerClass = (_pInfo.Role == "Roamer" || _pInfo.Role == "Pocket") ? "Soldier" : _pInfo.Role;
        var modelLoader = new THREE.JSONLoader();
        modelLoader.load( "models/"+playerClass.toLowerCase()+"_"+teamName+".js", function ( geometry, materials ) { createScene( playerClass, true, 0, 0, 0, geometry, materials, -160,  0, -100, 3, openDoor ) } );
        dashSocket.emit('send', {message:{type:'player', playername: _pInfo.Name}});
    }

    function removeText(){
        scene.remove(scene.getObjectByName("Player"));
        for(var key in profileTextMesh){
            scene.remove(scene.getObjectByName(key));
        }
    }

    function removeModel(_pInfo){
        var playerClass = (currentPlayer.Role == "Roamer" || currentPlayer.Role == "Pocket") ? "Soldier" : currentPlayer.Role;
        scene.remove(scene.getObjectByName(playerClass));
        insertModel(_pInfo);
    }

    function removeBackground(){
        if(currentBackground != "process_spawn"){
            scene.remove(scene.getObjectByName(currentBackground));
            loadProcessSpawn();
            currentBackground = "process_spawn";
        }
        else{
            var processMeshes = ["process_spawn","watercooler", "uniformlocker", "bench1", "bench2", "mopandbucket"];
            processMeshes.forEach(function(element){ 
                scene.remove(scene.getObjectByName(element));
            });
            var snakewaterLastLoader = new THREE.JSONLoader();
            snakewaterLastLoader.load("models/snakewater_last.js", function (geometry, materials) { createScene( "snakewater_last", false, 0, -Math.PI/3, 0, geometry, materials, 0, 0, -600, 3, null) } );
            currentBackground = "snakewater_last";
        }
        dashSocket.emit('send', {message:{type:'background', backgroundname: currentBackground}});
    }

    function closeDoor(_playerInfo){
        $('#shutter').slideDown(1000, function(){
            removePlayer(_playerInfo);
            doorOpen = false;
            dashSocket.emit('send', {message:{type:'door', doorstatus:doorOpen}});
        }); 
    }

    function openDoor(){
        camera.position = cameraStartPos.clone();
        cameraRotate = true;
        $('#shutter img').css('height', window.innerHeight);
        $('#shutter img').css('position', 'absolute');
        var slideup = function(){ $('#shutter').slideUp(1000, function(){
            doorOpen = true;
            dashSocket.emit('send', {message:{type:'door', doorstatus:doorOpen}});
        });}; 
        setTimeout(slideup, 2000);
    }

    function insertText(_playerInfo, callback){
        // 3D text
        var materialFront = new THREE.MeshPhongMaterial( { color: 0xDDDDDD } );
        var materialSide = new THREE.MeshPhongMaterial( { color: 0x222222} );
        var materialArray = [ materialFront, materialSide ];
        var textGeom = new THREE.TextGeometry( _playerInfo.Name, 
        {
            size: 30, height: 6, curveSegments: 6,
            font: "alternategothicef", weight: "normal", style: "normal",
            bevelThickness: 1, bevelSize: 1, bevelEnabled: true,
            material: 0, extrudeMaterial: 1
        });
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        textMesh = new THREE.Mesh(textGeom, textMaterial );
        textGeom.computeBoundingBox();
        var textWidth = textGeom.boundingBox.max.x - textGeom.boundingBox.min.x;
        textMesh.position.set( 0, 160, 30 );
        textMesh.rotation.y = 0.5;
        textMesh.castShadow = true;
        textMesh.name = "Player";
        scene.add(textMesh);
        spotlight.target = textMesh;
        light.target = textMesh;
        
        // PROFILE TEXT
        var profileInfo = {};
        profileInfo = {'Role': _playerInfo.Role, 'Country': _playerInfo.Country, 'Notes': _playerInfo.Notes};
        var profileTextGeom = {};
        var profileTextOptions = {size:16, height: 2, curvesegements: 3, font: "alternategothicef", weight: "normal", style: "normal",
        bevelThickness: 1, bevelSize: 1, bevelEnabled: true,
        material: 0, extrudeMaterial: 1};
        var profileTextPos = {'x':textMesh.position.x,'y':textMesh.position.y-textGeom.boundingBox.max.y,'z':textMesh.position.z};
        var profileTextHeightOffset = 0;
        for (var i in profileInfo){
            if(profileInfo[i] != ''){
                var lines = profileInfo[i].split('\\n');
                lines.forEach(function(l,index){
                    var line = l;
                    if(index == 0) {
                        line = i + " : "+line; //add Name/Note/County prefix if first line of that section
                        profileTextGeom[i] = new THREE.TextGeometry(line, profileTextOptions);
                        profileTextMesh[i] = new THREE.Mesh(profileTextGeom[i], textMaterial);
                        profileTextGeom[i].computeBoundingBox();
                        profileTextMesh[i].position.set(profileTextPos.x, profileTextPos.y-profileTextHeightOffset, profileTextPos.z);
                        profileTextMesh[i].rotation.y = textMesh.rotation.y;
                        profileTextMesh[i].castShadow = true;
                        profileTextMesh[i].name = i;
                        profileTextHeightOffset += profileTextGeom[i].boundingBox.max.y * 1.3;
                    }
                    else {
                        var lineGeom;
                        var lineMesh;
                        var lineHeight;
                        line = " "+line;
                        lineGeom = new THREE.TextGeometry(line, profileTextOptions);
                        lineMesh = new THREE.Mesh(lineGeom, textMaterial);
                        lineGeom.computeBoundingBox();
                        lineHeight = lineGeom.boundingBox.max.y * 1.3;
                        lineMesh.position.set(0, -lineHeight*index, 0); //positions relative to parent mesh
                        lineMesh.castShadow = true;
                        profileTextMesh[i].add(lineMesh);
                        profileTextHeightOffset += lineHeight;
                    }
                });
                scene.add(profileTextMesh[i]);
            }
        }
        if(callback != null){
            callback();
        }
    }

    // MAIN


    init();
    animate();

    // FUNCTIONS        
    function init() 
    {
        // SCENE
        scene = new THREE.Scene();
        // CAMERA
        var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
        var VIEW_ANGLE = 40, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 1, FAR = 5000;
        camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
        scene.add(camera);
        camera.position.set(5,150,400);
        cameraStartPos = camera.position.clone();
        camera.lookAt(new THREE.Vector3(scene.position.x, scene.position.y+160, scene.position.z)); 

        // RENDERER
        renderer = new THREE.WebGLRenderer( {antialias: true}  );
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        renderer.shadowMapEnabled = true;
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        renderer.physicallyBasedShading = true;
        renderer.shadowMapEnabled = true;
        renderer.shadowMapSoft = true;

        /*// postprocessing

        var renderModel = new THREE.RenderPass( scene, camera );
        var effectBloom = new THREE.BloomPass( 1 );
        var effectCopy = new THREE.ShaderPass( THREE.CopyShader );
        
        effectFXAA = new THREE.ShaderPass( THREE.FXAAShader );
        
        var width = window.innerWidth || 2;
        var height = window.innerHeight || 2;
        
        effectFXAA.uniforms[ 'resolution' ].value.set( 1 / width, 1 / height );
        
        effectCopy.renderToScreen = true;
        
        composer = new THREE.EffectComposer( renderer );
        
        composer.addPass( renderModel );
        composer.addPass( effectFXAA );
        //composer.addPass( effectBloom );
        composer.addPass( effectCopy );*/

        container = document.getElementById( 'ThreeJS' );
        container.appendChild( renderer.domElement );
        
        // EVENTS
        THREEx.WindowResize(renderer, camera);
        THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
        
        // STATS
        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.bottom = '0px';
        stats.domElement.style.zIndex = 100;
        //container.appendChild( stats.domElement );
        
        // LIGHTS
        var ambient = new THREE.AmbientLight( 0x202020 );
        scene.add( ambient );
        
        light = new THREE.DirectionalLight( 0xffffff, 1.5 );
        light.position.set( 0, 100, 200 );  
        //scene.add( light );
    
        spotlight = new THREE.SpotLight(0xffffff, 2.5, 1800, Math.PI, 10);
        spotlight.position.set(60,200,400);
        spotlight.shadowDarkness = 0.2;
        spotlight.castShadow = true;
        spotlight.shadowMapWidth = 1024;
        spotlight.shadowMapHeight = 1024;
        //spotlight.shadowCameraVisible = true;
        scene.add(spotlight);
        
        var pointlight = new THREE.PointLight( 0xffaa00, 1, 500 );
        pointlight.position.set(-300,200,00);
        //scene.add( pointlight );
        var pointlight2 = new THREE.PointLight( 0xffaa00, 1, 500 );
        pointlight2.position.set(300,200,00);
        //scene.add( pointlight2 );
        
        // FLOOR
        var floorTexture = new THREE.ImageUtils.loadTexture( 'images/Dirt1.jpg' );
        floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
        floorTexture.repeat.set( 10, 10 );
        var floorMaterial = new THREE.MeshLambertMaterial( { map: floorTexture, side: THREE.DoubleSide } );
        var floorGeometry = new THREE.CircleGeometry(640, 16);
        var floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.position.y = 10;
        floor.rotation.x = Math.PI / 2;
        floor.receiveShadow = true;
        //scene.add(floor);

        // FENCE
        var fenceTexture = new THREE.ImageUtils.loadTexture( 'images/fence1.png' );
        fenceTexture.wrapT = fenceTexture.wrapS = THREE.RepeatWrapping;
        fenceTexture.repeat.set(4,1);
        var fenceMaterial = new THREE.MeshLambertMaterial( { map: fenceTexture, color:0x22222, transparent:true, side:THREE.BackSide});
        var fenceGeometry = new THREE.CylinderGeometry(600, 600, 300, 16, 16, true);
        var fenceMesh = new THREE.Mesh(fenceGeometry, fenceMaterial);
        fenceMesh.position.set(0,1,0);
        fenceMesh.receiveShadow = true;
        //scene.add(fenceMesh);
        

        // SKYBOX
        skyBoxGeometry = new THREE.SphereGeometry(1600,32,32, 0, Math.PI*2, 0, Math.PI/2)
        var skyTexture = THREE.ImageUtils.loadTexture( 'images/sky_badlands.jpg' );
        var skyMaterial = new THREE.MeshBasicMaterial( { map: skyTexture, side: THREE.BackSide } );
        skyBox = new THREE.Mesh( skyBoxGeometry, skyMaterial );
        skyBox.scale.y = 0.5;
        skyBox.position.set(0,-160,0);
        //scene.add(skyBox);

        // BACKGROUND SCENE LOADER
        var snakewaterLastLoader = new THREE.JSONLoader();
        snakewaterLastLoader.load("models/snakewater_last.js", function (geometry, materials) { createScene( "snakewater_last", false, 0, -Math.PI/3, 0, geometry, materials, 0, 0, -600, 3, null) } );

        // DEFAULT PLAYER (REMOVE) 

        /*var atmoInfo = {'Name': 'atmo', 'Role': 'Scout', 'Country': 'Ireland', 'Notes': 'Yes', 'Team':'1'};
        currentPlayer = atmoInfo;
        insertText(atmoInfo);
        
        var scoutLoader = new THREE.JSONLoader();
        scoutLoader.load( "models/scout_blue.js", function ( geometry, materials ) { createScene( "Scout", true, 0, 0, 0, geometry, materials, -160,  0, -100, 3, openDoor ) } ); */
        currentPlayer = {'Team':'1'} //to set first map to snakewater last
    }

    function animate() 
    {
        requestAnimationFrame( animate );
        render();       
        update();
    }

    function update()
    {
        stats.update();
    }

    function render() 
    {
        var delta = 0.5 * clock.getDelta();
        rotateCamera();
        THREE.AnimationHandler.update( delta );
        //composer.render();
        renderer.render(scene, camera);
       // renderer.clear();
        //composer.render();

    }

    function rotateText() {
        for (var i in profileTextMesh){
            if(profileTextMesh[i].rotation.y > 0.5){
                profileTextMesh[i].rotation.y -= 0.01;
            }
        }
    }

    function rotateCamera() {
        var limit = 300;
        var distance = camera.position.x - cameraStartPos.x;
        var offset = 0.1
        var scaling = offset + distance - (distance*distance)/limit; //N-shaped parabola between (0,offset) and (limit,offset)
        var step = 0.05;
     
        if((Math.ceil(distance - limit) < step) && cameraRotate){ //change direction when approaching boundary of camera path
            camera.position.x += step*scaling;
        }    
        else {
            limit = 0;
            cameraRotate = false;
            if (!cameraRotate && (Math.floor(distance - limit) > step)){
                camera.position.x -= step*scaling;
            }
            else {
                cameraRotate = true;
            }
        }    
        camera.lookAt(new THREE.Vector3(scene.position.x, scene.position.y+160, scene.position.z));
    }

    function ensureLoop( animation ) {
        for ( var i = 0; i < animation.hierarchy.length; i ++ ) {

            var bone = animation.hierarchy[ i ];

            var first = bone.keys[ 0 ];
            var last = bone.keys[ bone.keys.length - 1 ];

            last.pos = first.pos;
            last.rot = first.rot;
            last.scl = first.scl;
        }
    }

    function createScene( name, animated, rotationX, rotationY, rotationZ, geometry, materials, x, y, z, s, callback ) {
        if(animated){
            ensureLoop( geometry.animation );
            THREE.AnimationHandler.add( geometry.animation );
            for ( var i = 0; i < materials.length; i ++ ) {
                var m = materials[ i ];
                m.skinning = true;
//                m.map = textureCache[m.map.sourceFile];
            }
        }

        geometry.computeBoundingBox();
        var bb = geometry.boundingBox;

        var mesh = new THREE.SkinnedMesh( geometry, new THREE.MeshFaceMaterial( materials ) );
        mesh.name = name;
        mesh.position.set( x, y, z );
        mesh.scale.set( s, s, s );
        scene.add( mesh );

        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.rotation.x = rotationX;
        mesh.rotation.y = (name == "Demoman") ? rotationY - Math.PI / 2 :  rotationY;
        mesh.rotation.z = rotationZ;

        if(animated){
            animation = new THREE.Animation( mesh, geometry.animation.name );
            animation.JITCompile = false;
            animation.interpolationType = THREE.AnimationHandler.LINEAR;
            animation.play();
        }

        if(callback != null){
            callback();
        }
    }

    function linearize(depth) {
        var zfar = camera.far;
        var znear = camera.near;
        return -zfar * znear / (depth * (zfar - znear) - zfar);
    }


    function smoothstep(near, far, depth) {
        var x = saturate( (depth - near) / (far - near));
        return x * x * (3- 2*x);
    }

    function saturate(x) {
        return Math.max(0, Math.min(1, x));
    }

    function loadProcessSpawn() {
        var processSpawnRoomLoader = new THREE.JSONLoader();
        processSpawnRoomLoader.load("models/process_spawn_room.js", function ( geometry, materials ) { createScene("process_spawn", false, 0, -Math.PI/2, 0, geometry, materials, 0,  0, -300, 150, loadProcessSpawnProps) } );
    }

    function loadProcessSpawnProps(){
        var uniformLockerLoader = new THREE.JSONLoader();
        uniformLockerLoader.load("models/uniform_locker.js", function ( geometry, materials ) {  createScene( "uniformlocker", false, Math.PI/2, 0, 0, geometry, materials, 0,  0, -800, 3) } );

        var benchLoader = new THREE.JSONLoader();
        benchLoader.load("models/bench.js", function (geometry, materials) { createScene("bench1", false, 0, Math.PI/2, Math.PI, geometry, materials, -600, 0, -400, 3 ) } );
        benchLoader.load("models/bench.js", function (geometry, materials) { createScene("bench2", false, 0, Math.PI/2, Math.PI, geometry, materials, 600, 0, -400, 3) } );

        var waterCoolerLoader = new THREE.JSONLoader();
        waterCoolerLoader.load("models/watercooler.js", function (geometry, materials) { createScene("watercooler", false, 0, Math.PI, Math.PI, geometry, materials, -350, 0, -900, 3) } );

        var mopAndBucketLoader = new THREE.JSONLoader();
        mopAndBucketLoader.load("models/mop_and_bucket.js", function (geometry, materials) { createScene( "mopandbucket", false, 0, Math.PI, Math.PI, geometry, materials, 310, 0, -800, 3) } );
    }

});
