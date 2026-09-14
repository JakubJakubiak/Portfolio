import infraSplitShader from '../shaders/infra-split.wgsl'
import VgpuCanvas from './VgpuCanvas'

export default function InfraSplitGpu({ onFail }) {
  return (
    <VgpuCanvas
      shader={infraSplitShader}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
      blend="premultiplied"
      clearColor={[0, 0, 0, 0]}
      alphaMode="premultiplied"
      onFail={onFail}
    />
  )
}
