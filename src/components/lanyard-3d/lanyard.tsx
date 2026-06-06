"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  type RapierRigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import styles from "./lanyard.module.css";

extend({ MeshLineGeometry, MeshLineMaterial });

type Vector3Tuple = [number, number, number];
type LanyardBody = RapierRigidBody & { lerped?: THREE.Vector3 };
type BodyRef = React.RefObject<LanyardBody>;
type MeshLineMesh = THREE.Mesh & {
  geometry: THREE.BufferGeometry & {
    setPoints(points: THREE.Vector3[]): void;
  };
};
type LanyardGLTF = {
  nodes: {
    card: THREE.Mesh;
    clip: THREE.Mesh;
    clamp: THREE.Mesh;
  };
  materials: {
    base: THREE.MeshStandardMaterial;
    metal: THREE.Material;
  };
};

type LanyardProps = {
  position?: Vector3Tuple;
  gravity?: Vector3Tuple;
  fov?: number;
  transparent?: boolean;
};

const cardModelUrl = "/assets/lanyard/card.glb";
const lanyardTextureUrl = "/assets/lanyard/lanyard.png";
const badgeCardTextureUrl = "/assets/badge-card.png";
const hookTopAnchor: Vector3Tuple = [0, 2.04, 0];
const themeOrange = "#ff9f43";
const themeOrangeDark = "#c96a10";

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cameraPosition = isMobile ? [0, 0, 21] satisfies Vector3Tuple : position;
  const cameraFov = isMobile ? 19 : fov;

  return (
    <div className={styles.wrapper}>
      <Canvas
        camera={{ position: cameraPosition, fov: cameraFov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) =>
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
        }
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function createRoundedRectShape(width: number, height: number, radius: number) {
  const x = -width / 2;
  const y = -height / 2;
  const r = Math.min(radius, width / 2, height / 2);
  const shape = new THREE.Shape();

  shape.moveTo(x + r, y);
  shape.lineTo(x + width - r, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + r);
  shape.lineTo(x + width, y + height - r);
  shape.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  shape.lineTo(x + r, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);

  return shape;
}

function RoundedRectMesh({
  width,
  height,
  radius,
  position,
  flipX = false,
  children,
}: {
  width: number;
  height: number;
  radius: number;
  position: Vector3Tuple;
  flipX?: boolean;
  children: React.ReactNode;
}) {
  const geometry = useMemo(() => {
    const roundedGeometry = new THREE.ShapeGeometry(
      createRoundedRectShape(width, height, radius),
      24,
    );
    const positionAttribute = roundedGeometry.attributes.position;
    const uvs: number[] = [];

    for (let index = 0; index < positionAttribute.count; index += 1) {
      const u = positionAttribute.getX(index) / width + 0.5;
      uvs.push(flipX ? 1 - u : u, positionAttribute.getY(index) / height + 0.5);
    }

    roundedGeometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    return roundedGeometry;
  }, [flipX, height, radius, width]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <mesh position={position} rotation={[0, 0, Math.PI]} geometry={geometry}>
      {children}
    </mesh>
  );
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
}: {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
}) {
  const band = useRef<MeshLineMesh | null>(null);
  const fixed = useRef<LanyardBody>(null!);
  const j1 = useRef<LanyardBody>(null!);
  const j2 = useRef<LanyardBody>(null!);
  const j3 = useRef<LanyardBody>(null!);
  const card = useRef<LanyardBody>(null!);
  const vec = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const { nodes, materials } = useGLTF(cardModelUrl) as unknown as LanyardGLTF;
  const loadedTexture = useTexture(lanyardTextureUrl);
  const loadedBadgeTexture = useTexture(badgeCardTextureUrl);
  const texture = useMemo(() => {
    const clonedTexture = loadedTexture.clone();
    clonedTexture.wrapS = THREE.RepeatWrapping;
    clonedTexture.wrapT = THREE.RepeatWrapping;
    clonedTexture.needsUpdate = true;
    return clonedTexture;
  }, [loadedTexture]);
  const badgeTexture = useMemo(() => {
    const clonedTexture = loadedBadgeTexture.clone();
    clonedTexture.colorSpace = THREE.SRGBColorSpace;
    clonedTexture.flipY = false;
    clonedTexture.anisotropy = 16;
    clonedTexture.needsUpdate = true;
    return clonedTexture;
  }, [loadedBadgeTexture]);
  const [curve] = useState(
    () => {
      const nextCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]);
      nextCurve.curveType = "chordal";
      return nextCurve;
    },
  );
  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  const segmentProps = {
    type: "dynamic" as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: 4,
    linearDamping: 4,
  };

  useRopeJoint(fixed as BodyRef, j1 as BodyRef, [
    [0, 0, 0],
    [0, 0, 0],
    0.28,
  ]);
  useRopeJoint(j1 as BodyRef, j2 as BodyRef, [
    [0, 0, 0],
    [0, 0, 0],
    0.28,
  ]);
  useRopeJoint(j2 as BodyRef, j3 as BodyRef, [
    [0, 0, 0],
    [0, 0, 0],
    0.28,
  ]);
  useSphericalJoint(j3 as BodyRef, card as BodyRef, [
    [0, 0, 0],
    hookTopAnchor,
  ]);

  useEffect(() => {
    if (!hovered) return;
    document.body.style.cursor = dragged ? "grabbing" : "grab";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (!fixed.current || !j1.current || !j2.current || !j3.current || !card.current) {
      return;
    }

    [j1, j2].forEach((ref) => {
      if (!ref.current.lerped) {
        ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
      }
      const clampedDistance = Math.max(
        0.1,
        Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())),
      );
      ref.current.lerped.lerp(
        ref.current.translation(),
        delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
      );
    });

    const j1Lerped = j1.current.lerped;
    const j2Lerped = j2.current.lerped;
    if (!j1Lerped || !j2Lerped) return;

    curve.points[0].copy(j3.current.translation());
    curve.points[1].copy(j2Lerped);
    curve.points[2].copy(j1Lerped);
    curve.points[3].copy(fixed.current.translation());
    band.current?.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));

    ang.copy(card.current.angvel());
    rot.copy(card.current.rotation());
    card.current.setAngvel(
      {
        x: ang.x,
        y: ang.y - rot.y * 0.25,
        z: ang.z,
      },
      true,
    );
  });

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.14, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0.28, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0.42, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[1, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.925}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(event) => {
              const target = event.target as Element | null;
              target?.releasePointerCapture(event.pointerId);
              drag(false);
            }}
            onPointerDown={(event) => {
              if (!card.current) return;
              const target = event.target as Element | null;
              target?.setPointerCapture(event.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(event.point)
                  .sub(vec.copy(card.current.translation())),
              );
            }}
          >
            <mesh geometry={nodes.card.geometry} visible={false} />
            <RoundedRectMesh
              width={1.03}
              height={1.575}
              radius={0.09}
              position={[0, 0.16, 0.021]}
              flipX
            >
              <meshBasicMaterial
                map={badgeTexture}
                toneMapped={false}
                side={THREE.DoubleSide}
              />
            </RoundedRectMesh>
            <mesh position={[0, 0.84, 0.027]} rotation={[0, 0, Math.PI]}>
              <circleGeometry args={[0.0304, 32]} />
              <meshBasicMaterial
                color={themeOrangeDark}
                toneMapped={false}
                side={THREE.DoubleSide}
              />
            </mesh>
            <group position={[0, -0.12, 0]}>
              <mesh geometry={nodes.clip.geometry}>
                <meshStandardMaterial color={themeOrange} roughness={0.3} metalness={0.35} />
              </mesh>
              <mesh geometry={nodes.clamp.geometry}>
                <meshStandardMaterial color={themeOrangeDark} roughness={0.32} metalness={0.4} />
              </mesh>
            </group>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={isMobile ? 0.56 : 1}
        />
      </mesh>
    </>
  );
}

useGLTF.preload(cardModelUrl);
