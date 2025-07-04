document.addEventListener('DOMContentLoaded', () => {
    // Initialize the simulation
    initSolarSystem();
    
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 500);
    }, 2000);
});

function initSolarSystem() {
    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e17);
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000
    );
    camera.position.set(0, 30, 100);
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    
    // Add orbit controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 30;
    controls.maxDistance = 300;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    
    const sunLight = new THREE.PointLight(0xffffff, 2, 300);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);
    
    // Create stars
    function createStars() {
        const starsGeometry = new THREE.BufferGeometry();
        const starsMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.15,
            transparent: true
        });
        
        const starsVertices = [];
        for (let i = 0; i < 8000; i++) {
            starsVertices.push(
                (Math.random() - 0.5) * 2000,
                (Math.random() - 0.5) * 2000,
                (Math.random() - 0.5) * 2000
            );
        }
        
        starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
        const stars = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(stars);
    }
    createStars();
    
    // Planet data with detailed information
    const planetsData = [
        { 
            name: 'Sun', 
            radius: 10, 
            distance: 0, 
            color: 0xffff00, 
            speed: 0,
            emissive: 0xffff00,
            emissiveIntensity: 1,
            info: {
                radius: "696,340 km",
                mass: "1.989 × 10³⁰ kg",
                gravity: "274 m/s²",
                distance: "Center of system",
                orbit: "N/A",
                rotation: "27 days",
                facts: "The Sun contains 99.86% of the mass in the Solar System. Its core reaches temperatures of 15 million °C, where nuclear fusion occurs."
            }
        },
        { 
            name: 'Mercury', 
            radius: 1.5, 
            distance: 20, 
            color: 0xa9a9a9, 
            speed: 0.02,
            info: {
                radius: "2,440 km",
                mass: "3.301 × 10²³ kg",
                gravity: "3.7 m/s²",
                distance: "57.9 million km",
                orbit: "88 days",
                rotation: "59 days",
                facts: "Mercury has the shortest year of all planets. Its surface temperature varies from -173°C to 427°C due to lack of atmosphere."
            }
        },
        { 
            name: 'Venus', 
            radius: 2.5, 
            distance: 30, 
            color: 0xffa500, 
            speed: 0.015,
            info: {
                radius: "6,052 km",
                mass: "4.867 × 10²⁴ kg",
                gravity: "8.87 m/s²",
                distance: "108.2 million km",
                orbit: "225 days",
                rotation: "243 days (retrograde)",
                facts: "Venus rotates backwards and has the longest rotation period. Its thick atmosphere causes a runaway greenhouse effect with surface temperatures of 462°C."
            }
        },
        { 
            name: 'Earth', 
            radius: 2.7, 
            distance: 40, 
            color: 0x1E90FF, 
            speed: 0.01,
            info: {
                radius: "6,371 km",
                mass: "5.972 × 10²⁴ kg",
                gravity: "9.807 m/s²",
                distance: "149.6 million km",
                orbit: "365.25 days",
                rotation: "23h 56m",
                facts: "Earth is the only known planet with liquid water on its surface and life. Its atmosphere is 78% nitrogen and 21% oxygen."
            }
        },
        { 
            name: 'Mars', 
            radius: 2.2, 
            distance: 50, 
            color: 0xff4500, 
            speed: 0.008,
            info: {
                radius: "3,390 km",
                mass: "6.39 × 10²³ kg",
                gravity: "3.71 m/s²",
                distance: "227.9 million km",
                orbit: "687 days",
                rotation: "24h 37m",
                facts: "Mars has the largest volcano (Olympus Mons) and canyon (Valles Marineris) in the Solar System. Its red color comes from iron oxide (rust) on its surface."
            }
        },
        { 
            name: 'Jupiter', 
            radius: 6, 
            distance: 70, 
            color: 0xffd700, 
            speed: 0.005,
            info: {
                radius: "69,911 km",
                mass: "1.898 × 10²⁷ kg",
                gravity: "24.79 m/s²",
                distance: "778.5 million km",
                orbit: "12 years",
                rotation: "9h 56m",
                facts: "Jupiter is the largest planet with a mass 2.5 times that of all other planets combined. Its Great Red Spot is a storm larger than Earth that has raged for centuries."
            }
        },
        { 
            name: 'Saturn', 
            radius: 5, 
            distance: 90, 
            color: 0xf4a460, 
            speed: 0.003,
            info: {
                radius: "58,232 km",
                mass: "5.683 × 10²⁶ kg",
                gravity: "10.44 m/s²",
                distance: "1.4 billion km",
                orbit: "29 years",
                rotation: "10h 34m",
                facts: "Saturn's rings are made of ice and rock particles. It's the least dense planet—it would float in water if you could find a large enough ocean!"
            }
        },
        { 
            name: 'Uranus', 
            radius: 4, 
            distance: 110, 
            color: 0xadd8e6, 
            speed: 0.002,
            info: {
                radius: "25,362 km",
                mass: "8.681 × 10²⁵ kg",
                gravity: "8.69 m/s²",
                distance: "2.9 billion km",
                orbit: "84 years",
                rotation: "17h 14m (retrograde)",
                facts: "Uranus rotates on its side (98° tilt) likely due to a collision. It's the coldest planet with minimum temperature of -224°C and has 13 faint rings."
            }
        },
        { 
            name: 'Neptune', 
            radius: 3.8, 
            distance: 130, 
            color: 0x0000ff, 
            speed: 0.001,
            info: {
                radius: "24,622 km",
                mass: "1.024 × 10²⁶ kg",
                gravity: "11.15 m/s²",
                distance: "4.5 billion km",
                orbit: "165 years",
                rotation: "16h 6m",
                facts: "Neptune has the strongest winds in the Solar System (2,100 km/h). It was the first planet predicted by mathematics before being observed in 1846."
            }
        }
    ];
    
    // Create planets
    const planets = [];
    const planetMeshes = [];
    const originalSpeeds = [];
    
    planetsData.forEach((planet, index) => {
        const geometry = new THREE.SphereGeometry(planet.radius, 64, 64);
        const material = new THREE.MeshPhongMaterial({ 
            color: planet.color,
            emissive: planet.emissive || 0x000000,
            emissiveIntensity: planet.emissiveIntensity || 0,
            shininess: 10
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(planet.distance, 0, 0);
        
        if (index === 0) {
            // Make sun glow
            const sunGlow = new THREE.PointLight(0xffff00, 1, 200);
            scene.add(sunGlow);
        }
        
        scene.add(mesh);
        
        planets.push({
            mesh,
            speed: planet.speed,
            distance: planet.distance,
            angle: Math.random() * Math.PI * 2,
            rotationSpeed: Math.random() * 0.02 + 0.01,
            info: planet.info,
            color: planet.color
        });
        
        planetMeshes.push(mesh);
        originalSpeeds.push(planet.speed);
        
        // Create orbit path
        if (index > 0) {
            const orbitGeometry = new THREE.BufferGeometry();
            const orbitMaterial = new THREE.LineBasicMaterial({ 
                color: 0xffffff, 
                transparent: true, 
                opacity: 0.2 
            });
            
            const points = [];
            for (let i = 0; i <= 128; i++) {
                const theta = (i / 128) * Math.PI * 2;
                points.push(
                    Math.cos(theta) * planet.distance,
                    0,
                    Math.sin(theta) * planet.distance
                );
            }
            
            orbitGeometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
            const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
            scene.add(orbit);
        }
    });
    
    // Animation state
    let paused = false;
    const clock = new THREE.Clock();
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        if (!paused) {
            const delta = clock.getDelta();
            
            planets.forEach((planet, index) => {
                if (index > 0) {
                    // Orbit animation
                    planet.angle += planet.speed * delta;
                    planet.mesh.position.x = Math.cos(planet.angle) * planet.distance;
                    planet.mesh.position.z = Math.sin(planet.angle) * planet.distance;
                    
                    // Rotation animation
                    planet.mesh.rotation.y += planet.rotationSpeed * delta;
                }
            });
        }
        
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Create control panel UI
    const planetControlsContainer = document.getElementById('planet-controls');
    
    planetsData.forEach((planet, index) => {
        if (index === 0) return; // Skip sun
        
        const controlDiv = document.createElement('div');
        controlDiv.className = 'planet-card';
        
        controlDiv.innerHTML = `
            <div class="planet-header">
                <div class="planet-icon" style="background-color: ${new THREE.Color(planet.color).getStyle()}"></div>
                <div class="planet-name">${planet.name}</div>
            </div>
            <div class="speed-control">
                <div class="slider-container">
                    <input type="range" min="0" max="200" value="${planet.speed * 1000}">
                </div>
                <div class="speed-value">${planet.speed.toFixed(3)}</div>
            </div>
        `;
        
        const slider = controlDiv.querySelector('input');
        const speedValue = controlDiv.querySelector('.speed-value');
        
        slider.addEventListener('input', () => {
            const speed = parseInt(slider.value) / 1000;
            planets[index].speed = speed;
            speedValue.textContent = speed.toFixed(3);
        });
        
        planetControlsContainer.appendChild(controlDiv);
    });
    
    // UI Controls
    const pauseBtn = document.getElementById('pause-btn');
    const resetBtn = document.getElementById('reset-btn');
    const planetInfo = document.getElementById('planet-info');
    const closeBtn = planetInfo.querySelector('.close-btn');
    
    pauseBtn.addEventListener('click', () => {
        paused = !paused;
        pauseBtn.innerHTML = paused ? '<span class="btn-icon">▶️</span> Resume' : '<span class="btn-icon">⏸️</span> Pause';
    });
    
    resetBtn.addEventListener('click', () => {
        planets.forEach((planet, index) => {
            if (index > 0) {
                planet.speed = originalSpeeds[index];
                const slider = planetControlsContainer.children[index - 1].querySelector('input');
                slider.value = originalSpeeds[index] * 1000;
                const speedValue = planetControlsContainer.children[index - 1].querySelector('.speed-value');
                speedValue.textContent = originalSpeeds[index].toFixed(3);
            }
        });
    });
    
    closeBtn.addEventListener('click', () => {
        planetInfo.classList.remove('visible');
    });
    
    // Planet click handler
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    function onClick(event) {
    // Calculate mouse position in normalized device coordinates
    console.log("Click detected at:", mouse.x, mouse.y);
    console.log("Intersected objects:", intersects);
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Update the raycaster
    raycaster.setFromCamera(mouse, camera);
    
    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(planetMeshes);
    
    if (intersects.length > 0) {
        const planetIndex = planetMeshes.indexOf(intersects[0].object);
        const planet = planets[planetIndex];
        
        // Update planet info panel
        planetInfo.querySelector('.planet-name').textContent = planetsData[planetIndex].name;
        planetInfo.querySelector('.planet-icon').style.backgroundColor = new THREE.Color(planet.color).getStyle();
        
        // Update info values
        document.getElementById('radius-value').textContent = planet.info.radius;
        document.getElementById('mass-value').textContent = planet.info.mass;
        document.getElementById('gravity-value').textContent = planet.info.gravity;
        document.getElementById('distance-value').textContent = planet.info.distance;
        document.getElementById('orbit-value').textContent = planet.info.orbit;
        document.getElementById('rotation-value').textContent = planet.info.rotation;
        document.getElementById('facts-value').textContent = planet.info.facts;
        
        // Show panel
        planetInfo.classList.add('visible');
    }
}
}