"use client"

import { useRef, useState, useCallback } from "react"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { GLView } from "expo-gl"
import { Renderer, THREE } from "expo-three"
import { Ionicons } from "@expo/vector-icons"
import {
  GestureHandlerRootView,
  PanGestureHandler,
  type PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler"
import { colors, borderRadius, spacing } from "@/constants/theme"
import type { DeviceInfo } from "@/constants/dummy-data"

interface Device3DViewerProps {
  device: DeviceInfo
}

export function Device3DViewer({ device }: Device3DViewerProps) {
  const rotationRef = useRef({ x: 0.3, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const rendererRef = useRef<Renderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const meshRef = useRef<THREE.Group | null>(null)

  const createPendant = () => {
    const group = new THREE.Group()

    // Chain
    const chainCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.8, 0.8, 0),
      new THREE.Vector3(-0.4, 1.1, 0),
      new THREE.Vector3(0, 1.2, 0),
      new THREE.Vector3(0.4, 1.1, 0),
      new THREE.Vector3(0.8, 0.8, 0),
    ])
    const chainGeom = new THREE.TubeGeometry(chainCurve, 32, 0.02, 8, false)
    const chainMat = new THREE.MeshStandardMaterial({ color: 0xa1a1aa, metalness: 0.8, roughness: 0.2 })
    const chain = new THREE.Mesh(chainGeom, chainMat)
    group.add(chain)

    // Bail (loop)
    const bailGeom = new THREE.TorusGeometry(0.08, 0.02, 8, 16)
    const bail = new THREE.Mesh(bailGeom, chainMat)
    bail.position.set(0, 0.5, 0)
    group.add(bail)

    // Pendant body
    const pendantGeom = new THREE.CylinderGeometry(0.3, 0.28, 0.5, 32)
    const pendantMat = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      metalness: 0.3,
      roughness: 0.7,
    })
    const pendant = new THREE.Mesh(pendantGeom, pendantMat)
    pendant.position.set(0, 0, 0)
    group.add(pendant)

    // Indicator light
    const lightGeom = new THREE.SphereGeometry(0.06, 16, 16)
    const lightMat = new THREE.MeshStandardMaterial({
      color: device.isConnected ? 0x3b82f6 : 0x52525b,
      emissive: device.isConnected ? 0x3b82f6 : 0x000000,
      emissiveIntensity: 0.5,
    })
    const light = new THREE.Mesh(lightGeom, lightMat)
    light.position.set(0, 0.15, 0.26)
    group.add(light)

    return group
  }

  const createPatch = () => {
    const group = new THREE.Group()

    // Outer adhesive ring
    const outerGeom = new THREE.CylinderGeometry(0.6, 0.6, 0.05, 32)
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      roughness: 0.9,
    })
    const outer = new THREE.Mesh(outerGeom, outerMat)
    outer.rotation.x = Math.PI / 2
    group.add(outer)

    // Inner tech area
    const innerGeom = new THREE.CylinderGeometry(0.4, 0.4, 0.08, 32)
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      metalness: 0.2,
      roughness: 0.6,
    })
    const inner = new THREE.Mesh(innerGeom, innerMat)
    inner.rotation.x = Math.PI / 2
    inner.position.z = 0.02
    group.add(inner)

    // Sensors
    const sensorGeom = new THREE.SphereGeometry(0.08, 16, 16)
    const sensorMat = new THREE.MeshStandardMaterial({
      color: device.isConnected ? 0x10b981 : 0x52525b,
      emissive: device.isConnected ? 0x10b981 : 0x000000,
      emissiveIntensity: 0.4,
    })

    const sensor1 = new THREE.Mesh(sensorGeom, sensorMat)
    sensor1.position.set(-0.15, 0, 0.08)
    group.add(sensor1)

    const sensor2 = new THREE.Mesh(sensorGeom, sensorMat)
    sensor2.position.set(0.15, 0, 0.08)
    group.add(sensor2)

    // Center indicator
    const centerGeom = new THREE.SphereGeometry(0.1, 16, 16)
    const centerMat = new THREE.MeshStandardMaterial({
      color: device.isConnected ? 0x3b82f6 : 0x52525b,
      emissive: device.isConnected ? 0x3b82f6 : 0x000000,
      emissiveIntensity: 0.5,
    })
    const center = new THREE.Mesh(centerGeom, centerMat)
    center.position.set(0, 0, 0.1)
    group.add(center)

    return group
  }

  const createBand = () => {
    const group = new THREE.Group()

    // Left strap
    const strapGeom = new THREE.BoxGeometry(0.6, 0.3, 0.08)
    const strapMat = new THREE.MeshStandardMaterial({
      color: 0x3f3f46,
      roughness: 0.8,
    })

    const leftStrap = new THREE.Mesh(strapGeom, strapMat)
    leftStrap.position.set(-0.7, 0, 0)
    group.add(leftStrap)

    // Right strap
    const rightStrap = new THREE.Mesh(strapGeom, strapMat)
    rightStrap.position.set(0.7, 0, 0)
    group.add(rightStrap)

    // Main body
    const bodyGeom = new THREE.BoxGeometry(0.5, 0.35, 0.12)
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      metalness: 0.3,
      roughness: 0.5,
    })
    const body = new THREE.Mesh(bodyGeom, bodyMat)
    group.add(body)

    // Screen
    const screenGeom = new THREE.BoxGeometry(0.4, 0.25, 0.02)
    const screenMat = new THREE.MeshStandardMaterial({
      color: device.isConnected ? 0x0f172a : 0x18181b,
      emissive: device.isConnected ? 0x1e40af : 0x000000,
      emissiveIntensity: 0.3,
    })
    const screen = new THREE.Mesh(screenGeom, screenMat)
    screen.position.z = 0.07
    group.add(screen)

    return group
  }

  const onContextCreate = async (gl: WebGLRenderingContext) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl

    const renderer = new Renderer({ gl })
    renderer.setSize(width, height)
    renderer.setClearColor(colors.card, 1)
    rendererRef.current = renderer

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
    camera.position.z = 3

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(2, 2, 2)
    scene.add(directionalLight)

    const backLight = new THREE.DirectionalLight(0xffffff, 0.3)
    backLight.position.set(-2, -2, -2)
    scene.add(backLight)

    // Create device mesh based on type
    let mesh: THREE.Group
    switch (device.type) {
      case "pendant":
        mesh = createPendant()
        break
      case "patch":
        mesh = createPatch()
        break
      case "band":
        mesh = createBand()
        break
      default:
        mesh = createPendant()
    }

    scene.add(mesh)
    meshRef.current = mesh

    const animate = () => {
      requestAnimationFrame(animate)

      if (meshRef.current) {
        if (!isDragging) {
          rotationRef.current.y += 0.005
        }
        meshRef.current.rotation.x = rotationRef.current.x
        meshRef.current.rotation.y = rotationRef.current.y
      }

      renderer.render(scene, camera)
      gl.endFrameEXP()
    }

    animate()
  }

  const onGestureEvent = useCallback((event: PanGestureHandlerGestureEvent) => {
    const { translationX, translationY } = event.nativeEvent
    rotationRef.current.y += translationX * 0.01
    rotationRef.current.x += translationY * 0.01
    rotationRef.current.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotationRef.current.x))
  }, [])

  const resetRotation = () => {
    rotationRef.current = { x: 0.3, y: 0 }
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onBegan={() => setIsDragging(true)}
        onEnded={() => setIsDragging(false)}
      >
        <View style={styles.glContainer}>
          <GLView style={styles.gl} onContextCreate={onContextCreate} />
        </View>
      </PanGestureHandler>

      <View style={styles.controls}>
        <Text style={styles.hint}>{isDragging ? "Release to stop" : "Drag to rotate"}</Text>
        <TouchableOpacity onPress={resetRotation} style={styles.resetButton}>
          <Ionicons name="refresh" size={14} color={colors.textMuted} />
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  glContainer: {
    height: 200,
    borderRadius: borderRadius.md,
    overflow: "hidden",
  },
  gl: {
    flex: 1,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.lg,
    marginTop: spacing.sm,
  },
  hint: {
    fontSize: 12,
    color: colors.textMuted,
  },
  resetButton: {
    padding: spacing.xs,
    borderRadius: borderRadius.sm,
  },
})
