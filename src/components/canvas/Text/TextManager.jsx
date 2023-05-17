import { useSpring, animated } from '@react-spring/three'
import { useRef, useLayoutEffect } from 'react'
import { Text, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'

export default function TextManager(props) {
  const { initialTransition } = props
  const { viewport } = useThree()
  const startingXPosition = viewport.width / 2
  const { groupPosition } = useSpring({ groupPosition: initialTransition ? [-3, 0, 0] : [startingXPosition, 0, 0] })

  const gltf = useGLTF('./models/housejoined.glb')
  console.log(gltf)
  return (
    <animated.group position={groupPosition}>
      <primitive object={gltf.scene}></primitive>
      <group position={[0, 2, -4]}>
        {/* startingXposition is 1.(z position) + .2 */}
        <TextLine initialTransition={initialTransition} startingXPosition={startingXPosition * (4 * 0.6)}></TextLine>
      </group>
      <group position={[0, -2, -2]}>
        <TextLine initialTransition={initialTransition} startingXPosition={startingXPosition * (2 * 0.8)}></TextLine>
      </group>
      <group position={[0, 0, 0]}>
        <TextLine initialTransition={initialTransition} startingXPosition={startingXPosition}></TextLine>
      </group>
    </animated.group>
  )
}

function TextLine({ initialTransition, startingXPosition }) {
  const lineRef = useRef()

  useFrame((state, delta) => {
    if (initialTransition) {
      lineRef.current.position.x -= delta * 2
      if (lineRef.current.position.x < -startingXPosition - lineRef.current.children[0].geometry.boundingBox.max.x) {
        lineRef.current.position.x = startingXPosition + lineRef.current.children[0].geometry.boundingBox.max.x
      }
    }
  })

  useLayoutEffect(() => {
    lineRef.current.children[0].geometry.computeBoundingBox()
    lineRef.current.position.x = startingXPosition + lineRef.current.children[0].geometry.boundingBox.max.x
  }, [])

  //return textshader here
  //hard part will be aligning timing of uniformTime 0-4 to match speed of moving text

  return (
    <group ref={lineRef}>
      <Text>Ipsum Lorem</Text>
    </group>
  )
}
