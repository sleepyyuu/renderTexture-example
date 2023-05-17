import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, Html, Environment, Cloud, OrthographicCamera } from '@react-three/drei'
import { useState } from 'react'
import TextManager from './Text/TextManager'

export default function Scene({ children, ...props }) {
  const [initialTransition, setInitialTransition] = useState(false)

  //start by just creating text that scrolls from right to left then experiment with text shaders + motion

  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props}>
      {/* <directionalLight intensity={0.1} /> */}
      <ambientLight intensity={0.6} />
      <ambientLight intensity={0.15} />
      {children}
      <Preload all />
      <Environment preset={'night'}></Environment>
      <color attach='background' args={['#18181b']} />
      {initialTransition ? null : (
        <Html>
          <div
            style={{ color: 'black', border: '2px black solid', width: '100px', cursor: 'pointer' }}
            onClick={() => {
              setInitialTransition(true)
            }}>
            Click to enter
          </div>
        </Html>
      )}
      <TextManager initialTransition={initialTransition}></TextManager>
      <OrbitControls />
    </Canvas>
  )
}
