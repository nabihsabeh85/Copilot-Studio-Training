import type { JSX } from 'react'
import type { DiagramId } from '../../content/types'
import { Fig1AgentAnatomy } from './Fig1AgentAnatomy'
import { Fig2Environments } from './Fig2Environments'
import { Fig3KnowledgeGrounding } from './Fig3KnowledgeGrounding'
import { Fig4TopicFlow } from './Fig4TopicFlow'
import { Fig5Tools } from './Fig5Tools'
import { Fig6MultiAgentRouting } from './Fig6MultiAgentRouting'
import { Fig7ModelTriangle } from './Fig7ModelTriangle'
import { Fig8EvaluationLoop } from './Fig8EvaluationLoop'
import { Fig9Analytics } from './Fig9Analytics'
import { Fig10PublishPath } from './Fig10PublishPath'

const DIAGRAMS: Record<DiagramId, () => JSX.Element> = {
  fig1: Fig1AgentAnatomy,
  fig2: Fig2Environments,
  fig3: Fig3KnowledgeGrounding,
  fig4: Fig4TopicFlow,
  fig5: Fig5Tools,
  fig6: Fig6MultiAgentRouting,
  fig7: Fig7ModelTriangle,
  fig8: Fig8EvaluationLoop,
  fig9: Fig9Analytics,
  fig10: Fig10PublishPath,
}

export function ModuleDiagram({ id }: { id: DiagramId }) {
  const Diagram = DIAGRAMS[id]
  return <Diagram />
}

export {
  Fig1AgentAnatomy,
  Fig2Environments,
  Fig3KnowledgeGrounding,
  Fig4TopicFlow,
  Fig5Tools,
  Fig6MultiAgentRouting,
  Fig7ModelTriangle,
  Fig8EvaluationLoop,
  Fig9Analytics,
  Fig10PublishPath,
}
