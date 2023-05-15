import { useSpring, animated } from '@react-spring/three'
import { useRef } from 'react'
import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function TextManager(props) {
  const { initialTransition } = props
  const startingXPosition = 8
  const { groupPosition } = useSpring({ groupPosition: initialTransition ? [4, 0, 0] : [startingXPosition, 0, 0] })

  return (
    <animated.group position={groupPosition}>
      <group position={[0, 2, -4]}>
        <TextLine initialTransition={initialTransition} startingXPosition={startingXPosition}></TextLine>
      </group>
      <group position={[0, -2, -2]}>
        <TextLine initialTransition={initialTransition} startingXPosition={startingXPosition}></TextLine>
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
      lineRef.current.position.x -= delta
      if (lineRef.current.position.x < -8) {
        lineRef.current.position.x = startingXPosition
      }
    }
  })

  return (
    <group ref={lineRef}>
      <Text>Ipsum Lorem</Text>
    </group>
  )
}
