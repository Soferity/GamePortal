'use strict';

let scene,
	camera,
	renderer,
	controls,
	width,
	height;

let ground,
	dotSystem,
	jar;

let jarFireflies = [],
	fireflies = [];

function init() {
	width = window.innerWidth,
		height = window.innerHeight;

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
	camera.lookAt(scene.position);
	camera.position.z = 500;

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(width, height);
	renderer.setClearColor(0x000A3D);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	// controls = new THREE.OrbitControls(camera, renderer.domElement);

	addLights();
	drawGround();
	drawDotSystem();
	drawJar();
	drawFireflies();

	document.getElementById('world').appendChild(renderer.domElement);
	window.addEventListener('resize', onResize, false);
}

function addLights() {
	const ambientLight = new THREE.AmbientLight(0xCCD5FF, 0.8);
	scene.add(ambientLight);

	const directLight = new THREE.DirectionalLight(0xE1FEA4, 0.5);
	directLight.castShadow = true;
	directLight.position.set(200, 200, 200);
	scene.add(directLight);

	const pointLight = new THREE.PointLight(0xFF007B, 0.4);
	pointLight.castShadow = true;
	pointLight.position.set(-100, 100, 100);
	scene.add(pointLight);
}

function drawGround() {
	const geometry = new THREE.TetrahedronGeometry(200, 2);
	const material = new THREE.MeshPhongMaterial({
		color: 0x0A9381,
		shading: THREE.FlatShading,
	});

	ground = new THREE.Mesh(geometry, material);
	ground.scale.set(3, 1, 2);
	ground.position.y = -305;
	ground.castShadow = true;
	ground.receiveShadow = true;
	scene.add(ground);
}

function drawDotSystem() {
	dotSystem = new THREE.Group();
	scene.add(dotSystem);

	const system1 = new DotSystem({
		intensity: 3000,
		color: 0xE1FEA4,
		xSpread: 800,
		ySpread: 800,
		zSpread: 800,
	});
	dotSystem.add(system1.group);

	const system2 = new DotSystem({
		intensity: 100,
		color: 0xFF007B,
		xSpread: 300,
		ySpread: 500,
		zSpread: 400,
		size: 13,
	});
	system2.group.position.set(-100, -80, 0);
	dotSystem.add(system2.group);
}

function drawJar() {
	jar = new THREE.Group();
	jar.position.set(-100, -10, 20);
	jar.rotation.z = 0.1;
	scene.add(jar);

	const jarGeometry = new THREE.CylinderGeometry(100, 110, 200, 10);
	const jarMaterial = new THREE.MeshPhongMaterial({
		color: 0xA9B8FC,
		transparent: true,
		opacity: 0.5,
		depthWrite: false,
		shading: THREE.FlatShading,
	});

	const body = new THREE.Mesh(jarGeometry, jarMaterial);
	body.castShadow = true;
	body.receiveShadow = true;
	jar.add(body);

	const capGeometry = new THREE.CylinderGeometry(100, 100, 30, 10);
	const capMaterial = jarMaterial.clone();
	capMaterial.opacity = 0.8;
	const cap = new THREE.Mesh(capGeometry, capMaterial);
	cap.castShadow = true;
	cap.receiveShadow = true;
	cap.position.set(38, 110, 0);
	cap.rotation.z = 0.13;
	jar.add(cap);

	const bottomGeometry = new THREE.CylinderGeometry(110, 110, 20, 10);
	const bottom = new THREE.Mesh(bottomGeometry, jarMaterial);
	bottom.castShadow = true;
	bottom.receiveShadow = true;
	bottom.position.y = -110;
	jar.add(bottom);
}

function drawFireflies() {
	const randSpread = pos => THREE.Math.randFloatSpread(pos);
	const rand = (min, max) => THREE.Math.randFloat(min, max);

	for (let i = 0; i < 4; i += 1) {
		const firefly = new Fly({
			light: false,
			bodyColor: 0x5363B2,
			wingColor: 0xA9B8FC,
			lightColor: 0x00FFA5,
		});
		firefly.group.position.set(randSpread(160), randSpread(190), randSpread(160));

		const scale = rand(0.4, 0.8);
		firefly.group.scale.set(scale, scale, scale);

		jar.add(firefly.group);
		jarFireflies.push(firefly);
	}
	for (let i = 0; i < 5; i += 1) {
		const firefly = new Fly({
			light: true,
			bodyColor: 0x5363B2,
			wingColor: 0xA9B8FC,
			lightColor: 0x00FFA5,
		});
		firefly.group.position.set(randSpread(400), rand(0, 300), randSpread(200));

		const scale = rand(0.3, 1);
		firefly.group.scale.set(scale, scale, scale);

		scene.add(firefly.group);
		fireflies.push(firefly);
	}
}

function onResize() {
	width = window.innerWidth;
	height = window.innerHeight;
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize(width, height);
}

function animate() {
	requestAnimationFrame(animate);

	render();
}

function render() {
	const timer = 0.0001 * Date.now();

	jarFireflies.forEach((firefly, index) => {
		firefly.moveWings();

		const xPos = 50 * Math.cos(timer * index);
		const yPos = 80 * Math.sin(timer + index);
		const zPos = 60 * Math.sin(timer + index);
		firefly.group.position.set(xPos, yPos, zPos);
	});

	fireflies.forEach((firefly, index) => {
		firefly.moveWings();

		const xPos = 400 * Math.cos(timer + index);
		const yPos = (60 * Math.sin(timer * index)) + 150;
		const zPos = 100 * Math.sin(timer + index);
		firefly.group.position.set(xPos, yPos, zPos);
	});

	dotSystem.rotation.x += 0.0003;
	dotSystem.rotation.y -= 0.0001;

	renderer.render(scene, camera);
}

class DotSystem {
	constructor({
		intensity = 5000,
		color = 0xffffff,
		xSpread = 1000,
		ySpread = 1000,
		zSpread = 1000,
		size = 6,
	}) {
		this.group = new THREE.Group();

		this.intensity = intensity;
		this.color = color;
		this.xSpread = xSpread;
		this.ySpread = ySpread;
		this.zSpread = zSpread;
		this.size = size;

		this.draw();
	}
	draw() {
		const geometry = new THREE.Geometry();
		const colors = [];

		const loader = new THREE.TextureLoader();
		loader.crossOrigin = false;
		loader.load('img/particle.svg', (texture) => {
			for (let i = 0; i < this.intensity; i += 1) {
				const star = new THREE.Vector3();
				star.x = THREE.Math.randFloatSpread(this.xSpread);
				star.y = THREE.Math.randFloatSpread(this.ySpread);
				star.z = THREE.Math.randFloatSpread(this.zSpread);

				geometry.vertices.push(star);

				colors[i] = new THREE.Color(this.color);
			}
			geometry.colors = colors;

			const material = new THREE.PointsMaterial({
				size: this.size,
				map: texture,
				vertexColors: THREE.VertexColors,
				alphaTest: 0.5,
				transparent: true,
			});

			const particles = new THREE.Points(geometry, material);
			this.group.add(particles);
		});
	}
}

class Fly {
	constructor({ light, bodyColor, wingColor, lightColor }) {
		this.group = new THREE.Group();

		this.bodyColor = bodyColor;
		this.wingColor = wingColor;

		this.vAngle = 0;

		this.drawBody();
		this.drawWings();

		if (light) {
			this.lightColor = lightColor;
			this.drawLight();
		}
	}
	drawBody() {
		const flyGeometry = new THREE.CylinderGeometry(12, 16, 18, 4);
		const flyMaterial = new THREE.MeshStandardMaterial({
			color: this.bodyColor,
			roughness: 1,
			shading: THREE.FlatShading,
		});
		const fly = new THREE.Mesh(flyGeometry, flyMaterial);
		fly.rotation.y = 45 * (Math.PI / 180);
		this.group.add(fly);
	}
	drawWings() {
		this.rightWing = new THREE.Mesh(
			new THREE.BoxGeometry(5, 12, 12),
			new THREE.MeshStandardMaterial({
				color: this.wingColor,
				roughness: 1,
				shading: THREE.FlatShading,
			})
		);
		this.rightWing.position.set(8, 2, 0);
		this.rightWing.rotation.z = Math.PI / 4;
		this.rightWing.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -6, 0));
		this.group.add(this.rightWing);

		this.leftWing = this.rightWing.clone();
		this.leftWing.position.x = -this.rightWing.position.x;
		this.leftWing.rotation.z = -this.rightWing.rotation.z;
		this.group.add(this.leftWing);
	}
	drawLight() {
		const geometry = new THREE.CylinderGeometry(16, 8, 6, 4);
		const flyLight = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
			color: this.lightColor,
			shading: THREE.FlatShading,
		}));
		flyLight.rotation.y = 45 * (Math.PI / 180);

		const light = new THREE.PointLight(this.lightColor, 2, 400);
		light.add(flyLight);
		light.position.set(0, -12, 0);
		light.castShadow = true;
		this.group.add(light);
	}
	moveWings() {
		this.vAngle += 0.08;
		const wingAmplitude = Math.PI / 8;
		this.rightWing.rotation.z = (Math.PI / 4) - (Math.cos(this.vAngle) * wingAmplitude);
		this.leftWing.rotation.z = -this.rightWing.rotation.z;
	}
}

init();
animate();