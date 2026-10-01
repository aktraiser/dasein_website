"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The Dasein architecture as a 1-bit diorama. Each layer has its own shape
 * (databases, vector cloud, model, agents + approval gate, enterprise systems,
 * infrastructure base) and one request plays the site's running example:
 * logs are ingested, similar incidents retrieved, the model finds the cause,
 * an agent prepares the fix, waits at the human-approval gate, then acts on the
 * target system and the run is audited.
 *
 * Rendering: three.js scene → render target → Bayer dithering pass. Anything
 * with a green emissive is dithered in the accent colour, the rest in ink/paper.
 * Three.js is loaded lazily. The model can be rotated by dragging.
 */

type Three = typeof import("three");
type Mesh = InstanceType<Three["Mesh"]>;
type Lambert = InstanceType<Three["MeshLambertMaterial"]>;
type Vec3 = InstanceType<Three["Vector3"]>;

const LAYERS = 6;
const GAP = 1.08;
const SIZE = 3.2;
const INK = [14 / 255, 15 / 255, 17 / 255];
const PAPER = [241 / 255, 240 / 255, 234 / 255];
const ACCENT = [198 / 255, 242 / 255, 94 / 255];

/** Stage durations (s): data, knowledge, intelligence, agent, approval, act, audit, rest. */
const STAGES = [1.6, 1.8, 1.8, 1.3, 1.8, 1.5, 1.2, 0.9];
/** Which layer each stage belongs to (for the status bar). */
const STAGE_LAYER = [0, 1, 2, 3, 3, 4, 5, 5];
const ASSEMBLY = 1.6;

const DITHER_FRAG = `
uniform sampler2D tScene;
uniform vec3 uInk;
uniform vec3 uLight;
uniform vec3 uAccent;
varying vec2 vUv;
float bayer2(vec2 a) { a = floor(a); return fract(dot(a, vec2(0.5, a.y * 0.75))); }
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
float bayer8(vec2 a) { return bayer4(0.5 * a) * 0.25 + bayer2(a); }
void main() {
  vec4 s = texture2D(tScene, vUv);
  if (s.a < 0.5) discard;
  float b = bayer8(gl_FragCoord.xy);
  float chroma = s.g - max(s.r, s.b);
  if (chroma > 0.12) {
    float k = clamp(0.35 + chroma * 1.2, 0.0, 1.0);
    gl_FragColor = vec4(k > b ? uAccent : uInk, 1.0);
    return;
  }
  float l = pow(dot(s.rgb, vec3(0.299, 0.587, 0.114)), 0.8);
  gl_FragColor = vec4(l > b ? uLight : uInk, 1.0);
}
`;

const DITHER_VERT = `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

export function DitherStack({
  layers,
  steps,
  hint,
  className = "",
}: {
  layers: string[];
  steps: string[];
  hint: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const canvasHost = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(4);

  useEffect(() => {
    const container = ref.current;
    const host = canvasHost.current;
    if (!container || !host) return;
    let disposed = false;
    let cleanup = () => {};

    import("three").then((THREE) => {
      if (disposed) return;
      let renderer: InstanceType<Three["WebGLRenderer"]>;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
      } catch {
        return;
      }
      renderer.setPixelRatio(1);
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.className = "dither";
      host.appendChild(renderer.domElement);

      const SCALE = 2;
      const rand = rng(21);
      const target = new THREE.WebGLRenderTarget(1, 1);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
      camera.position.set(8.2, 6.6, 9.6);
      camera.lookAt(0, -0.2, 0);
      scene.add(new THREE.AmbientLight(0xffffff, 0.6));
      const sun = new THREE.DirectionalLight(0xffffff, 2.3);
      sun.position.set(-3, 7, 4);
      scene.add(sun);

      const root = new THREE.Group();
      scene.add(root);

      // --- helpers ------------------------------------------------------
      const glowables: { mat: Lambert; glow: number; base: number }[] = [];
      const lambert = (color: number, glowable = false) => {
        const mat = new THREE.MeshLambertMaterial({ color, emissive: 0x000000 });
        const handle = { mat, glow: 0, base: 0 };
        if (glowable) glowables.push(handle);
        return { mat, handle };
      };
      const box = (w: number, h: number, d: number, color = 0x8c8c8c) => {
        const { mat } = lambert(color);
        return new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      };
      const setGlow = (mat: Lambert, k: number) => mat.emissive.setRGB(0, k * 0.9, 0);

      const baseY = (l: number) => ((LAYERS - 1) / 2 - l) * GAP;
      const layerGroups = Array.from({ length: LAYERS }, (_, l) => {
        const g = new THREE.Group();
        g.position.y = baseY(l);
        const size = l === LAYERS - 1 ? SIZE * 1.2 : SIZE;
        // Light slabs dither to near-paper, so the objects on them stay readable.
        const slab = box(size, 0.05, size, 0xf2f2f2);
        g.add(slab);
        root.add(g);
        return g;
      });

      // Rack columns holding the whole stack.
      const columns = new THREE.Group();
      for (const x of [-1, 1]) {
        for (const z of [-1, 1]) {
          const c = box(0.05, GAP * (LAYERS - 1) + 0.2, 0.05, 0x3a3a3a);
          c.position.set(x * (SIZE / 2 - 0.03), 0, z * (SIZE / 2 - 0.03));
          columns.add(c);
        }
      }
      root.add(columns);

      // L1 — Data: databases.
      const cylGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.4, 18);
      let source!: { mesh: Mesh; handle: { mat: Lambert; glow: number } };
      for (const x of [-0.9, 0, 0.9]) {
        for (const z of [-0.9, 0, 0.9]) {
          const { mat, handle } = lambert(0x9a9a9a, true);
          const cyl = new THREE.Mesh(cylGeo, mat);
          cyl.position.set(x, 0.23, z);
          layerGroups[0].add(cyl);
          if (x === 0.9 && z === -0.9) source = { mesh: cyl, handle };
        }
      }

      // L2 — Knowledge: rotating vector cloud, top-k lights up.
      const cloud = new THREE.Group();
      cloud.position.y = 0.38;
      layerGroups[1].add(cloud);
      const dotGeo = new THREE.BoxGeometry(0.07, 0.07, 0.07);
      const shared = lambert(0x5a5a5a).mat;
      const topK: { mat: Lambert; glow: number }[] = [];
      for (let i = 0; i < 110; i++) {
        const a = rand() * Math.PI * 2;
        const r = Math.sqrt(rand()) * 1.25;
        const hot = i < 8;
        const { mat, handle } = hot ? lambert(0x5a5a5a, true) : { mat: shared, handle: null };
        const dot = new THREE.Mesh(dotGeo, mat);
        dot.position.set(Math.cos(a) * r, (rand() - 0.5) * 0.35, Math.sin(a) * r);
        cloud.add(dot);
        if (handle) topK.push(handle);
      }

      // L3 — Intelligence: the model.
      const model = new THREE.Group();
      model.position.y = 0.62;
      layerGroups[2].add(model);
      const brain = lambert(0xa8a8a8, true);
      const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5, 0), brain.mat);
      model.add(ico);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.025, 6, 48), lambert(0x444444).mat);
      ring.rotation.x = Math.PI / 2.4;
      model.add(ring);

      // L4 — Agent runtime: agents, tools, and the human-approval gate.
      const agents = [
        { pos: [0, 0.2, 0] },
        { pos: [-0.95, 0.2, -0.55] },
        { pos: [0.95, 0.2, -0.6] },
      ].map(({ pos }) => {
        const { mat, handle } = lambert(0x7a7a7a, true);
        const cube = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.28), mat);
        cube.position.set(pos[0], pos[1], pos[2]);
        layerGroups[3].add(cube);
        return { cube, handle };
      });
      const toolPts: number[] = [];
      for (const [x, z] of [
        [-1.3, 0.2],
        [-0.4, -1.25],
        [0.5, -1.3],
        [1.35, 0.1],
      ]) {
        const tool = new THREE.Mesh(new THREE.SphereGeometry(0.08, 10, 8), lambert(0x444444).mat);
        tool.position.set(x, 0.12, z);
        layerGroups[3].add(tool);
        const nearest = agents.reduce((a, b) =>
          Math.hypot(a.cube.position.x - x, a.cube.position.z - z) < Math.hypot(b.cube.position.x - x, b.cube.position.z - z) ? a : b,
        );
        toolPts.push(x, 0.12, z, nearest.cube.position.x, 0.2, nearest.cube.position.z);
      }
      const toolGeo = new THREE.BufferGeometry();
      toolGeo.setAttribute("position", new THREE.Float32BufferAttribute(toolPts, 3));
      layerGroups[3].add(new THREE.LineSegments(toolGeo, new THREE.LineBasicMaterial({ color: 0x222222 })));

      const GATE_Z = 1.15;
      for (const x of [-0.38, 0.38]) {
        const post = box(0.07, 0.62, 0.07, 0x2e2e2e);
        post.position.set(x, 0.31, GATE_Z);
        layerGroups[3].add(post);
      }
      const barPivot = new THREE.Group();
      barPivot.position.set(-0.38, 0.42, GATE_Z);
      layerGroups[3].add(barPivot);
      const bar = box(0.76, 0.07, 0.07, 0x2a2a2a);
      bar.position.x = 0.38;
      barPivot.add(bar);
      const lampHandle = lambert(0x6a6a6a, true);
      const lamp = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.12), lampHandle.mat);
      lamp.position.set(0.38, 0.7, GATE_Z);
      layerGroups[3].add(lamp);

      // L5 — Enterprise: a city of systems; one is the ITSM target.
      let targetBox!: { mesh: Mesh; handle: { mat: Lambert; glow: number }; h: number };
      for (const x of [-1.2, -0.4, 0.4, 1.2]) {
        for (const z of [-0.8, 0, 0.8]) {
          const h = 0.18 + rand() * 0.55;
          const isTarget = x === 0.4 && z === 0.8;
          const { mat, handle } = lambert(0x8e8e8e, isTarget);
          const b = new THREE.Mesh(new THREE.BoxGeometry(0.5, h, 0.5), mat);
          b.position.set(x, h / 2 + 0.03, z);
          layerGroups[4].add(b);
          if (isTarget) targetBox = { mesh: b, handle, h };
        }
      }

      // L6 — Infrastructure: audit ring around the base.
      const auditHandle = lambert(0x3c3c3c, true);
      const audit = new THREE.Mesh(new THREE.TorusGeometry(2.25, 0.035, 6, 72), auditHandle.mat);
      audit.rotation.x = Math.PI / 2;
      audit.position.y = 0.06;
      layerGroups[5].add(audit);
      for (const [x, z] of [
        [-1.4, -1.4],
        [1.4, -1.4],
        [-1.4, 1.4],
        [1.4, 1.4],
      ]) {
        const gw = box(0.3, 0.16, 0.3, 0x6e6e6e);
        gw.position.set(x, 0.11, z);
        layerGroups[5].add(gw);
      }

      // Packet + trail.
      const packetMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const packetGeo = new THREE.BoxGeometry(0.17, 0.17, 0.17);
      const packet = new THREE.Mesh(packetGeo, packetMat);
      root.add(packet);
      const trail = [0.7, 0.5, 0.32].map((s) => {
        const m = new THREE.Mesh(packetGeo, packetMat);
        m.scale.setScalar(s);
        root.add(m);
        return m;
      });
      const history: Vec3[] = [];

      // --- dither pass --------------------------------------------------
      const post = new THREE.Scene();
      const postCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const postMat = new THREE.ShaderMaterial({
        uniforms: {
          tScene: { value: target.texture },
          uInk: { value: new THREE.Vector3(...INK) },
          uLight: { value: new THREE.Vector3(...PAPER) },
          uAccent: { value: new THREE.Vector3(...ACCENT) },
        },
        vertexShader: DITHER_VERT,
        fragmentShader: DITHER_FRAG,
      });
      post.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), postMat));

      // --- the run --------------------------------------------------------
      const tmp = new THREE.Vector3();
      const local = (l: number, x: number, y: number, z: number) =>
        new THREE.Vector3(x, layerGroups[l].position.y + y, z);
      // Waypoints per stage, evaluated each frame (layers move during assembly).
      const path = (s: number): Vec3[] => {
        const src = source.mesh.position;
        switch (s) {
          case 0:
            return [local(0, src.x, 0.5, src.z), local(0, 0, 0.55, 0)];
          case 1:
            return [local(0, 0, 0.55, 0), local(1, 0.3, 0.38, 0.2), local(1, -0.2, 0.38, -0.1), local(1, 0, 0.5, 0)];
          case 2:
            return [local(1, 0, 0.5, 0), local(2, 0, 0.62, 0)];
          case 3:
            return [local(2, 0, 0.62, 0), local(3, 0, 0.5, 0), local(3, 0, 0.3, GATE_Z - 0.35)];
          case 4:
            return [local(3, 0, 0.3, GATE_Z - 0.35)];
          case 5:
            return [
              local(3, 0, 0.3, GATE_Z - 0.35),
              local(3, 0, 0.3, GATE_Z + 0.35),
              local(4, targetBox.mesh.position.x, targetBox.h + 0.35, targetBox.mesh.position.z),
              local(4, targetBox.mesh.position.x, targetBox.h + 0.12, targetBox.mesh.position.z),
            ];
          case 6:
            return [
              local(4, targetBox.mesh.position.x, targetBox.h + 0.12, targetBox.mesh.position.z),
              local(5, targetBox.mesh.position.x, 0.1, targetBox.mesh.position.z),
            ];
          default:
            return [local(5, targetBox.mesh.position.x, 0.1, targetBox.mesh.position.z)];
        }
      };
      const along = (pts: Vec3[], t: number) => {
        if (pts.length === 1) return tmp.copy(pts[0]);
        const f = ease(clamp01(t)) * (pts.length - 1);
        const i = Math.min(pts.length - 2, Math.floor(f));
        return tmp.lerpVectors(pts[i], pts[i + 1], f - i);
      };

      // --- interaction ----------------------------------------------------
      const view = { yaw: -0.6, drag: 0, vel: 0, tilt: 0 };
      let dragging: { x: number } | null = null;
      const onDown = (e: PointerEvent) => {
        dragging = { x: e.clientX };
        container.setPointerCapture(e.pointerId);
        container.dataset.dragging = "true";
      };
      const onMove = (e: PointerEvent) => {
        if (!dragging) return;
        const dx = e.clientX - dragging.x;
        dragging.x = e.clientX;
        view.drag += dx * 0.01;
        view.vel = dx * 0.01;
      };
      const onUp = () => {
        dragging = null;
        delete container.dataset.dragging;
      };
      container.addEventListener("pointerdown", onDown);
      container.addEventListener("pointermove", onMove);
      container.addEventListener("pointerup", onUp);
      container.addEventListener("pointercancel", onUp);

      // --- loop -----------------------------------------------------------
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cycle = STAGES.reduce((a, b) => a + b, 0);
      let elapsed = 0;
      let runTime = 0;
      let assembly = reduce ? 1 : 0;
      let current = -1;

      const stageAt = (t: number) => {
        let acc = 0;
        for (let s = 0; s < STAGES.length; s++) {
          if (t < acc + STAGES[s]) return { s, u: (t - acc) / STAGES[s] };
          acc += STAGES[s];
        }
        return { s: STAGES.length - 1, u: 1 };
      };

      const update = (dt: number) => {
        elapsed += dt;
        // Exploded view → assembled stack.
        if (assembly < 1) assembly = Math.min(1, assembly + dt / ASSEMBLY);
        const a = ease(assembly);
        layerGroups.forEach((g, l) => {
          g.position.y = baseY(l) * (1 + (1 - a) * 1.4) + (1 - a) * (l % 2 ? 0.4 : -0.4);
          g.rotation.y = (1 - a) * (l % 2 ? 0.5 : -0.5);
        });
        columns.scale.y = Math.max(0.001, a);

        // Idle motion.
        cloud.rotation.y += dt * 0.25;
        const s = assembly < 1 ? -1 : stageAt(runTime % cycle);
        const st = s === -1 ? -1 : s.s;
        const u = s === -1 ? 0 : s.u;
        model.rotation.y += dt * (st === 2 ? 2.4 : 0.4);
        ico.rotation.x += dt * (st === 2 ? 1.2 : 0.15);

        if (assembly >= 1) runTime += dt;
        if (st !== current) {
          current = st;
          if (st >= 0) setStage(st);
        }

        // Glows, driven by the stage.
        const decay = Math.exp(-dt * 2.2);
        for (const g of glowables) g.glow *= decay;
        if (st === 0) source.handle.glow = 1;
        if (st === 1) {
          // The 8 nearest vectors light up one after the other.
          topK.forEach((h, i) => {
            if (u > i / 10) h.glow = 1;
          });
        }
        if (st === 2) brain.handle.glow = 0.6 + 0.4 * Math.sin(elapsed * 10);
        if (st === 3 || st === 4) agents[0].handle.glow = 1;
        lampHandle.handle.glow = st === 4 ? (Math.sin(elapsed * 14) > 0 ? 1 : 0) : st === 5 && u < 0.3 ? 1 : lampHandle.handle.glow;
        if (st === 5 && u > 0.6) targetBox.handle.glow = 1;
        if (st === 6) auditHandle.handle.glow = 1 - u * 0.5;
        for (const g of glowables) setGlow(g.mat, g.glow);

        // Approval gate: opens at the end of the approval stage, closes at the next run.
        const open = st === 4 ? clamp01((u - 0.7) / 0.3) : st === 5 || st === 6 ? 1 : st === 7 ? 1 - u : 0;
        barPivot.rotation.z = ease(open) * (Math.PI / 2.2);

        // Target system rises when the action lands; audit ring pulses.
        const lift = st === 5 ? clamp01((u - 0.6) / 0.4) : st === 6 ? 1 - u : 0;
        targetBox.mesh.scale.y = 1 + lift * 0.35;
        targetBox.mesh.position.y = (targetBox.h * targetBox.mesh.scale.y) / 2 + 0.03;
        audit.scale.setScalar(st === 6 ? 1 + Math.sin(u * Math.PI) * 0.08 : 1);

        // Packet.
        const visible = st >= 0 && st < 7;
        packet.visible = visible;
        if (visible) {
          const p = along(path(st), st === 4 ? 0 : u);
          packet.position.copy(p);
          packet.rotation.set(elapsed * 2, elapsed * 3, 0);
          history.unshift(p.clone());
          if (history.length > 12) history.pop();
        } else {
          history.length = 0;
        }
        trail.forEach((m, i) => {
          const h = history[(i + 1) * 3];
          m.visible = visible && !!h && st !== 4;
          if (h) m.position.copy(h);
        });

        // View: gentle sway + drag with inertia.
        if (!dragging) {
          view.vel *= Math.exp(-dt * 3);
          view.drag += view.vel;
        }
        root.rotation.y = view.yaw + Math.sin(elapsed * 0.2) * 0.25 + view.drag;
      };

      const render = () => {
        renderer.setRenderTarget(target);
        renderer.render(scene, camera);
        renderer.setRenderTarget(null);
        renderer.render(post, postCam);
      };

      const resize = () => {
        const w = Math.max(1, Math.round(container.clientWidth / SCALE));
        const h = Math.max(1, Math.round(container.clientHeight / SCALE));
        renderer.setSize(w, h, false);
        target.setSize(w, h);
        camera.aspect = w / h;
        camera.zoom = Math.min(1, camera.aspect / 0.9);
        camera.updateProjectionMatrix();
        render();
      };

      let raf = 0;
      let last = 0;
      let running = false;
      const frame = (now: number) => {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        update(dt);
        render();
        raf = requestAnimationFrame(frame);
      };

      // Reduced motion: one assembled frame, stopped at the approval gate.
      if (reduce) runTime = STAGES.slice(0, 4).reduce((x, y) => x + y, 0) + 0.5;
      update(0);
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
      resize();

      const visibility = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !running && !reduce) {
          running = true;
          last = performance.now();
          raf = requestAnimationFrame(frame);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      });
      visibility.observe(container);

      cleanup = () => {
        cancelAnimationFrame(raf);
        resizeObserver.disconnect();
        visibility.disconnect();
        container.removeEventListener("pointerdown", onDown);
        container.removeEventListener("pointermove", onMove);
        container.removeEventListener("pointerup", onUp);
        container.removeEventListener("pointercancel", onUp);
        for (const s of [scene, post]) {
          s.traverse((object) => {
            const mesh = object as { geometry?: { dispose(): void }; material?: { dispose(): void } };
            mesh.geometry?.dispose();
            mesh.material?.dispose();
          });
        }
        target.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  const layer = STAGE_LAYER[stage];
  return (
    <div ref={ref} className={`ditherstack ${className}`}>
      <div ref={canvasHost} className="ditherstack__canvas" aria-hidden="true" />
      <p className="ditherstack__hint" aria-hidden="true">
        ↔ {hint}
      </p>
      <div className="ditherstack__status" aria-live="off">
        <span className="ditherstack__cells" aria-hidden="true">
          {layers.map((name, i) => (
            <i key={name} data-on={i === layer} data-done={i < layer} />
          ))}
        </span>
        <span className="ditherstack__layer">
          L{layer + 1} {layers[layer]}
        </span>
        <span className="ditherstack__step" data-hold={stage === 4}>
          {stage === 4 ? "⏸ " : "▶ "}
          {steps[Math.min(stage, steps.length - 1)]}
        </span>
      </div>
    </div>
  );
}
