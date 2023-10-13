import * as dat from 'dat.gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const renderer = new THREE.WebGL1Renderer()
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
	45,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
)

const orbit = new OrbitControls(camera, renderer.domElement)

const axesHelper = new THREE.AxesHelper(5)
const gridHelper = new THREE.GridHelper(30)
scene.add(axesHelper, gridHelper)

camera.position.set(-10, 30, 30)
orbit.update()

const boxGeometry = new THREE.BoxGeometry()
const boxMaterial = new THREE.MeshBasicMaterial({ color: '#00F090' })
const box = new THREE.Mesh(boxGeometry, boxMaterial)
scene.add(box)

const planeGeometry = new THREE.PlaneGeometry(30, 30)
const planeMaterial = new THREE.MeshBasicMaterial({
	color: '#ffffff',
	side: THREE.DoubleSide,
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(plane)

plane.rotation.x = -0.5 * Math.PI

const sphereGeometry = new THREE.SphereGeometry(3, 50)
const sphereMaterial = new THREE.MeshBasicMaterial({
	color: '#8000FF',
	wireframe: false,
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere)

sphere.position.set(-10, 10, 0)

const gui = new dat.GUI()
const options = {
	sphereColor: '#8000FF',
	wireframe: false,
	speed: 0.01,
}
gui.addColor(options, 'sphereColor').onChange(e => sphere.material.color.set(e))
gui.add(options, 'wireframe').onChange(e => (sphere.material.wireframe = e))
gui.add(options, 'speed', 0, 0.1)

let step = 0

function rotate(time) {
	box.rotation.x = time / 1000
	box.rotation.y = time / 1000

	step += options.speed
	sphere.position.y = 10 * Math.abs(Math.sin(step))

	renderer.render(scene, camera)
}

renderer.setAnimationLoop(rotate)
