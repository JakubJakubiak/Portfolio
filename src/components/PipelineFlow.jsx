import { useState } from 'react'
import pipelineFlowShader from '../shaders/pipeline-flow.wgsl'
import VgpuCanvas from './VgpuCanvas'

export default function PipelineFlow() {
  const [failed, setFailed] = useState(false)

  if (failed) return null

  return (
    <VgpuCanvas
      shader={pipelineFlowShader}
      className="pointer-events-none absolute inset-0 z-[4] h-[160px] w-full min-w-[680px]"
      blend="premultiplied"
      clearColor={[0, 0, 0, 0]}
      alphaMode="premultiplied"
      dpr={[1, 2]}
      onFail={() => setFailed(true)}
    />
  )
}
