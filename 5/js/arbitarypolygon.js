    var camera, controls, scene, renderer;
    var material, mesh, directionalLight, pointLight, ambient;
    var start = Date.now();
    var canvas_width = 500;
    var canvas_height = 300;
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(canvas_width, canvas_height);
	renderer.color = "red";
	
    document.body.appendChild(renderer.domElement);
	
        
    var geometry = new THREE.CylinderGeometry(50, 50, 180, 6, 4, false);
    material = new THREE.MeshLambertMaterial({ color: 0xFFFF00, shading: THREE.FlatShading });
   
    function init(geometry, isCustom) {
        camera = new THREE.PerspectiveCamera(75, canvas_width / canvas_height, 1, 10000);
        camera.position.z = 300;
        controls = new THREE.OrbitControls( camera, renderer.domElement );
        controls.damping = 0.2;
        controls.addEventListener( 'change', render );
        scene = new THREE.Scene();
        var pcolor = $("#polyColor").val();
        material = new THREE.MeshLambertMaterial({color: 0xFFFF00, shading: THREE.FlatShading });
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        ambient = new THREE.AmbientLight(0x404040);
        scene.add(ambient);
        directionalLight = new THREE.DirectionalLight(0xff0000);
        directionalLight.position = camera.position;
        scene.add(directionalLight);;
    }

    function animate() {
        requestAnimationFrame(animate);
	controls.update();
        render();
    }

    function render() {
        var delta = Date.now() - start;
        mesh.rotation.x = delta * 0.0009;
        mesh.rotation.z = delta * 0.0002;
        renderer.render(scene, camera);
    }

   function modelPrism(){
        //Draw prism based on user input
        geometry = new THREE.CylinderGeometry($("#polyLength").val(), $("#polyLength").val(), $("#polyHeight").val(), $("#polySides").val(), 5, false);
        init(geometry);
        animate();
   } 
