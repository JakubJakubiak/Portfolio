import { hash2 } from "@vgpu/wgsl-std/hash";

@group(0) @binding(0) var<uniform> resolution: vec2f;
@group(0) @binding(1) var<uniform> time: f32;
@group(0) @binding(2) var<uniform> aspect: f32;

fn palette(t: f32) -> vec3f {
  let amber = vec3f(1.0, 0.706, 0.329);
  let teal = vec3f(0.302, 0.839, 0.780);
  return mix(amber, teal, clamp(t, 0.0, 1.0));
}

@fragment
fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let bg = vec3f(0.055, 0.062, 0.078);
  var p = uv - vec2f(0.5);
  p = vec2f(p.x * aspect, p.y);

  let grid = abs(fract(p * 20.0 - time * 0.035) - 0.5);
  let gridLine = 1.0 - smoothstep(0.0, 0.028, min(grid.x, grid.y));

  let drift = vec2f(sin(time * 0.2) * 0.3, cos(time * 0.16) * 0.16);
  let blobA = exp(-dot(p - drift, p - drift) * 4.8);
  let blobB = exp(-dot(p + drift * 0.65, p + drift * 0.65) * 3.8);

  let grain = hash2(uv * resolution + time) * 0.028;

  var col = bg;
  col += palette(0.15) * blobA * 0.18;
  col += palette(0.85) * blobB * 0.14;
  col += vec3f(0.16) * gridLine * 0.09;
  col += vec3f(grain);

  let vignette = 1.0 - dot(p, p) * 0.42;
  col *= clamp(vignette, 0.5, 1.0);

  return vec4f(col, 1.0);
}
