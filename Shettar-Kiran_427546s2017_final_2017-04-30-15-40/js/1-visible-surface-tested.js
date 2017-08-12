/*
I have used the following resources 
1. http://learningwebgl.com/blog/?p=370
2. https://github.com/mrdoob/three.js/issues/905
3. https://github.com/search?utf8=%E2%9C%93&q=ThreeJS&type=
4. http://www.mathopenref.com/cylinder.html
5. http://www.mathopenref.com/prism.html
*/
    var camera, controls, scene, renderer;
    var material, mesh, directionalLight, ambient;
    var start = Date.now();
    var canvas_width = 580;
    var canvas_height = 400;
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(canvas_width, canvas_height);

    document.body.appendChild(renderer.domElement);
    //details of the below line can be seen on line number 51
    var geometry = new THREE.CylinderGeometry(0, 80, 200, 100, 4, false);
    material = new THREE.MeshLambertMaterial({ color: 0xFFFF00, shading: THREE.FlatShading });
   
    function init(geometry, isCustom) {
        camera = new THREE.PerspectiveCamera(75, canvas_width / canvas_height, 1, 10000);
        camera.position.z = 300;
        controls = new THREE.OrbitControls( camera, renderer.domElement );
        controls.damping = 0.2;
        controls.addEventListener( 'change', render );
        scene = new THREE.Scene();
        var pcolor = $("#polyColor").val();
        material = new THREE.MeshLambertMaterial({color: 0xffff00, shading: THREE.FlatShading });
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        ambient = new THREE.AmbientLight(0xff0000);
        scene.add(ambient);
        directionalLight = new THREE.DirectionalLight(0xffff00);
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
        geometry = new THREE.CylinderGeometry($("#polyLength").val(), $("#polyLength").val(), $("#polyHeight").val(), $("#polySides").val(), 4, false);
        init(geometry);
        animate();
   } 
