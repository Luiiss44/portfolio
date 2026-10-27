// Hero background: a slow flowing aurora drawn by a single fragment shader.
// Raw WebGL1, no library. The mouse bends the flow; scrolling fades it.

const vert = `
attribute vec2 p;
void main(){ gl_Position = vec4(p, 0.0, 1.0); }
`;

const frag = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uFade;

vec3 hash3(vec2 p){
  vec3 q = vec3(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)), dot(p, vec2(419.2, 371.9)));
  return fract(sin(q) * 43758.5453);
}
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash3(i).x, b = hash3(i + vec2(1.0, 0.0)).x;
  float c = hash3(i + vec2(0.0, 1.0)).x, d = hash3(i + vec2(1.0, 1.0)).x;
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 4; i++){ v += a * noise(p); p = r * p * 2.02; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes.xy) / uRes.y;
  float t = uTime * 0.06;

  vec2 m = (uMouse - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  float md = length(p - m);
  p += (p - m) * 0.08 * exp(-md * 3.0);

  vec2 q = vec2(fbm(p * 1.4 + vec2(0.0, t)), fbm(p * 1.4 + vec2(5.2, -t)));
  vec2 r = vec2(fbm(p * 1.6 + 3.0 * q + vec2(1.7, 9.2) + t * 0.7), fbm(p * 1.6 + 3.0 * q + vec2(8.3, 2.8) - t * 0.5));
  float f = fbm(p * 1.2 + 2.6 * r);

  vec3 deep = vec3(0.043, 0.043, 0.051);
  vec3 violet = vec3(0.42, 0.33, 0.95);
  vec3 ember = vec3(1.0, 0.45, 0.24);
  vec3 ice = vec3(0.55, 0.85, 1.0);

  vec3 col = deep;
  col = mix(col, violet * 0.75, smoothstep(0.35, 0.9, f));
  col = mix(col, ember * 0.85, smoothstep(0.55, 1.05, length(r)) * 0.55);
  col = mix(col, ice, pow(smoothstep(0.62, 0.95, f * q.x * 1.6), 3.0) * 0.35);
  col += violet * 0.12 * exp(-md * 2.5);

  // keep the top-left readable and the edges dark
  float vign = smoothstep(1.25, 0.25, length((uv - vec2(0.62, 0.62)) * vec2(1.1, 1.4)));
  col = mix(deep, col, vign * 0.95);

  gl_FragColor = vec4(col * uFade, 1.0);
}
`;

export function startShader(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false, powerPreference: 'high-performance' });
  if (!gl) return { setFade: () => {}, stop: () => {} };

  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return { setFade: () => {}, stop: () => {} };
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(prog, 'uRes');
  const uTime = gl.getUniformLocation(prog, 'uTime');
  const uMouse = gl.getUniformLocation(prog, 'uMouse');
  const uFade = gl.getUniformLocation(prog, 'uFade');

  // Render at a fraction of the CSS resolution: the image is soft anyway and the
  // browser upscales it for free. Keeps integrated GPUs well under budget.
  const scale = 0.35;
  const resize = () => {
    const w = Math.max(1, Math.floor(canvas.clientWidth * scale));
    const h = Math.max(1, Math.floor(canvas.clientHeight * scale));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
  };
  resize();
  window.addEventListener('resize', resize);

  const mouse = { x: 0.6, y: 0.6, tx: 0.6, ty: 0.6 };
  window.addEventListener('pointermove', (e) => {
    mouse.tx = e.clientX / window.innerWidth;
    mouse.ty = 1 - e.clientY / window.innerHeight;
  });

  let fade = 0;
  let targetFade = 1;
  let visible = true;
  let raf = 0;
  const t0 = performance.now();
  new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(canvas);

  // The flow is slow, so 30 fps is indistinguishable from 60 and halves the GPU work.
  let lastDraw = 0;
  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    if (!visible || document.hidden || now - lastDraw < 32) return;
    lastDraw = now;
    mouse.x += (mouse.tx - mouse.x) * 0.04;
    mouse.y += (mouse.ty - mouse.y) * 0.04;
    fade += (targetFade - fade) * 0.03;
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, (now - t0) / 1000);
    gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.uniform1f(uFade, fade);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  raf = requestAnimationFrame(frame);

  return {
    setFade: (v: number) => (targetFade = v),
    stop: () => cancelAnimationFrame(raf),
  };
}
