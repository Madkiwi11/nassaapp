let clock = new THREE.Clock();

const imgLoc = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/";
let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000),
    light = new THREE.PointLight(0xFFFFFF, 2, 5000);
camera.position.set(1300, 0, 0);
let scene = new THREE.Scene();

camera.lookAt(scene.position);
light.position.set(2000, 2000, 1500);
scene.add(light);

let marsMaterial = new THREE.MeshPhongMaterial({
    color: 0x00008B,
    specular: 0xFFFFFF,
    shininess: 1
}), marsMesh;

function createMarsMesh() {
    const size = window.innerWidth < 540 ? 200 : 500;
    let marsGeo = new THREE.SphereGeometry(size, 32, 32);
    marsMesh = new THREE.Mesh(marsGeo, marsMaterial);
    scene.add(marsMesh);
}

createMarsMesh();

let loader = new THREE.TextureLoader();
marsMaterial.map = loader.load(imgLoc + 'mars-map.jpg');
marsMaterial.bumpMap = loader.load(imgLoc + 'mars-bump.jpg');
marsMaterial.bumpScale = 0.4;

scene.background = null;

let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth - 40, window.innerHeight - 40);

document.getElementById('planet-container').appendChild(renderer.domElement);

let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', render);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}

function render() {
    var delta = clock.getDelta();
    if (marsMesh) {
        marsMesh.rotation.y += 0.1 * delta;
    }
    renderer.clear();
    renderer.render(scene, camera);
}

animate();

let planetContainer = document.getElementById('planet-container');

planetContainer.addEventListener('mousedown', function () {
    planetContainer.style.cursor = "-moz-grabbing";
    planetContainer.style.cursor = "-webkit-grabbing";
    planetContainer.style.cursor = "grabbing";
});

planetContainer.addEventListener('mouseup', function () {
    planetContainer.style.cursor = "-moz-grab";
    planetContainer.style.cursor = "-webkit-grab";
    planetContainer.style.cursor = "grab";
});

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth - 40, window.innerHeight - 40);
    scene.remove(marsMesh);
    createMarsMesh();
}

document.getElementById('translate-btn').addEventListener('click', function () {
    const elementsToTranslate = document.querySelectorAll('.translatable');
    elementsToTranslate.forEach(element => {
        const currentLang = element.innerText.trim() === element.getAttribute('data-en').trim() ? 'ar' : 'en';
        element.innerText = element.getAttribute(`data-${currentLang}`);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section'); 

    const checkVisibility = () => {
        const triggerBottom = window.innerHeight * 0.8;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < triggerBottom) {
                section.classList.add('section-visible');
            } else {
                section.classList.remove('section-visible');
            }
        });
    };
    
    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); 
});

// script.js
const mobileMenu = document.getElementById("mobile-menu");
const navList = document.querySelector(".nav-list");

if (mobileMenu) {
    mobileMenu.addEventListener("click", () => {
        navList.classList.toggle("show");
    });
}

function showText() {
    const translatableElements = document.querySelectorAll('.translatable');
    translatableElements.forEach(element => {
        element.style.opacity = 1;
    });
}

setTimeout(showText, 1000);
