import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager()

// loadingManager.onStart = () =>
// {
//     console.log('onStart')
// }

// loadingManager.onLoaded = () =>
// {
//     console.log('onLoaded')
// }

// loadingManager.onProgress = () =>
// {
//     console.log('onProgress')
// }

// loadingManager.onError = () =>
// {
//     console.log('onError')
// }

const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('/textures/floor.jpg')

colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter
colorTexture.wrapS = colorTexture.wrapT = THREE.RepeatWrapping
colorTexture.repeat.set( 10, 2 )

const video1 = document.getElementById( 'video1' );
const videoTexture1 = new THREE.VideoTexture( video1 );
videoTexture1.minFilter = THREE.LinearFilter;
videoTexture1.magFilter = THREE.LinearFilter;

const video2 = document.getElementById( 'video2' );
const videoTexture2 = new THREE.VideoTexture( video2 );
videoTexture2.minFilter = THREE.LinearFilter;
videoTexture2.magFilter = THREE.LinearFilter;

const video3 = document.getElementById( 'video3' );
const videoTexture3 = new THREE.VideoTexture( video3 );
videoTexture3.minFilter = THREE.LinearFilter;
videoTexture3.magFilter = THREE.LinearFilter;

const video4 = document.getElementById( 'video4' );
const videoTexture4 = new THREE.VideoTexture( video4 );
videoTexture4.minFilter = THREE.LinearFilter;
videoTexture4.magFilter = THREE.LinearFilter;

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
// create quarter cylinder
const geometry = new THREE.CylinderGeometry(5, 5, 3, 50, 1, true, 0, Math.PI / 2)
const material1 = new THREE.MeshBasicMaterial({ map: videoTexture1, side: THREE.DoubleSide}) // red
const material2 = new THREE.MeshBasicMaterial({ map: videoTexture2, side: THREE.DoubleSide}) // green
const material3 = new THREE.MeshBasicMaterial({ map: videoTexture3, side: THREE.DoubleSide}) // blue
const material4 = new THREE.MeshBasicMaterial({ map: videoTexture4, side: THREE.DoubleSide}) // yellow
const mesh1 = new THREE.Mesh(geometry, material1)
const mesh2 = new THREE.Mesh(geometry, material2)
const mesh3 = new THREE.Mesh(geometry, material3)
const mesh4 = new THREE.Mesh(geometry, material4)
scene.add(mesh1)
scene.add(mesh2)
scene.add(mesh3)
scene.add(mesh4)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 1
camera.position.z = 10
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// Max rotation top
// controls.minPolarAngle = Math.PI / 4
// Max rotation bottom
// controls.maxPolarAngle = Math.PI / 2

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setClearColor(0x380568, 1)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // rotate mesh
    mesh1.rotation.y = elapsedTime * 0.1
    mesh2.rotation.y = elapsedTime * 0.1 + Math.PI / 2
    mesh3.rotation.y = elapsedTime * 0.1 + Math.PI
    mesh4.rotation.y = elapsedTime * 0.1 + Math.PI * 3 / 2

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()