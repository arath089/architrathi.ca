"use client";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";

/* ===== shaders (arctic, subtle) ===== */
const VERT = /* glsl */ `
precision highp float;
attribute float aSeed;

uniform float uTime;
uniform float uSizeNear, uSizeFar;
uniform float uNoiseScale, uNoiseStrength, uPulseAmp, uPulsePeriod, uTimeFactor;
uniform float uBaseScale;                 // NEW: widen the cloud on desktop

varying float vDepth;

/* simplex + curl (Ashima) */
vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x - floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx, x2=x0-i2+C.yyy, x3=x0-D.yyy; i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx; vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z), y_=floor(j-7.0*x_); vec4 x=x_*ns.x+ns.yyyy, y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy), b1=vec4(x.zw,y.zw); vec4 s0=floor(b0)*2.0+1.0, s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy, a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x), p1=vec3(a0.zw,h.y), p2=vec3(a1.xy,h.z), p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3))); p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(vec3(x0),vec3(x0)),dot(vec3(x1),vec3(x1)),dot(vec3(x2),vec3(x2)),dot(vec3(x3),vec3(x3))),0.0); m*=m;
  return 42.0*dot(m*m, vec4(dot(p0,vec3(x0)),dot(p1,vec3(x1)),dot(p2,vec3(x2)),dot(p3,vec3(x3))));
}
vec3 curl(vec3 p){
  float e=0.15; float n1=snoise(p+vec3( e,0.0,0.0)), n2=snoise(p+vec3(-e,0.0,0.0));
  float n3=snoise(p+vec3(0.0, e,0.0)), n4=snoise(p+vec3(0.0,-e,0.0));
  float n5=snoise(p+vec3(0.0,0.0, e)), n6=snoise(p+vec3(0.0,0.0,-e));
  vec3 g=vec3(n2-n1,n4-n3,n6-n5); return normalize(vec3(g.y,-g.x,g.z));
}

void main(){
  vec3 base = position;

  // widen horizontally a bit; keep depth slightly tighter
  base *= vec3(uBaseScale, uBaseScale, uBaseScale * 0.9);

  float pulse = 1.0 + uPulseAmp*0.5*(1.0 + sin(uTime/uPulsePeriod + aSeed*6.28318));
  vec3 f = curl(base*uNoiseScale + vec3(0.0,0.0,uTime*uTimeFactor));
  vec3 pos = base + f*(uNoiseStrength * pulse);

  vec4 mv = modelViewMatrix * vec4(pos,1.0);
  gl_Position = projectionMatrix * mv;

  float dist = -mv.z;
  float sizePx = mix(uSizeNear, uSizeFar, clamp(dist/8.0,0.0,1.0));
  float k = 10.0;
  gl_PointSize = sizePx * (k / max(dist,1.0));
  vDepth = clamp(dist/8.0,0.0,1.0);
}
`;

const FRAG = /* glsl */ `
precision highp float;
varying float vDepth;
uniform vec3 uColorNear, uColorFar;
uniform float uIntensity;

void main(){
  vec2 p = gl_PointCoord - 0.5;
  float r2 = dot(p,p);
  float mask = smoothstep(0.25, 0.0, r2);
  if (mask <= 0.001) discard;

  vec3 col = mix(uColorFar, uColorNear, 1.0 - vDepth);
  col *= mask * uIntensity;
  gl_FragColor = vec4(col, 1.0);
}
`;

/* ===== points field ===== */
function FieldPoints(props: {
  count: number;
  sizeNear: number;
  sizeFar: number;
  noiseScale: number;
  noiseStrength: number;
  timeFactor: number;
  pulseAmp: number;
  pulsePeriod: number;
  baseScale: number; // NEW
  colorNear: string;
  colorFar: string;
  intensity: number;
  seed: number;
}) {
  const {
    count,
    sizeNear,
    sizeFar,
    noiseScale,
    noiseStrength,
    timeFactor,
    pulseAmp,
    pulsePeriod,
    baseScale, // NEW
    colorNear,
    colorFar,
    intensity,
    seed,
  } = props;

  const matRef = useRef<THREE.ShaderMaterial>(null!);

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    let t = seed >>> 0;
    const rnd = () => {
      t += 0x6d2b79f5;
      let r = Math.imul(t ^ (t >>> 15), 1 | t);
      r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
    for (let i = 0; i < count; i++) {
      const u = rnd(),
        v = rnd();
      const theta = 2.0 * Math.PI * u;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(rnd()); // denser toward center
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi) * 0.6;
      pos.set([x, y, z], i * 3);
      seeds[i] = rnd();
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    return g;
  }, [count, seed]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSizeNear: { value: sizeNear },
      uSizeFar: { value: sizeFar },
      uNoiseScale: { value: noiseScale },
      uNoiseStrength: { value: noiseStrength },
      uPulseAmp: { value: pulseAmp },
      uPulsePeriod: { value: pulsePeriod },
      uTimeFactor: { value: timeFactor },
      uBaseScale: { value: baseScale }, // NEW
      uColorNear: { value: new THREE.Color(colorNear) },
      uColorFar: { value: new THREE.Color(colorFar) },
      uIntensity: { value: intensity },
    }),
    [
      sizeNear,
      sizeFar,
      noiseScale,
      noiseStrength,
      pulseAmp,
      pulsePeriod,
      timeFactor,
      baseScale,
      colorNear,
      colorFar,
      intensity,
    ]
  );

  useFrame(({ clock }) => {
    matRef.current.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <points geometry={geom} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        vertexShader={VERT}
        fragmentShader={FRAG}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
      />
    </points>
  );
}

/* ===== public backdrop ===== */
export default function ParticleBackdrop({
  className = "fixed inset-0 pointer-events-none -z-10",
  particleCountDesktop = 60000,
  particleCountMobile = 20000,
  seed = 1337,
  colorNear = "#BAF1FF",
  colorFar = "#3EA6B8",
  intensity = 0.5,
  sizeNear = 1.5,
  sizeFar = 0.5,
  noiseScale = 0.8,
  noiseStrength = 0.55,
  timeFactor = 0.04,
  pulseAmp = 0.3,
  pulsePeriod = 11.0,
  // NEW: per-breakpoint spread controls
  baseScaleDesktop = 1.5, // wider cloud on desktop
  baseScaleMobile = 1.2, // slight spread on mobile
}: {
  className?: string;
  particleCountDesktop?: number;
  particleCountMobile?: number;
  seed?: number;
  colorNear?: string;
  colorFar?: string;
  intensity?: number;
  sizeNear?: number;
  sizeFar?: number;
  noiseScale?: number;
  noiseStrength?: number;
  timeFactor?: number;
  pulseAmp?: number;
  pulsePeriod?: number;
  baseScaleDesktop?: number;
  baseScaleMobile?: number; // NEW
}) {
  const [count, setCount] = useState(particleCountDesktop);
  const [isMobile, setIsMobile] = useState(false);

  // responsive counts + flags
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const apply = () => {
      setIsMobile(mql.matches);
      setCount(mql.matches ? particleCountMobile : particleCountDesktop);
    };
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, [particleCountDesktop, particleCountMobile]);

  // gentle auto-throttle (keep your existing logic)
  useEffect(() => {
    let frames = 0,
      acc = 0,
      last = performance.now(),
      raf = 0;
    const tick = () => {
      const now = performance.now();
      acc += now - last;
      frames++;
      last = now;
      if (frames === 60) {
        const avg = acc / frames;
        if (avg > 22 && count > 20000) setCount(Math.floor(count * 0.85));
        if (
          avg < 14 &&
          count < (isMobile ? particleCountMobile : particleCountDesktop)
        ) {
          setCount(
            Math.min(
              isMobile ? particleCountMobile : particleCountDesktop,
              Math.floor(count * 1.1)
            )
          );
        }
        frames = 0;
        acc = 0;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [count, isMobile, particleCountDesktop, particleCountMobile]);

  // === tiny motion bump & wider spread (desktop), a bit more motion on mobile ===
  const effBaseScale = isMobile ? baseScaleMobile : baseScaleDesktop;
  const effTimeFactor = isMobile ? timeFactor * 1.18 : timeFactor * 1.07; // +18% mobile, +7% desktop
  const effNoiseStr = isMobile ? noiseStrength * 1.1 : noiseStrength * 1.05; // +10% mobile, +5% desktop

  return (
    <div className={className} aria-hidden>
      <Canvas
        camera={{ fov: 45, near: 0.1, far: 100, position: [0, 0, 5] }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.setPixelRatio(Math.min(window.devicePixelRatio ?? 1, 1.5));
        }}
      >
        <FieldPoints
          count={count}
          sizeNear={sizeNear}
          sizeFar={sizeFar}
          noiseScale={noiseScale}
          noiseStrength={effNoiseStr}
          timeFactor={effTimeFactor}
          pulseAmp={pulseAmp}
          pulsePeriod={pulsePeriod}
          baseScale={effBaseScale} // NEW
          colorNear={colorNear}
          colorFar={colorFar}
          intensity={intensity}
          seed={seed}
        />
      </Canvas>
    </div>
  );
}
