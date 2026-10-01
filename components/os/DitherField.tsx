"use client";

import { useEffect, useRef } from "react";

/**
 * Animated 1-bit field: flowing noise quantised with an 8×8 Bayer matrix and
 * rendered at half resolution for chunky pixels. The cursor parts the field.
 *
 * - "sky":   accent sky, paper clouds shaded in ink, fading into the page.
 * - "blobs": accent background, ink halftone blobs.
 */

type Variant = "sky" | "blobs";

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uVariant;
uniform vec3 uA; // base
uniform vec3 uB; // mid
uniform vec3 uC; // dense

float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}
float bayer2(vec2 a) { a = floor(a); return fract(dot(a, vec2(0.5, a.y * 0.75))); }
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
float bayer8(vec2 a) { return bayer4(0.5 * a) * 0.25 + bayer2(a); }

// Cloud noise at a point (domain-warped fbm).
float cloudNoise(vec2 frag, float t) {
  vec2 uv = frag / uRes.y * 1.5;
  vec2 q = vec2(fbm(uv + vec2(t, 0.0)), fbm(uv + vec2(-t, 3.1)));
  return fbm(uv * 1.2 + q * 1.7 + vec2(t * 1.6, t * 0.3));
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 c = frag / uRes;               // 0..1, y up
  float t = uTime * 0.035;
  float b = bayer8(frag);

  // The cursor parts the clouds.
  float m = length((frag - uMouse) / uRes.y);
  float hole = 0.5 * exp(-m * m * 30.0);

  if (uVariant < 0.5) {
    // Sky: accent sky, paper clouds, ink shading under each cloud for depth.
    // Clouds frame the sides and the top, leaving open sky behind the windows.
    float frame = abs(c.x - 0.5) * 1.3 + (c.y - 0.5) * 0.55;
    float d = cloudNoise(frag, t);
    // Keep a clear patch of sky behind the headline in the middle.
    float center = 1.0 - smoothstep(0.1, 0.5, length((c - vec2(0.5, 0.5)) * vec2(1.0, 1.25)));
    float v = d + frame * 0.45 - 0.1 - center * 0.4 - hole;
    // Shading only where the noise itself thickens upward: the underside of a cloud.
    float dAbove = cloudNoise(frag + vec2(0.0, uRes.y * 0.025), t);
    float underside = smoothstep(0.02, 0.09, dAbove - d);
    vec3 col = uA;
    if (smoothstep(0.5, 0.64, v) > b) col = uB;
    float shade = underside * smoothstep(0.46, 0.56, v) * (1.0 - smoothstep(0.62, 0.72, v));
    if (shade * 0.9 > b) col = uC;
    // Dithered fade into the page at the bottom.
    if (smoothstep(0.0, 0.3, c.y) < b) col = uB;
    gl_FragColor = vec4(col, 1.0);
    return;
  }

  // Blobs: large soft shapes.
  vec2 uv = frag / uRes.y * 1.6;
  vec2 q = vec2(fbm(uv + vec2(t, 0.0)), fbm(uv + vec2(-t, 3.1)));
  float d = fbm(uv * 1.3 + q * 1.6 + vec2(t * 1.5, t * 0.4));
  float v = smoothstep(0.35, 0.8, d + 0.08 * sin(uTime * 0.2)) - hole;
  vec3 col = uA;
  if (smoothstep(0.42, 0.62, v) > b) col = uB;
  if (smoothstep(0.8, 1.15, v) > b) col = uC;
  gl_FragColor = vec4(col, 1.0);
}
`;

const PALETTES: Record<Variant, [string, string, string]> = {
  sky: ["#c6f25e", "#f1f0ea", "#0e0f11"],
  blobs: ["#c6f25e", "#0e0f11", "#0e0f11"],
};

const hex = (value: string) => [1, 3, 5].map((i) => parseInt(value.slice(i, i + 2), 16) / 255);

export function DitherField({ variant = "sky", className = "" }: { variant?: Variant; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) return;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);
    const [a, b, c] = PALETTES[variant].map(hex);
    gl.uniform3fv(u("uA"), a);
    gl.uniform3fv(u("uB"), b);
    gl.uniform3fv(u("uC"), c);
    gl.uniform1f(u("uVariant"), variant === "sky" ? 0 : 1);
    const uRes = u("uRes");
    const uTime = u("uTime");
    const uMouse = u("uMouse");

    const SCALE = 2; // one canvas pixel = 2 CSS pixels
    const mouse = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4 };

    const resize = () => {
      canvas.width = Math.max(1, Math.round(canvas.clientWidth / SCALE));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight / SCALE));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = (event.clientX - rect.left) / SCALE;
      mouse.ty = (rect.bottom - event.clientY) / SCALE;
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now() - Math.random() * 20000;
    let raf = 0;
    let running = false;

    const draw = (now: number) => {
      if (mouse.x < -1e3) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
      }
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const frame = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(frame);
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    resizeObserver.observe(canvas);

    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running && !reduce) {
        running = true;
        raf = requestAnimationFrame(frame);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    visibility.observe(canvas);
    window.addEventListener("pointermove", onPointer, { passive: true });
    canvas.dataset.ready = "true";

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      visibility.disconnect();
      window.removeEventListener("pointermove", onPointer);
      // Free GPU objects but keep the context: the same canvas can be re-mounted.
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, [variant]);

  return <canvas ref={ref} className={`dither ${className}`} aria-hidden="true" />;
}
