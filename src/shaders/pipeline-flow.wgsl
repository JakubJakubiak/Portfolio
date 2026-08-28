@group(0) @binding(0) var<uniform> resolution: vec2f;
@group(0) @binding(1) var<uniform> time: f32;
@group(0) @binding(2) var<uniform> aspect: f32;

const AMBER: vec3f = vec3f(1.0, 0.706, 0.329);
const TEAL: vec3f = vec3f(0.302, 0.839, 0.780);
const LINE_Y: f32 = 0.5;
const X0: f32 = 0.04;
const X1: f32 = 0.96;
const BAR_HALF: f32 = 0.085;
const TRAVEL_SEC: f32 = 4.2;

fn nodeX(index: f32) -> f32 {
  return X0 + index * 0.23;
}

fn nodeColor(index: f32) -> vec3f {
  if (i32(index) % 2 == 0) {
    return AMBER;
  }
  return TEAL;
}

fn nodeActivation(leadX: f32, centerX: f32) -> f32 {
  let d = abs(leadX - centerX);
  return exp(-pow(d / 0.05, 2.0));
}

fn tubeMask(uv: vec2f, x0: f32, x1: f32, core: f32, halo: f32) -> f32 {
  let lo = min(x0, x1);
  let hi = max(x0, x1);
  let onX = step(lo, uv.x) * step(uv.x, hi);
  let d = abs(uv.y - LINE_Y);
  let tube = exp(-d * 20.0) * core + exp(-d * 7.0) * halo;
  return tube * onX;
}

fn activeNode(uv: vec2f, index: f32, activation: f32) -> vec3f {
  let center = vec2f(nodeX(index), LINE_Y);
  let d = length(uv - center);
  let color = nodeColor(index);
  let idle = exp(-d * 50.0) * 0.05;
  let ring = exp(-d * 38.0) * activation * 0.5;
  let hot = exp(-d * 88.0) * activation * 0.38;
  return color * (idle + ring + hot);
}

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  // Visible neon pipe (full track).
  let track = tubeMask(uv, X0, X1, 0.38, 0.18);

  // Ping-pong — smooth turn at both ends, no wrap jump.
  let linear = fract(time / TRAVEL_SEC);
  let travel = select(2.0 - linear * 2.0, linear * 2.0, linear < 0.5);
  let center = mix(X0 + BAR_HALF, X1 - BAR_HALF, travel);
  let barLo = center - BAR_HALF;
  let barHi = center + BAR_HALF;
  let leadX = barHi;

  // Dim trail follows motion direction.
  let goingForward = linear < 0.5;
  let trailForward = tubeMask(uv, X0, leadX, 0.2, 0.09);
  let trailBackward = tubeMask(uv, barLo, X1, 0.2, 0.09);
  let trail = select(trailBackward, trailForward, goingForward) * 0.8;

  let onBar = step(barLo, uv.x) * step(uv.x, barHi);
  let d = abs(uv.y - LINE_Y);
  let barCore = exp(-d * 22.0) * onBar;
  let barHalo = exp(-d * 8.0) * 0.85 * onBar;

  let span = max(barHi - barLo, 0.001);
  let along = clamp((uv.x - barLo) / span, 0.0, 1.0);
  let front = smoothstep(0.1, 1.0, along);
  let barBright = (barCore * (0.55 + front * 0.45) + barHalo) * onBar;

  var rgb = AMBER * (track * 0.65 + trail * 0.55 + barBright * 1.15);
  rgb += TEAL * tubeMask(uv, X0, X1, 0.06, 0.12) * 0.5;

  rgb += activeNode(uv, 0.0, nodeActivation(leadX, nodeX(0.0)));
  rgb += activeNode(uv, 1.0, nodeActivation(leadX, nodeX(1.0)));
  rgb += activeNode(uv, 2.0, nodeActivation(leadX, nodeX(2.0)));
  rgb += activeNode(uv, 3.0, nodeActivation(leadX, nodeX(3.0)));
  rgb += activeNode(uv, 4.0, nodeActivation(leadX, nodeX(4.0)));

  let nodeBoost = max(
    max(nodeActivation(leadX, nodeX(0.0)), nodeActivation(leadX, nodeX(1.0))),
    max(max(nodeActivation(leadX, nodeX(2.0)), nodeActivation(leadX, nodeX(3.0))), nodeActivation(leadX, nodeX(4.0)))
  );

  let alpha = clamp(track * 0.65 + trail * 0.5 + barBright * 1.0 + nodeBoost * 0.45, 0.0, 0.98);

  return vec4f(rgb * alpha, alpha);
}
