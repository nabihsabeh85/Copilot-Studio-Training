/**
 * Phase 2 module content, transcribed from `copilot-studio-training-guide.html`
 * (see `src/content/_extracted.json`) and shaped to match `src/content/types.ts`.
 *
 * Source HTML wins for wording; the course brief wins for structure. The guide has no
 * separate "In plain words / Build it / Watch out" sections, so those are derived here
 * from the guide's why + You'll learn + Try it + house rules content.
 */
import type {
  BuildStep,
  ConceptBlock,
  InlineToken,
  LinkItem,
  Module,
  ScreenshotSlot,
} from './types'
import { getQuizForModule } from './quizzes'

const t = (text: string): InlineToken => ({ type: 'text', text })
const kw = (text: string, termId: string): InlineToken => ({ type: 'kw', text, termId })
const ui = (text: string): InlineToken => ({ type: 'ui', text })

const para = (tokens: InlineToken[]): ConceptBlock => ({ type: 'paragraph', tokens })
const list = (items: InlineToken[][]): ConceptBlock => ({ type: 'list', items })

function buildSteps(moduleNum: number, steps: InlineToken[][]): BuildStep[] {
  return steps.map((tokens, i) => ({ id: `m${moduleNum}-step-${i + 1}`, tokens }))
}

function goDeeper(links: LinkItem[]): LinkItem[] {
  return links
}

/** Course intro copy from the guide's `<header>` hero block. */
export interface CourseTitlePart {
  text: string
  accent?: boolean
}

export interface CourseMeta {
  eyebrow: string
  titleParts: CourseTitlePart[]
  lede: string
}

export const courseMeta: CourseMeta = {
  eyebrow: 'Internal Training · No coding required',
  titleParts: [{ text: 'Build your first agent with ' }, { text: 'Copilot Studio', accent: true }],
  lede: "A 10-module path for business users. You'll build one practice agent step by step, and by the last module you'll publish it for real. Every source is official Microsoft documentation.",
}

// ---------------------------------------------------------------------------
// Module 1 — What is an agent?
// ---------------------------------------------------------------------------

const m1ScreenshotSlots: ScreenshotSlot[] = [
  {
    id: 'm1-shot-1',
    caption:
      'AI Enablement Assistant Overview in CDO - DEV, with instructions visible and the test pane open on the right.',
    annotation: 'Annotate: 1) left navigation, 2) instructions box, 3) test pane',
  },
]

// ---------------------------------------------------------------------------
// Module 2 — Pick the right environment
// ---------------------------------------------------------------------------

const m2ScreenshotSlots: ScreenshotSlot[] = [
  {
    id: 'm2-shot-1',
    caption:
      'Capture the environment picker open, showing your Dev and Test environments in the list.',
    annotation: 'Annotate: circle the current environment name, add "always check this first"',
  },
]

// ---------------------------------------------------------------------------
// Module 3 — Add knowledge
// ---------------------------------------------------------------------------

const m3ScreenshotSlots: ScreenshotSlot[] = [
  {
    id: 'm3-shot-1',
    caption:
      'The Add knowledge dialog for AI Enablement Assistant (CDO - DEV), showing upload, SharePoint, and featured source options.',
    annotation: 'Annotate: highlight SharePoint / file upload as the everyday starting sources',
  },
  {
    id: 'm3-shot-2',
    caption: 'A test-pane answer with a citation link visible.',
    annotation: 'Annotate: arrow to the citation with "always check the source"',
  },
]

// ---------------------------------------------------------------------------
// Module 4 — Build topics
// ---------------------------------------------------------------------------

const m4ScreenshotSlots: ScreenshotSlot[] = [
  {
    id: 'm4-shot-1',
    caption:
      'The Topics list for AI Enablement Assistant showing custom topics (Greeting, Goodbye) and system topics.',
    annotation: 'Annotate: Custom vs System filters, and the Enabled toggles',
  },
]

// ---------------------------------------------------------------------------
// Module 5 — Add tools
// ---------------------------------------------------------------------------

const m5ScreenshotSlots: ScreenshotSlot[] = [
  {
    id: 'm5-shot-1',
    caption:
      'Capture the Add tool wizard with the description field filled in with a good example.',
    annotation: 'Annotate: highlight the description field, "this is how the agent decides"',
  },
]

// ---------------------------------------------------------------------------
// Module 6 — Work with multiple agents
// ---------------------------------------------------------------------------

const m6ScreenshotSlots: ScreenshotSlot[] = [
  {
    id: 'm6-shot-1',
    caption:
      'Child agent Details on the Agents tab — description is required before the agent can be saved.',
    annotation:
      'Annotate: the missing Description error — routing depends on a crisp one-line job description',
  },
]

// ---------------------------------------------------------------------------
// Module 7 — Settings, orchestration & models
// ---------------------------------------------------------------------------

const m7ScreenshotSlots: ScreenshotSlot[] = [
  {
    id: 'm7-shot-1',
    caption:
      'Overview model picker for AI Enablement Assistant with Claude Sonnet 4.6 selected (CDO - DEV).',
    annotation: 'Annotate: model choice sits next to instructions — this is the agent\'s brain',
  },
  {
    id: 'm7-shot-2',
    caption:
      'The model dropdown open, showing OpenAI / Anthropic options and Preview or Experimental tags.',
    annotation: 'Annotate: circle Preview / Experimental tags — not for production',
  },
]

// ---------------------------------------------------------------------------
// Module 8 — Test, activity & evaluation
// ---------------------------------------------------------------------------

const m8ScreenshotSlots: ScreenshotSlot[] = [
  {
    id: 'm8-shot-1',
    caption: 'The activity map expanded during a test.',
    annotation: 'Annotate: point to a failed case with "this is gold, it tells you what to fix"',
  },
  {
    id: 'm8-shot-2',
    caption: 'An evaluation results page after a run.',
    annotation: 'Annotate: point to a failed case with "this is gold, it tells you what to fix"',
  },
]

// ---------------------------------------------------------------------------
// Module 9 — Monitor & improve
// ---------------------------------------------------------------------------

const m9ScreenshotSlots: ScreenshotSlot[] = [
  {
    id: 'm9-shot-1',
    caption: 'Capture the Analytics summary page of a live or demo agent.',
    annotation: 'Annotate: circle resolution rate and escalation rate',
  },
]

// ---------------------------------------------------------------------------
// Module 10 — Channels & publishing
// ---------------------------------------------------------------------------

const m10ScreenshotSlots: ScreenshotSlot[] = [
  {
    id: 'm10-shot-1',
    caption:
      'Channels page showing Demo website, Teams/M365, and other channel tiles (auth may limit web channels).',
    annotation: 'Annotate: start with Demo website for stakeholder review before broad rollout',
  },
  {
    id: 'm10-shot-2',
    caption: 'The demo website open in a browser with the agent responding.',
    annotation: 'Annotate: "share this demo link for feedback before going live"',
  },
]

export const modules: Module[] = [
  // -------------------------------------------------------------------------
  // Module 1
  // -------------------------------------------------------------------------
  {
    id: 1,
    slug: 'what-is-an-agent',
    title: 'What is an agent?',
    whyItMatters:
      'Everything in Copilot Studio makes sense once you can picture the four parts of an agent.',
    estimatedMinutes: '45–60 min',
    badgeName: 'Agent Architect',
    diagram: 'fig1',
    concept: [
      para([
        t('Everything in Copilot Studio makes sense once you can picture the four parts of an '),
        kw('agent', 'agent'),
        t(': knowledge, instructions, tools, and channels.'),
      ]),
      list([
        [
          t('What an '),
          kw('agent', 'agent'),
          t(' is, in plain language: knowledge + instructions + '),
          kw('tools', 'tool'),
          t(' + '),
          kw('channels', 'channel'),
        ],
        [
          t('Conversational '),
          kw('agents', 'agent'),
          t(' (people chat with them) vs autonomous '),
          kw('agents', 'agent'),
          t(' (they act on triggers)'),
        ],
        [t('A tour of the maker portal: the Overview page, left navigation, and test pane')],
        [t('Licensing basics and Copilot Credits, awareness level only')],
      ]),
    ],
    buildSteps: buildSteps(1, [
      [t('Open the maker portal and select '), ui('Create'), t(' to start a new agent.')],
      [t('Describe your agent in plain English when prompted.')],
      [t('Explore the Overview page, left navigation, and '), ui('test pane'), t(' layout.')],
      [t('In the '), ui('test pane'), t(', ask your new agent three questions.')],
    ]),
    watchOuts: [
      'One agent, built progressively — every module adds a layer to the same practice agent, and by Module 10 you will have published something real.',
      'Licensing and Copilot Credits are awareness level only for now — nothing to configure yet.',
      'Ask early, ask often — post questions in the shared FAQ so your question improves the course for the next cohort.',
    ],
    screenshotSlots: m1ScreenshotSlots,
    tryIt:
      "Create your first agent by describing it in plain English. Ask it three questions in the test pane. That's it, you've built an agent.",
    goDeeper: goDeeper([
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/fundamentals-what-is-copilot-studio',
        label: 'What is Microsoft Copilot Studio?',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/fundamentals-get-started',
        label: 'Build an agent from the ground up',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-gpt-overview',
        label: 'Use generative AI to build agents fast',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-licensing-subscriptions',
        label: 'Licensing and subscriptions',
      },
    ]),
    quiz: getQuizForModule(1),
    checklist: [
      'Opened the maker portal and found the Overview page',
      'Created a first agent by describing it in plain English',
      'Asked the agent three questions in the test pane',
      'Can point to where knowledge, instructions, tools, and channels show up for this agent',
    ],
  },

  // -------------------------------------------------------------------------
  // Module 2
  // -------------------------------------------------------------------------
  {
    id: 2,
    slug: 'pick-the-right-environment',
    title: 'Pick the right environment',
    whyItMatters:
      'The #1 beginner mistake is building in the wrong place. Learn this before you build anything you care about.',
    estimatedMinutes: '45–60 min',
    badgeName: 'Environment Guardian',
    diagram: 'fig2',
    concept: [
      para([
        t(
          'The #1 beginner mistake is building in the wrong place. Learn this before you build anything you care about.',
        ),
      ]),
      para([
        t(
          'Work flows one direction: Dev → Test → Production. Why you never build directly in Production is the first thing to get straight about ',
        ),
        kw('environments', 'environment'),
        t('.'),
      ]),
      list([
        [
          t('What an '),
          kw('environment', 'environment'),
          t(' is: a container for '),
          kw('agents', 'agent'),
          t(', data, and permissions'),
        ],
        [t('Why you never build directly in Production')],
        [
          t('How to check and switch your '),
          kw('environment', 'environment'),
          t(' in the portal (top-right picker)'),
        ],
        [
          t('What admins control per '),
          kw('environment', 'environment'),
          t(': data policies, and whether preview AI '),
          kw('models', 'model'),
          t(' are allowed'),
        ],
      ]),
    ],
    buildSteps: buildSteps(2, [
      [t('Select the '), ui('environment picker'), t(' in the top-right of the portal.')],
      [t('Confirm which environment is currently selected — say it out loud.')],
      [t('Switch to your Dev environment if you are not already there.')],
      [
        t(
          'Note what your admin controls here: data policies, and whether preview AI models are allowed.',
        ),
      ],
    ]),
    watchOuts: [
      'Why you never build directly in Production — work flows one direction: Dev → Test → Production.',
      "Environments come first — always confirm you're in Dev before touching anything. It's the check that prevents the most painful mistakes.",
    ],
    screenshotSlots: m2ScreenshotSlots,
    tryIt:
      "Open the environment picker, say out loud which environment you're in, and switch to Dev if you're not already there.",
    goDeeper: goDeeper([
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/environments-first-run-experience',
        label: 'Work with environments',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/admin-data-loss-prevention',
        label: 'Data policies for agents',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-licensing',
        label: 'Licenses and access',
      },
    ]),
    quiz: getQuizForModule(2),
    checklist: [
      'Opened the environment picker',
      'Confirmed I am in Dev',
      'Confirmed my practice agent lives in Dev',
      'Know who to ask about data policy and preview model questions',
    ],
  },

  // -------------------------------------------------------------------------
  // Module 3
  // -------------------------------------------------------------------------
  {
    id: 3,
    slug: 'add-knowledge',
    title: 'Add knowledge',
    whyItMatters:
      'Knowledge is what turns a generic chatbot into your expert. Answers come from your content, with citations.',
    estimatedMinutes: '45–60 min',
    badgeName: 'Knowledge Keeper',
    diagram: 'fig3',
    concept: [
      para([
        t(
          'Knowledge is what turns a generic chatbot into your expert. Answers come from your content, with ',
        ),
        kw('citations', 'citation'),
        t('.'),
      ]),
      para([
        t('Generative answers use '),
        kw('knowledge sources', 'knowledge-source'),
        t(', and writing a good description for each source is how the '),
        kw('agent', 'agent'),
        t(' picks the right one.'),
      ]),
      list([
        [t('How generative answers use '), kw('knowledge sources', 'knowledge-source')],
        [t('Source types: SharePoint, uploaded files, public websites, Dataverse')],
        [
          t('Writing a good description for each source, this is how the '),
          kw('agent', 'agent'),
          t(' picks the right one'),
        ],
        [t('The "use general knowledge" toggle, and when to switch it off')],
        [t('Checking whether an answer actually came from your knowledge')],
      ]),
      {
        type: 'table',
        caption: 'Source types and what they’re for',
        headers: ['Source type', 'What it’s for'],
        rows: [
          ['SharePoint', 'Search a SharePoint site or document library your team already uses.'],
          [
            'Uploaded files',
            'Ground answers in files you upload directly, like PDFs or Word docs.',
          ],
          ['Public websites', 'Pull answers from pages on the public web.'],
          ['Dataverse', 'Answer from structured business data stored in Dataverse tables.'],
        ],
      },
    ],
    buildSteps: buildSteps(3, [
      [t('Open '), ui('Add knowledge'), t(' on your practice agent.')],
      [t('Choose SharePoint (or uploaded files) and connect one site or file.')],
      [t('Write a clear description of the source so the agent picks it correctly.')],
      [t('In the '), ui('test pane'), t(', ask five questions.')],
      [
        t('Check each '),
        kw('citation', 'citation'),
        t(' to confirm the answer came from your knowledge source.'),
      ],
    ]),
    watchOuts: [
      'Always check the source — verify a citation actually backs up the answer before you trust it.',
      'Descriptions are a skill — the agent routes by reading your description of each knowledge source, so write it like you mean it.',
    ],
    screenshotSlots: m3ScreenshotSlots,
    tryIt:
      'Add one SharePoint site or file to your practice agent. Ask five questions and verify the citations point where you expect.',
    goDeeper: goDeeper([
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio',
        label: 'Knowledge sources overview',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-add-sharepoint',
        label: 'Add SharePoint',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-add-file-upload',
        label: 'Upload a file',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-add-public-website',
        label: 'Add a public website',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-test',
        label: 'Test knowledge sources',
      },
    ]),
    quiz: getQuizForModule(3),
    checklist: [
      'Added one SharePoint site or file as a knowledge source',
      'Wrote a clear description for the source',
      'Asked five questions and got answers with citations',
      'Checked that each citation points where I expect',
      'Know when to switch off the "use general knowledge" toggle',
    ],
  },

  // -------------------------------------------------------------------------
  // Module 4
  // -------------------------------------------------------------------------
  {
    id: 4,
    slug: 'build-topics',
    title: 'Build topics',
    whyItMatters:
      'When a conversation must follow a script, like collecting details for a request, topics give you full control.',
    estimatedMinutes: '45–60 min',
    badgeName: 'Topic Designer',
    diagram: 'fig4',
    concept: [
      para([
        t('When a conversation must follow a script, like collecting details for a request, '),
        kw('topics', 'topic'),
        t(' give you full control.'),
      ]),
      list([
        [t('What a '), kw('topic', 'topic'), t(' is: a scripted conversation path with a trigger')],
        [
          t('Trigger phrases (classic) vs '),
          kw('topic', 'topic'),
          t(' descriptions (generative '),
          kw('orchestration', 'orchestration'),
          t(')'),
        ],
        [t('The three everyday nodes: message, question, condition')],
        [
          kw('Variables', 'variable'),
          t(' in plain terms: the '),
          kw('agent', 'agent'),
          t(' remembering what the user told it'),
        ],
        [
          t('System '),
          kw('topics', 'topic'),
          t(' like greeting, fallback, and escalate, and when to customize them'),
        ],
      ]),
    ],
    buildSteps: buildSteps(4, [
      [t('Create a new topic and add a trigger phrase or description.')],
      [t('Add a '), ui('Question'), t(' node to collect input from the user.')],
      [t('Add a '), ui('Condition'), t(' node to branch two ways.')],
      [t('Wire one branch to answer from knowledge, and the other to offer an escalation.')],
      [t('Test the topic in the '), ui('test pane'), t('.')],
    ]),
    watchOuts: [
      'Descriptions are a skill — write trigger phrases and topic descriptions like you mean it, since the agent routes by reading them.',
    ],
    screenshotSlots: m4ScreenshotSlots,
    tryIt:
      'Build one topic with a question and a two-way branch, for example: answer FAQs from knowledge, or offer to escalate.',
    goDeeper: goDeeper([
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-create-edit-topics',
        label: 'Create and edit topics',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-authoring',
        label: 'Create topics with Copilot',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-triggers',
        label: 'Topic triggers',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-variables',
        label: 'Work with variables',
      },
    ]),
    quiz: getQuizForModule(4),
    checklist: [
      'Built one topic with a question node',
      'Added a condition node that branches two ways',
      'Tested the topic end-to-end in the test pane',
      'Can explain the difference between trigger phrases and topic descriptions',
    ],
  },

  // -------------------------------------------------------------------------
  // Module 5
  // -------------------------------------------------------------------------
  {
    id: 5,
    slug: 'add-tools',
    title: 'Add tools',
    whyItMatters:
      'Tools let your agent do things, not just talk: look up records, send emails, kick off approvals.',
    estimatedMinutes: '45–60 min',
    badgeName: 'Toolsmith',
    diagram: 'fig5',
    concept: [
      para([
        t('Tools let your '),
        kw('agent', 'agent'),
        t(' do things, not just talk: look up records, send emails, kick off approvals.'),
      ]),
      list([
        [
          t('What a '),
          kw('tool', 'tool'),
          t(' is: an action the '),
          kw('agent', 'agent'),
          t(' can take on your behalf'),
        ],
        [
          kw('Connectors', 'connector'),
          t(': ready-made bridges to systems like Outlook, SharePoint, and Dataverse'),
        ],
        [t('Prompts as reusable AI instructions, and adding a prompt as a '), kw('tool', 'tool')],
        [kw('Agent', 'agent'), t(' flows for multi-step automation, awareness level')],
        [
          t('Why the '),
          kw('tool', 'tool'),
          t("'s description decides whether the "),
          kw('agent', 'agent'),
          t(' picks it at the right moment'),
        ],
      ]),
    ],
    buildSteps: buildSteps(5, [
      [t('Open '), ui('Add tool'), t(' on your practice agent.')],
      [t('Pick a connector (for example, Outlook, SharePoint, or Dataverse) for your tool.')],
      [t('Write a clear description so the agent knows when to use it.')],
      [t('Trigger the tool from the '), ui('test pane'), t(' and confirm it runs.')],
    ]),
    watchOuts: [
      "The tool's description decides whether the agent picks it at the right moment — a vague description means a missed tool.",
    ],
    screenshotSlots: m5ScreenshotSlots,
    tryIt: 'Add one connector-based tool to your practice agent and trigger it from the test pane.',
    goDeeper: goDeeper([
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-tools-custom-agent',
        label: 'Add tools to custom agents',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-connectors',
        label: 'Use connectors',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/draft-with-copilot',
        label: 'Create prompts with Copilot',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-prompt-node',
        label: 'Create a prompt as a tool',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/flow-nl',
        label: 'Build an agent flow with natural language',
      },
    ]),
    quiz: getQuizForModule(5),
    checklist: [
      'Added one connector-based tool to my practice agent',
      'Wrote a clear description so the agent knows when to use it',
      'Triggered the tool from the test pane and saw it run',
      'Can explain the difference between a connector, a prompt tool, and an agent flow',
    ],
  },

  // -------------------------------------------------------------------------
  // Module 6
  // -------------------------------------------------------------------------
  {
    id: 6,
    slug: 'work-with-multiple-agents',
    title: 'Work with multiple agents',
    whyItMatters:
      'One giant do-everything agent gets messy. Specialists with clear jobs are easier to build, test, and trust.',
    estimatedMinutes: '45–60 min',
    badgeName: 'Team Orchestrator',
    diagram: 'fig6',
    concept: [
      para([
        t(
          'One giant do-everything agent gets messy. Specialists with clear jobs are easier to build, test, and trust.',
        ),
      ]),
      list([
        [
          kw('Child agents', 'child-agent'),
          t(': specialists that live inside your '),
          kw('agent', 'agent'),
        ],
        [
          t('Connecting to an existing '),
          kw('Copilot Studio agent', 'connected-agent'),
          t(' someone else built'),
        ],
        [t('Writing descriptions so the parent always routes to the right specialist')],
        [
          kw('MCP', 'mcp'),
          t(' servers, awareness level: a standard plug for external '),
          kw('tools', 'tool'),
        ],
      ]),
    ],
    buildSteps: buildSteps(6, [
      [t('Open the '), ui('Agents'), t(' tab on your parent agent.')],
      [t('Add a child agent (new, or an existing Copilot Studio agent) with one narrow job.')],
      [t('Write a crisp, one-line description for the child agent.')],
      [
        t('Ask a question in the '),
        ui('test pane'),
        t(' that should route to the child agent, and watch what happens.'),
      ],
    ]),
    watchOuts: [
      'Write descriptions so the parent always routes to the right specialist — a vague description means the wrong child agent answers.',
    ],
    screenshotSlots: m6ScreenshotSlots,
    tryIt:
      'Add one child agent with a narrow job and a crisp description. Ask a question that should route to it and watch what happens.',
    goDeeper: goDeeper([
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-add-other-agents',
        label: 'Add other agents overview',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-child-agent',
        label: 'Add a child agent',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-agent-copilot-studio-agent',
        label: 'Connect to an existing Copilot Studio agent',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-mcp',
        label: 'MCP in Copilot Studio',
      },
    ]),
    quiz: getQuizForModule(6),
    checklist: [
      'Added one child agent with a narrow job',
      'Wrote a crisp, one-line description for the child agent',
      'Asked a question that routed to the child agent',
      'Can explain what an MCP server is, at an awareness level',
    ],
  },

  // -------------------------------------------------------------------------
  // Module 7
  // -------------------------------------------------------------------------
  {
    id: 7,
    slug: 'settings-orchestration-and-models',
    title: 'Settings, orchestration & models',
    whyItMatters:
      'The Settings page is where the agent\'s "brain" is configured. Understand it so defaults are a choice, not an accident.',
    estimatedMinutes: '45–60 min',
    badgeName: 'Model Steward',
    diagram: 'fig7',
    concept: [
      para([
        t(
          'The Settings page is where the agent\'s "brain" is configured. Understand it so defaults are a choice, not an accident.',
        ),
      ]),
      list([
        [
          t('Generative '),
          kw('orchestration', 'orchestration'),
          t(' vs classic '),
          kw('orchestration', 'orchestration'),
          t(', and what changes when you flip it'),
        ],
        [
          kw('Agent', 'agent'),
          t(' instructions: the standing guidance your '),
          kw('agent', 'agent'),
          t(' always follows'),
        ],
        [
          t('Picking a primary '),
          kw('model', 'model'),
          t(' from the dropdown: the trade-off is reasoning depth vs speed vs cost'),
        ],
        [
          t('Separate '),
          kw('model', 'model'),
          t(' settings for '),
          kw('orchestration', 'orchestration'),
          t(', generative responses, deep reasoning, and prompts'),
        ],
        [
          t('Preview and experimental '),
          kw('model', 'model'),
          t(
            ' tags: fine to explore, never for production, and your admin controls whether they appear at all',
          ),
        ],
        [t('Content moderation and the general-knowledge toggle')],
        [t('Authentication, awareness level: who is allowed to use the '), kw('agent', 'agent')],
      ]),
    ],
    buildSteps: buildSteps(7, [
      [t('Open '), ui('Settings'), t(' on your practice agent.')],
      [t('Find the Generative AI / orchestration section.')],
      [t('Write down the current orchestration mode (generative vs classic) without changing it.')],
      [
        t(
          'Open the model dropdown and note the primary model and any preview or experimental tags.',
        ),
      ],
    ]),
    watchOuts: [
      'Preview means not for production — preview and experimental model tags are fine to explore, but stay out of anything real.',
      'Your admin controls whether preview models appear at all — do not assume they are available everywhere.',
    ],
    screenshotSlots: m7ScreenshotSlots,
    tryIt:
      "Open Settings on your practice agent. Write down (don't change) the current orchestration mode and model. That's your production-safe baseline.",
    goDeeper: goDeeper([
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/advanced-generative-actions',
        label: 'Orchestrate behavior with generative AI',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-select-agent-model',
        label: 'Select a primary AI model',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-preview-model',
        label: 'Preview models for generative responses',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/prompt-model-settings',
        label: 'Prompt builder model settings',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/configuration-end-user-authentication',
        label: 'Configure end-user authentication',
      },
    ]),
    quiz: getQuizForModule(7),
    checklist: [
      'Opened Settings on my practice agent',
      'Wrote down the current orchestration mode without changing it',
      'Wrote down the current primary model without changing it',
      'Can point out any preview or experimental tags',
      'Know who controls whether preview models are allowed',
    ],
  },

  // -------------------------------------------------------------------------
  // Module 8
  // -------------------------------------------------------------------------
  {
    id: 8,
    slug: 'test-activity-and-evaluation',
    title: 'Test, activity & evaluation',
    whyItMatters:
      '"It seemed fine when I tried it" is not testing. A repeatable test set is how you know the agent actually works.',
    estimatedMinutes: '45–60 min',
    badgeName: 'Test Pilot',
    diagram: 'fig8',
    concept: [
      para([
        t(
          '"It seemed fine when I tried it" is not testing. A repeatable test set is how you know the agent actually works.',
        ),
      ]),
      list([
        [
          t('Using the '),
          ui('test pane'),
          t(', and tracking which '),
          kw('topic', 'topic'),
          t(' is running'),
        ],
        [
          t('Reading the activity map: which knowledge, '),
          kw('tools', 'tool'),
          t(', and '),
          kw('topics', 'topic'),
          t(' the '),
          kw('agent', 'agent'),
          t(' picked and why'),
        ],
        [
          t('Creating a '),
          kw('test set', 'test-set'),
          t(': real questions paired with expected answers'),
        ],
        [t('Choosing '), kw('evaluation', 'evaluation'), t(' methods and reading the results')],
        [t('The improvement loop: fix descriptions and instructions, re-run, compare')],
      ]),
    ],
    buildSteps: buildSteps(8, [
      [
        t('Open the '),
        ui('test pane'),
        t(' and review the activity map for a sample conversation.'),
      ],
      [t('Create a test set with 10 real user questions and expected answers.')],
      [t('Choose an evaluation method and run it.')],
      [t('Read the results and find your worst-scoring answer.')],
      [t('Fix the description or instructions behind it, then re-run and compare.')],
    ]),
    watchOuts: [
      'Nothing ships untested — evaluation before publishing, every time. A 10-question test set is the minimum bar.',
    ],
    screenshotSlots: m8ScreenshotSlots,
    tryIt:
      'Write a 10-question test set from real user questions, run an evaluation, and fix your worst-scoring answer.',
    goDeeper: goDeeper([
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-test-bot',
        label: 'Test your agent',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-create',
        label: 'Create test sets',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-overview',
        label: 'Choose evaluation methods',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-results',
        label: 'Run tests and view results',
      },
    ]),
    quiz: getQuizForModule(8),
    checklist: [
      'Wrote a 10-question test set from real user questions',
      'Ran an evaluation and read the results',
      'Found my worst-scoring answer',
      'Fixed a description or instruction and re-ran the test',
    ],
  },

  // -------------------------------------------------------------------------
  // Module 9
  // -------------------------------------------------------------------------
  {
    id: 9,
    slug: 'monitor-and-improve',
    title: 'Monitor & improve',
    whyItMatters:
      "Publishing isn't the finish line. A 15-minute weekly review keeps a live agent healthy and improving.",
    estimatedMinutes: '45–60 min',
    badgeName: 'Pulse Checker',
    diagram: 'fig9',
    concept: [
      para([
        t(
          "Publishing isn't the finish line. A 15-minute weekly review keeps a live agent healthy and improving.",
        ),
      ]),
      list([
        [
          t('Reading the analytics summary: sessions, engagement, resolution, '),
          kw('escalation', 'escalation'),
        ],
        [t('Turning analytics into fixes for conversational '), kw('agents', 'agent')],
        [t('Autonomous '), kw('agent', 'agent'), t(' health, where it applies')],
        [t('A simple weekly ritual: what to check, what "bad" looks like, who to tell')],
      ]),
    ],
    buildSteps: buildSteps(9, [
      [t('Open the Analytics summary page of a live (or demo) agent.')],
      [t('Review sessions, engagement, resolution, and escalation numbers.')],
      [t('Name one thing you would improve based on what you see.')],
    ]),
    watchOuts: [
      "Publishing isn't the finish line — a 15-minute weekly review keeps a live agent healthy.",
    ],
    screenshotSlots: m9ScreenshotSlots,
    tryIt:
      "Open the analytics page of any live agent and name one thing you'd improve based on what you see.",
    goDeeper: goDeeper([
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-summary',
        label: 'Analytics summary',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-improve-agent-effectiveness',
        label: 'Improve conversational agent effectiveness',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-improve-agent-health',
        label: 'Analyze autonomous agent health',
      },
    ]),
    quiz: getQuizForModule(9),
    checklist: [
      'Opened the Analytics summary page of a live or demo agent',
      'Read sessions, engagement, resolution, and escalation numbers',
      "Named one thing I'd improve based on the data",
      'Know what a 15-minute weekly review should cover',
    ],
  },

  // -------------------------------------------------------------------------
  // Module 10
  // -------------------------------------------------------------------------
  {
    id: 10,
    slug: 'channels-and-publishing',
    title: 'Channels & publishing',
    whyItMatters:
      "Nothing is live until you press Publish. That's a feature: it means you decide exactly when users see changes.",
    estimatedMinutes: '45–60 min',
    badgeName: 'Ship It',
    diagram: 'fig10',
    concept: [
      para([
        t(
          "Nothing is live until you press Publish. That's a feature: it means you decide exactly when users see changes.",
        ),
      ]),
      list([
        [
          t('The '),
          kw('publish', 'publish'),
          t(' model: changes stay in '),
          kw('draft', 'draft'),
          t(' until you '),
          kw('publish', 'publish'),
          t(', on purpose'),
        ],
        [kw('Channels', 'channel'), t(': demo website, live website, Teams and Microsoft 365')],
        [t('Using the demo website for stakeholder review before broad rollout')],
        [t('Teams and M365 deployment, including the admin approval step')],
        [t('Single sign-on, awareness level')],
        [
          t('The pre-publish checklist: knowledge verified, '),
          kw('evaluation', 'evaluation'),
          t(' passed, right '),
          kw('environment', 'environment'),
          t(', right '),
          kw('channel', 'channel'),
        ],
      ]),
      {
        type: 'table',
        caption: 'Channels and their role in rollout',
        headers: ['Channel', 'Role in rollout'],
        rows: [
          ['Demo website', 'Share with stakeholders for review before broad rollout.'],
          ['Live website', 'The public-facing channel once the agent is ready to go live.'],
          [
            'Teams & Microsoft 365',
            'Deploy where people already work; requires an admin approval step.',
          ],
        ],
      },
    ],
    buildSteps: buildSteps(10, [
      [
        t(
          'Run through the pre-publish checklist: knowledge verified, evaluation passed, right environment, right channel.',
        ),
      ],
      [t('Select '), ui('Publish'), t(' on your practice agent.')],
      [t('Open the '), ui('Channels'), t(' page and enable the demo website channel.')],
      [t('Send the demo website link to a classmate for feedback.')],
    ]),
    watchOuts: [
      'Nothing is live until you press Publish — changes stay in draft on purpose, so you decide exactly when users see them.',
      'Run the pre-publish checklist first: knowledge verified, evaluation passed, right environment, right channel.',
      'Use the demo website for stakeholder review before broad rollout.',
    ],
    screenshotSlots: m10ScreenshotSlots,
    tryIt:
      "Publish your practice agent to the demo website and send the link to a classmate for feedback. Congratulations, you've shipped an agent.",
    goDeeper: goDeeper([
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/publication-fundamentals-publish-channels',
        label: 'Publish and deploy key concepts',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/publication-connect-bot-to-web-channels',
        label: 'Publish to a live or demo website',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/publication-add-bot-to-microsoft-teams',
        label: 'Connect an agent to Teams and Microsoft 365',
      },
      {
        url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/microsoft-365-copilot-extend-with-agents',
        label: 'Extend Microsoft 365 Copilot with agents',
      },
    ]),
    quiz: getQuizForModule(10),
    checklist: [
      'Completed the pre-publish checklist',
      'Published my practice agent',
      'Enabled the demo website channel',
      'Sent the demo link to a classmate for feedback',
    ],
  },
]

export function getModuleById(id: number): Module | undefined {
  return modules.find((m) => m.id === id)
}
