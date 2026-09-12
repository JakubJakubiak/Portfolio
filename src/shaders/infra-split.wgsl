@group(0) @binding(0) var<uniform> resolution: vec2f;
@group(0) @binding(1) var<uniform> time: f32;
@group(0) @binding(2) var<uniform> aspect: f32;

const AMBER: vec3f = vec3f(1.0, 0.706, 0.329);
const TEAL: vec3f = vec3f(0.302, 0.839, 0.780);
const LINE_Y: f32 = 0.5;
const X0: f32 = 0.22;
const X1: f32 = 0.78;
const BAR_HALF: f32 = 0.07;
const TRAVEL_SEC: f32 = 3.6;

fn tubeMask(uv: vec2f, x0: f32, x1: f32, core: f32, halo: f32) -> f32 {
  let lo = min(x0, x1);
  let hi = max(x0, x1);
  let onX = step(lo, uv.x) * step(uv.x, hi);
  let d = abs(uv.y - LINE_Y);
  let tube = exp(-d * 22.0) * core + exp(-d * 8.0) * halo;
  return tube * onX;
}

fn rackGlow(uv: vec2f, cx: f32, color: vec3f, pulse: f32) -> vec3f {
  let p = uv - vec2f(cx, LINE_Y);
  let box = vec2f(0.11, 0.28);
  let q = abs(p) - box;
  let d = length(max(q, vec2f(0.0))) + min(max(q.x, q.y), 0.0);
  let edge = exp(-abs(d) * 55.0) * (0.22 + pulse * 0.2);
  let fill = exp(-max(d, 0.0) * 18.0) * 0.07;
  return color * (edge + fill);
}

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let track = tubeMask(uv, X0, X1, 0.42, 0.2);

  let linear = fract(time / TRAVEL_SEC);
  let travel = select(2.0 - linear * 2.0, linear * 2.0, linear < 0.5);
  let center = mix(X0 + BAR_HALF, X1 - BAR_HALF, travel);
  let barLo = center - BAR_HALF;
  let barHi = center + BAR_HALF;
  let goingForward = linear < 0.5;

  let trail = select(
    tubeMask(uv, barLo, X1, 0.22, 0.1),
    tubeMask(uv, X0, barHi, 0.22, 0.1),
    goingForward
  ) * 0.75;

  let onBar = step(barLo, uv.x) * step(uv.x, barHi);
  let d = abs(uv.y - LINE_Y);
  let barCore = exp(-d * 24.0) * onBar;
  let barHalo = exp(-d * 8.0) * 0.8 * onBar;
  let barBright = barCore * 0.9 + barHalo;

  let pulseA = 0.5 + 0.5 * sin(time * 1.4);
  let pulseB = 0.5 + 0.5 * sin(time * 1.4 + 1.2);

  var rgb = AMBER * (track * 0.45 + trail * 0.5 + barBright * 1.1);
  rgb += TEAL * tubeMask(uv, X0, X1, 0.08, 0.14) * 0.55;
  rgb += rackGlow(uv, 0.16, AMBER, pulseA);
  rgb += rackGlow(uv, 0.84, TEAL, pulseB);

  let alpha = clamp(track * 0.55 + trail * 0.45 + barBright * 0.95 + pulseA * 0.08 + pulseB * 0.08, 0.0, 0.95);
  return vec4f(rgb * alpha, alpha);
}
