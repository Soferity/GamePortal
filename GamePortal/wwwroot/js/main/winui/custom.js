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

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
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
        //loader.load('img/particle.svg', (texture) => {
        loader.load('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSI+CjxnIGlkPSJzdXJmYWNlMSI+CjxwYXRoIHN0eWxlPSIgc3Ryb2tlOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDpyZ2IoODEuMTc2NDcxJSw4Mi4zNTI5NDElLDgxLjE3NjQ3MSUpO2ZpbGwtb3BhY2l0eToxOyIgZD0iTSAxNi41OTc2NTYgNS4yODEyNSBDIDE2LjM4MjgxMiA1Ljg1OTM3NSAxNS42MTcxODggNS44NTkzNzUgMTUuNDAyMzQ0IDUuMjgxMjUgTCAxNC40MTc5NjkgMi42NDQ1MzEgQyAxMy45ODgyODEgMS41IDE0LjY0NDUzMSAwLjE1NjI1IDE1Ljc4NTE1NiAwLjAxMTcxODggQyAxNS44NTU0NjkgMC4wMDM5MDYyNSAxNS45Mjk2ODggMCAxNiAwIEMgMTYuMDc0MjE5IDAgMTYuMTQ0NTMxIDAuMDAzOTA2MjUgMTYuMjE0ODQ0IDAuMDExNzE4OCBDIDE3LjM1NTQ2OSAwLjE1NjI1IDE4LjAxMTcxOSAxLjUgMTcuNTgyMDMxIDIuNjQ0NTMxIFogTSAxNi41OTc2NTYgNS4yODEyNSAiLz4KPHBhdGggc3R5bGU9IiBzdHJva2U6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztmaWxsOnJnYig0Mi4zNTI5NDElLDYzLjEzNzI1NSUsOTEuMzcyNTQ5JSk7ZmlsbC1vcGFjaXR5OjE7IiBkPSJNIDE5LjgxMjUgMTIuMTU2MjUgQyAxNy4yNjk1MzEgMTIuNjgzNTk0IDE0LjczMDQ2OSAxMi42ODM1OTQgMTIuMTg3NSAxMi4xNTYyNSBDIDguMzk0NTMxIDEzLjY3MTg3NSA1LjcxMDkzOCAxNy4zNzg5MDYgNS43MTA5MzggMjEuNzEwOTM4IEMgNS43MTA5MzggMjcuMzk0NTMxIDEwLjMxNjQwNiAzMiAxNiAzMiBDIDIxLjY4MzU5NCAzMiAyNi4yODkwNjIgMjcuMzk0NTMxIDI2LjI4OTA2MiAyMS43MTA5MzggQyAyNi4yODkwNjIgMTcuMzc4OTA2IDIzLjYwNTQ2OSAxMy42NzE4NzUgMTkuODEyNSAxMi4xNTYyNSAiLz4KPHBhdGggc3R5bGU9IiBzdHJva2U6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztmaWxsOnJnYigzMC45ODAzOTIlLDUyLjE1Njg2MyUsNzQuOTAxOTYxJSk7ZmlsbC1vcGFjaXR5OjE7IiBkPSJNIDEwLjU0Mjk2OSAxNi40Mzc1IEMgMTAuMzkwNjI1IDE2LjQzNzUgMTAuMjM4MjgxIDE2LjM3ODkwNiAxMC4xMjUgMTYuMjU3ODEyIEMgOS45MTAxNTYgMTYuMDI3MzQ0IDkuOTIxODc1IDE1LjY2Nzk2OSAxMC4xNDg0MzggMTUuNDQ5MjE5IEMgMTAuNzY1NjI1IDE0Ljg3NSAxMS40NTcwMzEgMTQuMzk0NTMxIDEyLjIwNzAzMSAxNC4wMjM0MzggQyAxMi40OTIxODggMTMuODc4OTA2IDEyLjgzNTkzOCAxMy45OTYwOTQgMTIuOTcyNjU2IDE0LjI4MTI1IEMgMTMuMTEzMjgxIDE0LjU2MjUgMTIuOTk2MDk0IDE0LjkwNjI1IDEyLjcxNDg0NCAxNS4wNDY4NzUgQyAxMi4wNjY0MDYgMTUuMzY3MTg4IDExLjQ2NDg0NCAxNS43ODUxNTYgMTAuOTMzNTk0IDE2LjI4NTE1NiBDIDEwLjgyNDIxOSAxNi4zODY3MTkgMTAuNjgzNTk0IDE2LjQzNzUgMTAuNTQyOTY5IDE2LjQzNzUgIi8+CjxwYXRoIHN0eWxlPSIgc3Ryb2tlOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDpyZ2IoMzAuOTgwMzkyJSw1Mi4xNTY4NjMlLDc0LjkwMTk2MSUpO2ZpbGwtb3BhY2l0eToxOyIgZD0iTSAxMS40MjU3ODEgMTIuNTY2NDA2IEMgMTQuNDc2NTYyIDEzLjMyODEyNSAxNy41MjM0MzggMTMuMzI4MTI1IDIwLjU3NDIxOSAxMi41NjY0MDYgTCAyMC41NzQyMTkgOS4xMzY3MTkgTCAxMS40MjU3ODEgOS4xMzY3MTkgWiBNIDExLjQyNTc4MSAxMi41NjY0MDYgIi8+CjxwYXRoIHN0eWxlPSIgc3Ryb2tlOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDpyZ2IoNDIuMzUyOTQxJSw2My4xMzcyNTUlLDkxLjM3MjU0OSUpO2ZpbGwtb3BhY2l0eToxOyIgZD0iTSAxMi41NzAzMTIgOS4xMzY3MTkgTCAxOS40Mjk2ODggOS4xMzY3MTkgTCAxOS40Mjk2ODggNy40MjE4NzUgTCAxMi41NzAzMTIgNy40MjE4NzUgWiBNIDEyLjU3MDMxMiA5LjEzNjcxOSAiLz4KPHBhdGggc3R5bGU9IiBzdHJva2U6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztmaWxsOnJnYig4OS40MTE3NjUlLDg5LjgwMzkyMiUsOTAuMTk2MDc4JSk7ZmlsbC1vcGFjaXR5OjE7IiBkPSJNIDE0Ljg1NTQ2OSA3LjQyMTg3NSBMIDE3LjE0NDUzMSA3LjQyMTg3NSBMIDE3LjE0NDUzMSA1LjEzNjcxOSBMIDE0Ljg1NTQ2OSA1LjEzNjcxOSBaIE0gMTQuODU1NDY5IDcuNDIxODc1ICIvPgo8cGF0aCBzdHlsZT0iIHN0cm9rZTpub25lO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6cmdiKDMwLjk4MDM5MiUsNTIuMTU2ODYzJSw3NC45MDE5NjElKTtmaWxsLW9wYWNpdHk6MTsiIGQ9Ik0gMTYgMjcuNDI1NzgxIEMgMTUuNjgzNTk0IDI3LjQyNTc4MSAxNS40Mjk2ODggMjcuMTcxODc1IDE1LjQyOTY4OCAyNi44NTU0NjkgTCAxNS40Mjk2ODggMjIuMjg1MTU2IEMgMTUuNDI5Njg4IDIxLjk2ODc1IDE1LjY4MzU5NCAyMS43MTA5MzggMTYgMjEuNzEwOTM4IEMgMTYuMzE2NDA2IDIxLjcxMDkzOCAxNi41NzAzMTIgMjEuOTY4NzUgMTYuNTcwMzEyIDIyLjI4NTE1NiBMIDE2LjU3MDMxMiAyNi44NTU0NjkgQyAxNi41NzAzMTIgMjcuMTcxODc1IDE2LjMxNjQwNiAyNy40MjU3ODEgMTYgMjcuNDI1NzgxICIvPgo8cGF0aCBzdHlsZT0iIHN0cm9rZTpub25lO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6cmdiKDMwLjk4MDM5MiUsNTIuMTU2ODYzJSw3NC45MDE5NjElKTtmaWxsLW9wYWNpdHk6MTsiIGQ9Ik0gMTcuMTQ0NTMxIDI4LjU3MDMxMiBDIDE2Ljk5NjA5NCAyOC41NzAzMTIgMTYuODUxNTYyIDI4LjUxNTYyNSAxNi43MzgyODEgMjguNDAyMzQ0IEwgMTYgMjcuNjY0MDYyIEwgMTUuMjYxNzE5IDI4LjQwMjM0NCBDIDE1LjAzOTA2MiAyOC42MjUgMTQuNjc1NzgxIDI4LjYyNSAxNC40NTMxMjUgMjguNDAyMzQ0IEMgMTQuMjMwNDY5IDI4LjE3OTY4OCAxNC4yMzA0NjkgMjcuODIwMzEyIDE0LjQ1MzEyNSAyNy41OTM3NSBMIDE1LjU5NzY1NiAyNi40NTMxMjUgQyAxNS44MjAzMTIgMjYuMjI2NTYyIDE2LjE3OTY4OCAyNi4yMjY1NjIgMTYuNDAyMzQ0IDI2LjQ1MzEyNSBMIDE3LjU0Njg3NSAyNy41OTM3NSBDIDE3Ljc2OTUzMSAyNy44MjAzMTIgMTcuNzY5NTMxIDI4LjE3OTY4OCAxNy41NDY4NzUgMjguNDAyMzQ0IEMgMTcuNDM3NSAyOC41MTU2MjUgMTcuMjg5MDYyIDI4LjU3MDMxMiAxNy4xNDQ1MzEgMjguNTcwMzEyICIvPgo8cGF0aCBzdHlsZT0iIHN0cm9rZTpub25lO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6cmdiKDMwLjk4MDM5MiUsNTIuMTU2ODYzJSw3NC45MDE5NjElKTtmaWxsLW9wYWNpdHk6MTsiIGQ9Ik0gMTYgMjIuODU1NDY5IEMgMTUuNjgzNTk0IDIyLjg1NTQ2OSAxNS40Mjk2ODggMjIuNTk3NjU2IDE1LjQyOTY4OCAyMi4yODUxNTYgTCAxNS40Mjk2ODggMTcuNzEwOTM4IEMgMTUuNDI5Njg4IDE3LjM5NDUzMSAxNS42ODM1OTQgMTcuMTQwNjI1IDE2IDE3LjE0MDYyNSBDIDE2LjMxNjQwNiAxNy4xNDA2MjUgMTYuNTcwMzEyIDE3LjM5NDUzMSAxNi41NzAzMTIgMTcuNzEwOTM4IEwgMTYuNTcwMzEyIDIyLjI4NTE1NiBDIDE2LjU3MDMxMiAyMi41OTc2NTYgMTYuMzE2NDA2IDIyLjg1NTQ2OSAxNiAyMi44NTU0NjkgIi8+CjxwYXRoIHN0eWxlPSIgc3Ryb2tlOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDpyZ2IoMzAuOTgwMzkyJSw1Mi4xNTY4NjMlLDc0LjkwMTk2MSUpO2ZpbGwtb3BhY2l0eToxOyIgZD0iTSAxNiAxOC4yODEyNSBDIDE1Ljg1NTQ2OSAxOC4yODEyNSAxNS43MDcwMzEgMTguMjI2NTYyIDE1LjU5NzY1NiAxOC4xMTMyODEgTCAxNC40NTMxMjUgMTYuOTcyNjU2IEMgMTQuMjMwNDY5IDE2Ljc1IDE0LjIzMDQ2OSAxNi4zODY3MTkgMTQuNDUzMTI1IDE2LjE2NDA2MiBDIDE0LjY3NTc4MSAxNS45NDE0MDYgMTUuMDM5MDYyIDE1Ljk0MTQwNiAxNS4yNjE3MTkgMTYuMTY0MDYyIEwgMTYgMTYuOTAyMzQ0IEwgMTYuNzM4MjgxIDE2LjE2NDA2MiBDIDE2Ljk2MDkzOCAxNS45NDE0MDYgMTcuMzI0MjE5IDE1Ljk0MTQwNiAxNy41NDY4NzUgMTYuMTY0MDYyIEMgMTcuNzY5NTMxIDE2LjM4NjcxOSAxNy43Njk1MzEgMTYuNzUgMTcuNTQ2ODc1IDE2Ljk3MjY1NiBMIDE2LjQwMjM0NCAxOC4xMTMyODEgQyAxNi4yOTI5NjkgMTguMjI2NTYyIDE2LjE0NDUzMSAxOC4yODEyNSAxNiAxOC4yODEyNSAiLz4KPHBhdGggc3R5bGU9IiBzdHJva2U6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztmaWxsOnJnYigzMC45ODAzOTIlLDUyLjE1Njg2MyUsNzQuOTAxOTYxJSk7ZmlsbC1vcGFjaXR5OjE7IiBkPSJNIDE2IDIyLjg1NTQ2OSBMIDExLjQyNTc4MSAyMi44NTU0NjkgQyAxMS4xMTMyODEgMjIuODU1NDY5IDEwLjg1NTQ2OSAyMi41OTc2NTYgMTAuODU1NDY5IDIyLjI4NTE1NiBDIDEwLjg1NTQ2OSAyMS45Njg3NSAxMS4xMTMyODEgMjEuNzEwOTM4IDExLjQyNTc4MSAyMS43MTA5MzggTCAxNiAyMS43MTA5MzggQyAxNi4zMTY0MDYgMjEuNzEwOTM4IDE2LjU3MDMxMiAyMS45Njg3NSAxNi41NzAzMTIgMjIuMjg1MTU2IEMgMTYuNTcwMzEyIDIyLjU5NzY1NiAxNi4zMTY0MDYgMjIuODU1NDY5IDE2IDIyLjg1NTQ2OSAiLz4KPHBhdGggc3R5bGU9IiBzdHJva2U6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztmaWxsOnJnYigzMC45ODAzOTIlLDUyLjE1Njg2MyUsNzQuOTAxOTYxJSk7ZmlsbC1vcGFjaXR5OjE7IiBkPSJNIDEwLjI4NTE1NiAyNCBDIDEwLjEzNjcxOSAyNCA5Ljk5MjE4OCAyMy45NDE0MDYgOS44Nzg5MDYgMjMuODMyMDMxIEMgOS42NTYyNSAyMy42MDU0NjkgOS42NTYyNSAyMy4yNDYwOTQgOS44Nzg5MDYgMjMuMDIzNDM4IEwgMTAuNjIxMDk0IDIyLjI4NTE1NiBMIDkuODc4OTA2IDIxLjU0Mjk2OSBDIDkuNjU2MjUgMjEuMzIwMzEyIDkuNjU2MjUgMjAuOTYwOTM4IDkuODc4OTA2IDIwLjczNDM3NSBDIDEwLjEwNTQ2OSAyMC41MTE3MTkgMTAuNDY0ODQ0IDIwLjUxMTcxOSAxMC42ODc1IDIwLjczNDM3NSBMIDExLjgzMjAzMSAyMS44Nzg5MDYgQyAxMi4wNTQ2ODggMjIuMTAxNTYyIDEyLjA1NDY4OCAyMi40NjQ4NDQgMTEuODMyMDMxIDIyLjY4NzUgTCAxMC42ODc1IDIzLjgzMjAzMSBDIDEwLjU3ODEyNSAyMy45NDE0MDYgMTAuNDI5Njg4IDI0IDEwLjI4NTE1NiAyNCAiLz4KPHBhdGggc3R5bGU9IiBzdHJva2U6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztmaWxsOnJnYigzMC45ODAzOTIlLDUyLjE1Njg2MyUsNzQuOTAxOTYxJSk7ZmlsbC1vcGFjaXR5OjE7IiBkPSJNIDIwLjU3NDIxOSAyMi44NTU0NjkgTCAxNiAyMi44NTU0NjkgQyAxNS42ODM1OTQgMjIuODU1NDY5IDE1LjQyOTY4OCAyMi41OTc2NTYgMTUuNDI5Njg4IDIyLjI4NTE1NiBDIDE1LjQyOTY4OCAyMS45Njg3NSAxNS42ODM1OTQgMjEuNzEwOTM4IDE2IDIxLjcxMDkzOCBMIDIwLjU3NDIxOSAyMS43MTA5MzggQyAyMC44ODY3MTkgMjEuNzEwOTM4IDIxLjE0NDUzMSAyMS45Njg3NSAyMS4xNDQ1MzEgMjIuMjg1MTU2IEMgMjEuMTQ0NTMxIDIyLjU5NzY1NiAyMC44ODY3MTkgMjIuODU1NDY5IDIwLjU3NDIxOSAyMi44NTU0NjkgIi8+CjxwYXRoIHN0eWxlPSIgc3Ryb2tlOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDpyZ2IoMzAuOTgwMzkyJSw1Mi4xNTY4NjMlLDc0LjkwMTk2MSUpO2ZpbGwtb3BhY2l0eToxOyIgZD0iTSAyMS43MTQ4NDQgMjQgQyAyMS41NzAzMTIgMjQgMjEuNDIxODc1IDIzLjk0MTQwNiAyMS4zMTI1IDIzLjgzMjAzMSBMIDIwLjE2Nzk2OSAyMi42ODc1IEMgMTkuOTQ1MzEyIDIyLjQ2NDg0NCAxOS45NDUzMTIgMjIuMTAxNTYyIDIwLjE2Nzk2OSAyMS44Nzg5MDYgTCAyMS4zMTI1IDIwLjczNDM3NSBDIDIxLjUzNTE1NiAyMC41MTE3MTkgMjEuODk0NTMxIDIwLjUxMTcxOSAyMi4xMjEwOTQgMjAuNzM0Mzc1IEMgMjIuMzQzNzUgMjAuOTYwOTM4IDIyLjM0Mzc1IDIxLjMyMDMxMiAyMi4xMjEwOTQgMjEuNTQyOTY5IEwgMjEuMzc4OTA2IDIyLjI4NTE1NiBMIDIyLjEyMTA5NCAyMy4wMjM0MzggQyAyMi4zNDM3NSAyMy4yNDYwOTQgMjIuMzQzNzUgMjMuNjA1NDY5IDIyLjEyMTA5NCAyMy44MzIwMzEgQyAyMi4wMDc4MTIgMjMuOTQxNDA2IDIxLjg2MzI4MSAyNCAyMS43MTQ4NDQgMjQgIi8+CjxwYXRoIHN0eWxlPSIgc3Ryb2tlOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDpyZ2IoMzAuOTgwMzkyJSw1Mi4xNTY4NjMlLDc0LjkwMTk2MSUpO2ZpbGwtb3BhY2l0eToxOyIgZD0iTSAxNiAyMi44NTU0NjkgQyAxNS44NTU0NjkgMjIuODU1NDY5IDE1LjcwNzAzMSAyMi44MDA3ODEgMTUuNTk3NjU2IDIyLjY4NzUgTCAxMS4wMjM0MzggMTguMTEzMjgxIEMgMTAuODAwNzgxIDE3Ljg5MDYyNSAxMC44MDA3ODEgMTcuNTMxMjUgMTEuMDIzNDM4IDE3LjMwODU5NCBDIDExLjI0NjA5NCAxNy4wODIwMzEgMTEuNjA5Mzc1IDE3LjA4MjAzMSAxMS44MzIwMzEgMTcuMzA4NTk0IEwgMTYuNDAyMzQ0IDIxLjg3ODkwNiBDIDE2LjYyODkwNiAyMi4xMDE1NjIgMTYuNjI4OTA2IDIyLjQ2NDg0NCAxNi40MDIzNDQgMjIuNjg3NSBDIDE2LjI5Mjk2OSAyMi44MDA3ODEgMTYuMTQ0NTMxIDIyLjg1NTQ2OSAxNiAyMi44NTU0NjkgIi8+CjxwYXRoIHN0eWxlPSIgc3Ryb2tlOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDpyZ2IoMzAuOTgwMzkyJSw1Mi4xNTY4NjMlLDc0LjkwMTk2MSUpO2ZpbGwtb3BhY2l0eToxOyIgZD0iTSAxMy43MTQ4NDQgMjAuNTcwMzEyIEwgMTIgMjAuNTcwMzEyIEMgMTEuNjgzNTk0IDIwLjU3MDMxMiAxMS40MjU3ODEgMjAuMzEyNSAxMS40MjU3ODEgMTkuOTk2MDk0IEMgMTEuNDI1NzgxIDE5LjY4MzU5NCAxMS42ODM1OTQgMTkuNDI1NzgxIDEyIDE5LjQyNTc4MSBMIDEzLjE0MDYyNSAxOS40MjU3ODEgTCAxMy4xNDA2MjUgMTguMjgxMjUgQyAxMy4xNDA2MjUgMTcuOTY4NzUgMTMuMzk4NDM4IDE3LjcxMDkzOCAxMy43MTQ4NDQgMTcuNzEwOTM4IEMgMTQuMDMxMjUgMTcuNzEwOTM4IDE0LjI4NTE1NiAxNy45Njg3NSAxNC4yODUxNTYgMTguMjgxMjUgTCAxNC4yODUxNTYgMTkuOTk2MDk0IEMgMTQuMjg1MTU2IDIwLjMxMjUgMTQuMDMxMjUgMjAuNTcwMzEyIDEzLjcxNDg0NCAyMC41NzAzMTIgIi8+CjxwYXRoIHN0eWxlPSIgc3Ryb2tlOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDpyZ2IoMzAuOTgwMzkyJSw1Mi4xNTY4NjMlLDc0LjkwMTk2MSUpO2ZpbGwtb3BhY2l0eToxOyIgZD0iTSAyMC41NzQyMTkgMjcuNDI1NzgxIEMgMjAuNDI1NzgxIDI3LjQyNTc4MSAyMC4yODEyNSAyNy4zNzEwOTQgMjAuMTY3OTY5IDI3LjI2MTcxOSBMIDE1LjU5NzY1NiAyMi42ODc1IEMgMTUuMzcxMDk0IDIyLjQ2NDg0NCAxNS4zNzEwOTQgMjIuMTAxNTYyIDE1LjU5NzY1NiAyMS44Nzg5MDYgQyAxNS44MjAzMTIgMjEuNjU2MjUgMTYuMTc5Njg4IDIxLjY1NjI1IDE2LjQwMjM0NCAyMS44Nzg5MDYgTCAyMC45NzY1NjIgMjYuNDUzMTI1IEMgMjEuMTk5MjE5IDI2LjY3NTc4MSAyMS4xOTkyMTkgMjcuMDM1MTU2IDIwLjk3NjU2MiAyNy4yNjE3MTkgQyAyMC44NjMyODEgMjcuMzcxMDk0IDIwLjcxODc1IDI3LjQyNTc4MSAyMC41NzQyMTkgMjcuNDI1NzgxICIvPgo8cGF0aCBzdHlsZT0iIHN0cm9rZTpub25lO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6cmdiKDMwLjk4MDM5MiUsNTIuMTU2ODYzJSw3NC45MDE5NjElKTtmaWxsLW9wYWNpdHk6MTsiIGQ9Ik0gMTguMjg1MTU2IDI2Ljg1NTQ2OSBDIDE3Ljk3MjY1NiAyNi44NTU0NjkgMTcuNzE0ODQ0IDI2LjYwMTU2MiAxNy43MTQ4NDQgMjYuMjg1MTU2IEwgMTcuNzE0ODQ0IDI0LjU3MDMxMiBDIDE3LjcxNDg0NCAyNC4yNTM5MDYgMTcuOTcyNjU2IDI0IDE4LjI4NTE1NiAyNCBMIDIwIDI0IEMgMjAuMzE2NDA2IDI0IDIwLjU3NDIxOSAyNC4yNTM5MDYgMjAuNTc0MjE5IDI0LjU3MDMxMiBDIDIwLjU3NDIxOSAyNC44ODY3MTkgMjAuMzE2NDA2IDI1LjE0MDYyNSAyMCAyNS4xNDA2MjUgTCAxOC44NTkzNzUgMjUuMTQwNjI1IEwgMTguODU5Mzc1IDI2LjI4NTE1NiBDIDE4Ljg1OTM3NSAyNi42MDE1NjIgMTguNjAxNTYyIDI2Ljg1NTQ2OSAxOC4yODUxNTYgMjYuODU1NDY5ICIvPgo8cGF0aCBzdHlsZT0iIHN0cm9rZTpub25lO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6cmdiKDMwLjk4MDM5MiUsNTIuMTU2ODYzJSw3NC45MDE5NjElKTtmaWxsLW9wYWNpdHk6MTsiIGQ9Ik0gMTYgMjIuODU1NDY5IEMgMTUuODU1NDY5IDIyLjg1NTQ2OSAxNS43MDcwMzEgMjIuODAwNzgxIDE1LjU5NzY1NiAyMi42ODc1IEMgMTUuMzcxMDk0IDIyLjQ2NDg0NCAxNS4zNzEwOTQgMjIuMTAxNTYyIDE1LjU5NzY1NiAyMS44Nzg5MDYgTCAyMC4xNjc5NjkgMTcuMzA4NTk0IEMgMjAuMzkwNjI1IDE3LjA4MjAzMSAyMC43NTM5MDYgMTcuMDgyMDMxIDIwLjk3NjU2MiAxNy4zMDg1OTQgQyAyMS4xOTkyMTkgMTcuNTMxMjUgMjEuMTk5MjE5IDE3Ljg5MDYyNSAyMC45NzY1NjIgMTguMTEzMjgxIEwgMTYuNDAyMzQ0IDIyLjY4NzUgQyAxNi4yOTI5NjkgMjIuODAwNzgxIDE2LjE0NDUzMSAyMi44NTU0NjkgMTYgMjIuODU1NDY5ICIvPgo8cGF0aCBzdHlsZT0iIHN0cm9rZTpub25lO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6cmdiKDMwLjk4MDM5MiUsNTIuMTU2ODYzJSw3NC45MDE5NjElKTtmaWxsLW9wYWNpdHk6MTsiIGQ9Ik0gMjAgMjAuNTcwMzEyIEwgMTguMjg1MTU2IDIwLjU3MDMxMiBDIDE3Ljk3MjY1NiAyMC41NzAzMTIgMTcuNzE0ODQ0IDIwLjMxMjUgMTcuNzE0ODQ0IDE5Ljk5NjA5NCBMIDE3LjcxNDg0NCAxOC4yODEyNSBDIDE3LjcxNDg0NCAxNy45Njg3NSAxNy45NzI2NTYgMTcuNzEwOTM4IDE4LjI4NTE1NiAxNy43MTA5MzggQyAxOC42MDE1NjIgMTcuNzEwOTM4IDE4Ljg1OTM3NSAxNy45Njg3NSAxOC44NTkzNzUgMTguMjgxMjUgTCAxOC44NTkzNzUgMTkuNDI1NzgxIEwgMjAgMTkuNDI1NzgxIEMgMjAuMzE2NDA2IDE5LjQyNTc4MSAyMC41NzQyMTkgMTkuNjgzNTk0IDIwLjU3NDIxOSAxOS45OTYwOTQgQyAyMC41NzQyMTkgMjAuMzEyNSAyMC4zMTY0MDYgMjAuNTcwMzEyIDIwIDIwLjU3MDMxMiAiLz4KPHBhdGggc3R5bGU9IiBzdHJva2U6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztmaWxsOnJnYigzMC45ODAzOTIlLDUyLjE1Njg2MyUsNzQuOTAxOTYxJSk7ZmlsbC1vcGFjaXR5OjE7IiBkPSJNIDExLjQyNTc4MSAyNy40MjU3ODEgQyAxMS4yODEyNSAyNy40MjU3ODEgMTEuMTM2NzE5IDI3LjM3MTA5NCAxMS4wMjM0MzggMjcuMjYxNzE5IEMgMTAuODAwNzgxIDI3LjAzNTE1NiAxMC44MDA3ODEgMjYuNjc1NzgxIDExLjAyMzQzOCAyNi40NTMxMjUgTCAxNS41OTc2NTYgMjEuODc4OTA2IEMgMTUuODIwMzEyIDIxLjY1NjI1IDE2LjE3OTY4OCAyMS42NTYyNSAxNi40MDIzNDQgMjEuODc4OTA2IEMgMTYuNjI4OTA2IDIyLjEwMTU2MiAxNi42Mjg5MDYgMjIuNDY0ODQ0IDE2LjQwMjM0NCAyMi42ODc1IEwgMTEuODMyMDMxIDI3LjI2MTcxOSBDIDExLjcxODc1IDI3LjM3MTA5NCAxMS41NzQyMTkgMjcuNDI1NzgxIDExLjQyNTc4MSAyNy40MjU3ODEgIi8+CjxwYXRoIHN0eWxlPSIgc3Ryb2tlOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDpyZ2IoMzAuOTgwMzkyJSw1Mi4xNTY4NjMlLDc0LjkwMTk2MSUpO2ZpbGwtb3BhY2l0eToxOyIgZD0iTSAxMy43MTQ4NDQgMjYuODU1NDY5IEMgMTMuMzk4NDM4IDI2Ljg1NTQ2OSAxMy4xNDA2MjUgMjYuNjAxNTYyIDEzLjE0MDYyNSAyNi4yODUxNTYgTCAxMy4xNDA2MjUgMjUuMTQwNjI1IEwgMTIgMjUuMTQwNjI1IEMgMTEuNjgzNTk0IDI1LjE0MDYyNSAxMS40MjU3ODEgMjQuODg2NzE5IDExLjQyNTc4MSAyNC41NzAzMTIgQyAxMS40MjU3ODEgMjQuMjUzOTA2IDExLjY4MzU5NCAyNCAxMiAyNCBMIDEzLjcxNDg0NCAyNCBDIDE0LjAzMTI1IDI0IDE0LjI4NTE1NiAyNC4yNTM5MDYgMTQuMjg1MTU2IDI0LjU3MDMxMiBMIDE0LjI4NTE1NiAyNi4yODUxNTYgQyAxNC4yODUxNTYgMjYuNjAxNTYyIDE0LjAzMTI1IDI2Ljg1NTQ2OSAxMy43MTQ4NDQgMjYuODU1NDY5ICIvPgo8L2c+Cjwvc3ZnPgo=', (texture) => {
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
    constructor({
        light, bodyColor, wingColor, lightColor
    }) {
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