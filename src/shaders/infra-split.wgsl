@group(0) @binding(0) var<uniform> resolution: vec2f;
@group(0) @binding(1) var<uniform> time: f32;
@group(0) @binding(2) var<uniform> aspect: f32;

const AMBER: vec3f = vec3f(1.0, 0.706, 0.329);
const TEAL: vec3f = vec3f(0.302, 0.839, 0.780);
const LINE_Y: f32 = 0.5;
const X0: f32 = 0.22;
const X1: f32 = 0.78;
const BAR_HALF: f32 = 0.06;
const TRAVEL_SEC: f32 = 3.2;

fn tubeMask(uv: vec2f, x0: f32, x1: f32, core: f32, halo: f32) -> f32 {
  let lo = min(x0, x1);
  let hi = max(x0, x1);
  let onX = step(lo, uv.x) * step(uv.x, hi);
  let d = abs(uv.y - LINE_Y);
  let tube = exp(-d * 20.0) * core + exp(-d * 7.0) * halo;
  return tube * onX;
}

fn packetDot(uv: vec2f, t: f32, color: vec3f, east: f32) -> vec3f {
  let fade = smoothstep(0.0, 0.07, t) * smoothstep(1.0, 0.93, t);
  let x = mix(X0, X1, select(1.0 - t, t, east > 0.5));
  let p = vec2f((uv.x - x) * aspect, uv.y - LINE_Y);
  let core = exp(-dot(p, p) * 520.0);
  let halo = exp(-dot(p, p) * 90.0) * 0.35;
  return color * (core + halo) * fade;
}

fn rack(uv: vec2f, cx: f32, color: vec3f, pulse: f32) -> vec3f {
  let p = uv - vec2f(cx, LINE_Y);
  let box = vec2f(0.125, 0.34);
  let q = abs(p) - box;
  let d = length(max(q, vec2f(0.0))) + min(max(q.x, q.y), 0.0);
  let inside = 1.0 - step(0.0, d);
  let edge = exp(-abs(d) * 42.0) * (0.5 + pulse * 0.4);
  let fill = inside * 0.14;
  let shelfY = fract((p.y + box.y) * 6.2);
  let shelves = inside * exp(-abs(shelfY - 0.5) * 22.0) * 0.22;
  let ledP = p - vec2f(box.x - 0.03, -box.y + 0.06);
  let led = exp(-dot(ledP, ledP) * 1400.0) * (0.55 + pulse * 0.7);
  return color * (edge + fill + shelves + led);
}

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let track = tubeMask(uv, X0, X1, 0.55, 0.28);

  let linear = fract(time / TRAVEL_SEC);
  let travel = select(2.0 - linear * 2.0, linear * 2.0, linear < 0.5);
  let center = mix(X0 + BAR_HALF, X1 - BAR_HALF, travel);
  let barLo = center - BAR_HALF;
  let barHi = center + BAR_HALF;
  let goingForward = linear < 0.5;

  let trail = select(
    tubeMask(uv, barLo, X1, 0.28, 0.12),
    tubeMask(uv, X0, barHi, 0.28, 0.12),
    goingForward
  ) * 0.85;

  let onBar = step(barLo, uv.x) * step(uv.x, barHi);
  let d = abs(uv.y - LINE_Y);
  let barCore = exp(-d * 22.0) * onBar;
  let barHalo = exp(-d * 7.0) * 0.9 * onBar;
  let barBright = barCore * 1.05 + barHalo;

  let pulseA = 0.5 + 0.5 * sin(time * 1.5);
  let pulseB = 0.5 + 0.5 * sin(time * 1.5 + 1.3);

  var rgb = AMBER * (track * 0.7 + trail * 0.65 + barBright * 1.25);
  rgb += TEAL * tubeMask(uv, X0, X1, 0.1, 0.16) * 0.7;
  rgb += rack(uv, 0.145, AMBER, pulseA);
  rgb += rack(uv, 0.855, TEAL, pulseB);

  rgb += packetDot(uv, fract(time * 0.38), AMBER, 1.0);
  rgb += packetDot(uv, fract(time * 0.38 + 0.33), AMBER, 1.0);
  rgb += packetDot(uv, fract(time * 0.38 + 0.66), AMBER, 1.0);
  rgb += packetDot(uv, fract(time * 0.31 + 0.12), TEAL, 0.0);
  rgb += packetDot(uv, fract(time * 0.31 + 0.45), TEAL, 0.0);
  rgb += packetDot(uv, fract(time * 0.31 + 0.78), TEAL, 0.0);

  let alpha = clamp(length(rgb) * 0.85, 0.0, 0.98);
  return vec4f(rgb * alpha, alpha);
}
