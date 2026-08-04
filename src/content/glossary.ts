/**
 * Glossary terms for every termId referenced by `kw` tokens in `modules.ts`.
 * Definitions are grounded in the wording of `copilot-studio-training-guide.html`.
 */
import type { GlossaryTerm } from './types'

export const glossary: GlossaryTerm[] = [
  {
    id: 'agent',
    term: 'Agent',
    definition:
      'Knowledge + instructions + tools + channels. Conversational agents chat with people; autonomous agents act on triggers.',
  },
  {
    id: 'environment',
    term: 'Environment',
    definition:
      'A container for agents, data, and permissions. Work flows one direction: Dev → Test → Production — you never build directly in Production.',
  },
  {
    id: 'knowledge-source',
    term: 'Knowledge source',
    definition:
      'Content an agent can search to ground its answers: SharePoint, uploaded files, public websites, or Dataverse. A good description helps the agent pick the right source.',
  },
  {
    id: 'grounding',
    term: 'Grounding',
    definition:
      'Answering from your content instead of guessing. Generative answers use knowledge sources so you can check whether an answer actually came from your knowledge, via its citation.',
  },
  {
    id: 'topic',
    term: 'Topic',
    definition:
      'A scripted conversation path with a trigger. Use topics when a conversation must follow a script, like collecting details for a request.',
  },
  {
    id: 'variable',
    term: 'Variable',
    definition: 'The agent remembering what the user told it, in plain terms.',
  },
  {
    id: 'connector',
    term: 'Connector',
    definition:
      'A ready-made bridge to systems like Outlook, SharePoint, and Dataverse that a tool can use.',
  },
  {
    id: 'tool',
    term: 'Tool',
    definition:
      "An action the agent can take on your behalf: looking up records, sending emails, kicking off approvals. The tool's description decides whether the agent picks it at the right moment.",
  },
  {
    id: 'orchestration',
    term: 'Orchestration',
    definition:
      'How the agent decides what to do next. Generative orchestration works from topic descriptions; classic orchestration relies on trigger phrases.',
  },
  {
    id: 'model',
    term: 'Model',
    definition:
      'The AI model behind a response. Picking a primary model trades off reasoning depth vs speed vs cost, with separate settings for orchestration, generative responses, deep reasoning, and prompts.',
  },
  {
    id: 'child-agent',
    term: 'Child agent',
    definition:
      'A specialist agent that lives inside your agent. Write its description so the parent always routes to it correctly.',
  },
  {
    id: 'connected-agent',
    term: 'Connected agent',
    definition:
      'An existing Copilot Studio agent someone else built, connected into your agent instead of rebuilt from scratch.',
  },
  {
    id: 'mcp',
    term: 'MCP',
    definition:
      'A standard plug for external tools — an MCP server lets your agent use tools built outside Copilot Studio.',
  },
  {
    id: 'test-set',
    term: 'Test set',
    definition:
      'Real questions paired with expected answers, used to repeatably check whether the agent actually works.',
  },
  {
    id: 'evaluation',
    term: 'Evaluation',
    definition:
      'Running a test set and reading the results — the way you know what to fix before publishing, every time.',
  },
  {
    id: 'channel',
    term: 'Channel',
    definition:
      'Where users reach the agent: the demo website, the live website, or Teams and Microsoft 365.',
  },
  {
    id: 'publish',
    term: 'Publish',
    definition:
      "The moment changes go live. Nothing is live until you press Publish — that's on purpose, so you decide exactly when users see changes.",
  },
  {
    id: 'draft',
    term: 'Draft',
    definition:
      'The unpublished state of your agent. Changes stay in draft until you publish, so only you see them until then.',
  },
  {
    id: 'citation',
    term: 'Citation',
    definition:
      'A link back to the knowledge source an answer came from. Always check the source before you trust an answer.',
  },
  {
    id: 'escalation',
    term: 'Escalation',
    definition:
      "Handing a conversation off, for example through a system topic like fallback or escalate. It's one of the numbers analytics tracks, alongside sessions, engagement, and resolution.",
  },
]

export function getGlossaryTerm(id: string): GlossaryTerm | undefined {
  return glossary.find((g) => g.id === id)
}
