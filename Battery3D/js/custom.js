/*global $,console,THREE,TWEEN*/
/*jshint unused:false*/

var testRender = (function() {

	"use strict";

	// set the scene size
	var WIDTH = 700;
	var HEIGHT = 700;

	// set some camera attributes
	var VIEW_ANGLE = 45;
	var ASPECT = WIDTH / HEIGHT;
	var NEAR = 0.1;
	var FAR = 10000;

	// create a WebGL renderer, camera
	// and a scene
	var renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	var camera = new THREE.PerspectiveCamera(
		VIEW_ANGLE,
		ASPECT,
		NEAR,
		FAR
	);

	var objs = {};

	var scene = new THREE.Scene();

	var render = function() {
		renderer.render(scene, camera);
	};

	var animateProgress = function() {
		window.requestAnimationFrame(animateProgress);
		TWEEN.update();
		camera.lookAt(new THREE.Vector3(0,0,0));
		objs.particleSystem.rotation.y += 0.01;
		render();
	};

	var startAnimations = function() {

		new TWEEN.Tween(camera.position)
				.to({z: -800, y:600}, 4000 )
				.easing( TWEEN.Easing.Quadratic.InOut )
				.start();

		// animate height
		new TWEEN.Tween(objs.goop.scale)
				.to({y:8},5000)
				.easing( TWEEN.Easing.Quadratic.InOut )
				.delay(1750)
				.start();

		// animate height
		new TWEEN.Tween(objs.goop.position)
				.to({y:130},5000)
				.easing( TWEEN.Easing.Quadratic.InOut )
				.delay(1750)
				.start();

		// animate colour of goop
		new TWEEN.Tween(objs.goop.material.color)
				.to({r:0.25,g:0.75},3000)
				.easing( TWEEN.Easing.Quadratic.InOut )
				.delay(1750)
				.start();

		// animate particle height
		new TWEEN.Tween(objs.particleSystem.scale)
				.to({y:8},5000)
				.easing( TWEEN.Easing.Quadratic.InOut )
				.delay(1750)
				.start();

	};

	var init = function() {

		// get the DOM element to attach to
		// - assume we've got jQuery to hand
		var $container = $('#output');

		// add the camera to the scene
		scene.add(camera);

		// the camera starts at 0,0,0
		// so pull it back
		camera.position.z = -500;
		camera.position.y = 800;
		camera.lookAt(new THREE.Vector3(0,0,0));

		// texture cube images
		var urls = [
			'img/texture.jpg',
			'img/texture.jpg',
			'img/texture.jpg',
			'img/texture.jpg',
			'img/texture.jpg',
			'img/texture.jpg'
		];

		// wrap it up into the object that we need
		var textureCube = THREE.ImageUtils.loadTextureCube(urls);

		// glass material
		var glassMaterial = new THREE.MeshLambertMaterial({
			color: 0xffffff,
			opacity: 0.25,
			transparent: true,
			reflectivity: 1,
			envMap: textureCube,
			shininess: 500,
			shading: THREE.SmoothShading
		});
		var goopMaterial = new THREE.MeshBasicMaterial({
			color: 0xff0000,
			opacity: 0.5,
			transparent: true
		});
		var baseMaterial = new THREE.MeshBasicMaterial({
			color: 0x333333,
			envMap: textureCube,
			shininess: 200,
			shading: THREE.SmoothShading
		});
		var terminalMaterial = new THREE.MeshBasicMaterial({
			color: 0x444444,
			envMap: textureCube,
			shininess: 40,
			shading: THREE.SmoothShading
		});
		var planeMaterial = new THREE.MeshBasicMaterial({
			color: 0xFFFFFF
		});

		// edge softener
		var edgeModifier = new THREE.SubdivisionModifier(2);

		// battery base
		var batteryBase = new THREE.Mesh(new THREE.CylinderGeometry(100,100,10,50,50,false),baseMaterial);
		batteryBase.position.y = 0;
		objs.batteryBase = batteryBase;
		scene.add(batteryBase);

		// battery outside
		var batteryShell = new THREE.Mesh(new THREE.CylinderGeometry(99,99,300,50,50,false),glassMaterial);
		batteryShell.position.y = 150;
		objs.batteryShell = batteryShell;
		scene.add(batteryShell);

		// battery goop
		var goop = new THREE.Mesh(new THREE.CylinderGeometry(98,98,30,50,50,false),goopMaterial);
		goop.position.y = 17;
		objs.goop = goop;
		scene.add(goop);

		// battery top
		var batteryTop = new THREE.Mesh(new THREE.CylinderGeometry(100,100,10,50,50,false),baseMaterial);
		batteryTop.position.y = 300;
		edgeModifier.modify(batteryTop.geometry); 
		objs.batteryTop = batteryTop;
		scene.add(batteryTop);

		// battery terminal
		var batteryTerminal = new THREE.Mesh(new THREE.CylinderGeometry(20,20,20,50,50,false),terminalMaterial);
		batteryTerminal.position.y = 305;
		edgeModifier.modify(batteryTerminal.geometry); 
		objs.batteryTerminal = batteryTerminal;
		scene.add(batteryTerminal);

		// attach the render-supplied DOM element
		$container.append(renderer.domElement);

		// add some directional lighting
		var directionalLight = new THREE.DirectionalLight(0xffffff);
		directionalLight.position.set(200, 50, 0).normalize();
		scene.add(directionalLight);

		// create the particle variables
		var particleCount = 90;
		var particles = new THREE.Geometry();
		// create the particle variables
		var pMaterial = new THREE.ParticleBasicMaterial({
			color: 0xFFFFFF,
			size: 15,
			map: THREE.ImageUtils.loadTexture(
				"img/particle.png"
			),
			depthWrite: false,
			opacity: 0.65,
			blending: THREE.AdditiveBlending,
			transparent: true
		});

		// now create the individual particles
		for(var p = 0; p < particleCount; p++) {

			// create a particle with random position values
			var pX = (Math.random() * 120) - 60,
			pY = Math.random() * 30,
			pZ = (Math.random() * 120) - 60,
			particle = new THREE.Vertex(
			new THREE.Vector3(pX, pY, pZ)
			);

			// add it to the geometry
			particles.vertices.push(particle);
		}

		// create the particle system
		var particleSystem = new THREE.ParticleSystem(particles, pMaterial);

		// add it to the scene
		objs.particleSystem = particleSystem;
		scene.add(particleSystem);




		// start the renderer
		renderer.setSize(WIDTH, HEIGHT);
		renderer.shadowMapEnabled = true;
		renderer.shadowMapSoft = true;
		render();

		// kick of camera dolly animation and colour/particle animation
		startAnimations();
		animateProgress();

	};

	if (document.location.protocol === "file:") {
		$("html").addClass("is-file-protocol");
	}

	$.imgpreload(["img/texture.jpg","img/particle.png"], {
		all: function() {
			init();
		}
	});

	var getObjs = function() {
		return objs;
	};

	return {
		getObjs: getObjs,
		render: render
	};

}());