/**
 * Per-module quizzes — 5 questions per module, grounded in `src/content/modules.ts`
 * and the source training guide. Mixed types: multiple-choice, true-false, and order
 * (drag-to-reorder, scored by exact sequence). Passing is 4 of 5, enforced in
 * `src/lib/progress.ts`.
 */
import type { QuizQuestion } from './types'

export const quizzesByModule: Record<number, QuizQuestion[]> = {
  // ---------------------------------------------------------------------
  // Module 1 — What is an agent?
  // ---------------------------------------------------------------------
  1: [
    {
      id: 'm1-q1',
      type: 'multiple-choice',
      prompt: 'Which four parts make up an agent, as covered in this module?',
      options: [
        'Knowledge, instructions, tools, and channels',
        'Knowledge, topics, connectors, and licensing',
        'Instructions, variables, models, and channels',
        'Tools, environments, topics, and citations',
      ],
      correctIndex: 0,
      explanation:
        'An agent is knowledge + instructions + tools + channels — the four parts this module walks through.',
    },
    {
      id: 'm1-q2',
      type: 'true-false',
      prompt: 'Conversational agents chat with people, while autonomous agents act on triggers.',
      correct: true,
      explanation:
        'The module distinguishes conversational agents (people chat with them) from autonomous agents (they act on triggers).',
    },
    {
      id: 'm1-q3',
      type: 'multiple-choice',
      prompt: 'In the maker portal, where do you try out a new agent by asking it questions?',
      options: ['The left navigation', 'The test pane', 'The Overview page', 'The Channels page'],
      correctIndex: 1,
      explanation:
        'The test pane is where you ask your new agent questions to try it out, part of the portal tour.',
    },
    {
      id: 'm1-q4',
      type: 'true-false',
      prompt:
        'Licensing and Copilot Credits require you to configure billing settings in Module 1.',
      correct: false,
      explanation:
        "Licensing and Copilot Credits are awareness level only for now — there's nothing to configure yet.",
    },
    {
      id: 'm1-q5',
      type: 'multiple-choice',
      prompt: "What's the very first step in creating your practice agent?",
      options: [
        'Open Settings and pick a model',
        'Open the maker portal and select Create',
        'Add a knowledge source',
        'Publish to the demo website',
      ],
      correctIndex: 1,
      explanation:
        'The build steps start with opening the maker portal and selecting Create to start a new agent.',
    },
  ],

  // ---------------------------------------------------------------------
  // Module 2 — Pick the right environment
  // ---------------------------------------------------------------------
  2: [
    {
      id: 'm2-q1',
      type: 'multiple-choice',
      prompt: "You built an agent but can't find it after switching environments. What happened?",
      options: [
        'The agent was deleted automatically',
        'Agents live only in the environment where they were created',
        'The agent moved to Production automatically',
        'Your license expired',
      ],
      correctIndex: 1,
      explanation:
        'An environment is a container for agents, data, and permissions — switch environments and you are looking in a different container.',
    },
    {
      id: 'm2-q2',
      type: 'true-false',
      prompt: 'You should build and test new ideas directly in Production.',
      correct: false,
      explanation:
        'Work flows one direction, Dev → Test → Production — you never build directly in Production.',
    },
    {
      id: 'm2-q3',
      type: 'multiple-choice',
      prompt: 'Where do you check and switch your current environment in the maker portal?',
      options: [
        'The Channels page',
        'The top-right environment picker',
        'The Settings page',
        'The Overview page',
      ],
      correctIndex: 1,
      explanation:
        'You check and switch your environment using the picker in the top-right of the portal.',
    },
    {
      id: 'm2-q4',
      type: 'true-false',
      prompt: 'Admins can control whether preview AI models are allowed in an environment.',
      correct: true,
      explanation:
        'What admins control per environment includes data policies and whether preview AI models are allowed.',
    },
    {
      id: 'm2-q5',
      type: 'order',
      prompt: 'Put these environments in the order work is meant to flow through them.',
      steps: ['Test', 'Production', 'Dev'],
      correctOrder: [2, 0, 1],
      explanation:
        'Work flows one direction: Dev → Test → Production — you never build directly in Production.',
    },
  ],

  // ---------------------------------------------------------------------
  // Module 3 — Add knowledge
  // ---------------------------------------------------------------------
  3: [
    {
      id: 'm3-q1',
      type: 'multiple-choice',
      prompt:
        'A colleague asks the agent a policy question and wants to be sure the answer is trustworthy, not just generated. What should they check?',
      options: [
        'Nothing — generative answers are always correct',
        "The citation, to confirm the answer actually came from the agent's knowledge",
        "The agent's badge name",
        'The number of tools connected',
      ],
      correctIndex: 1,
      explanation:
        'Always check the source — a citation lets you confirm an answer actually came from your knowledge before you trust it.',
    },
    {
      id: 'm3-q2',
      type: 'true-false',
      prompt:
        'The "use general knowledge" toggle controls whether the agent can answer beyond your connected knowledge sources.',
      correct: true,
      explanation:
        'The module covers the "use general knowledge" toggle and when to switch it off, so answers stick to your connected sources.',
    },
    {
      id: 'm3-q3',
      type: 'multiple-choice',
      prompt: 'Which of these is NOT one of the knowledge source types covered in this module?',
      options: ['SharePoint', 'Uploaded files', 'Dataverse', 'Connected agent'],
      correctIndex: 3,
      explanation:
        'The knowledge source types covered are SharePoint, uploaded files, public websites, and Dataverse.',
    },
    {
      id: 'm3-q4',
      type: 'multiple-choice',
      prompt: 'What is the main thing that helps the agent pick the right knowledge source?',
      options: [
        'A clear, well-written description of the source',
        'The order sources were added',
        'The file size of the source',
        'The environment the agent is built in',
      ],
      correctIndex: 0,
      explanation:
        'Writing a good description for each source is how the agent picks the right one.',
    },
    {
      id: 'm3-q5',
      type: 'true-false',
      prompt:
        'You should check a citation to confirm an answer actually came from your knowledge, rather than assuming it is correct.',
      correct: true,
      explanation:
        'Checking whether an answer actually came from your knowledge is one of the skills this module builds.',
    },
  ],

  // ---------------------------------------------------------------------
  // Module 4 — Build topics
  // ---------------------------------------------------------------------
  4: [
    {
      id: 'm4-q1',
      type: 'multiple-choice',
      prompt: 'What is a topic, in plain terms?',
      options: [
        'A scripted conversation path with a trigger',
        'A connector to an external system',
        'The AI model behind a response',
        'A knowledge source type',
      ],
      correctIndex: 0,
      explanation:
        'A topic is a scripted conversation path with a trigger, used when a conversation must follow a script.',
    },
    {
      id: 'm4-q2',
      type: 'true-false',
      prompt:
        'In generative orchestration, topics can be routed to based on their descriptions, not only trigger phrases.',
      correct: true,
      explanation:
        'Trigger phrases are the classic approach; generative orchestration routes based on topic descriptions instead.',
    },
    {
      id: 'm4-q3',
      type: 'multiple-choice',
      prompt: "Which three nodes does this module call the 'everyday' building blocks of a topic?",
      options: [
        'Message, question, condition',
        'Trigger, tool, channel',
        'Knowledge, instructions, tools',
        'Escalate, fallback, greeting',
      ],
      correctIndex: 0,
      explanation:
        'The module calls out message, question, and condition as the three everyday nodes for building a topic.',
    },
    {
      id: 'm4-q4',
      type: 'multiple-choice',
      prompt: 'What does a variable do, in plain terms?',
      options: [
        'It lets the agent remember what the user told it',
        "It stores the agent's model settings",
        'It connects the agent to SharePoint',
        'It publishes the agent to a channel',
      ],
      correctIndex: 0,
      explanation:
        'Variables are described in plain terms as the agent remembering what the user told it.',
    },
    {
      id: 'm4-q5',
      type: 'true-false',
      prompt: 'System topics like greeting, fallback, and escalate can be customized.',
      correct: true,
      explanation:
        'The module covers system topics such as greeting, fallback, and escalate, and when to customize them.',
    },
  ],

  // ---------------------------------------------------------------------
  // Module 5 — Add tools
  // ---------------------------------------------------------------------
  5: [
    {
      id: 'm5-q1',
      type: 'multiple-choice',
      prompt: 'What is a tool, in plain terms?',
      options: [
        'An action the agent can take on your behalf',
        'A scripted conversation path',
        'A container for agents and data',
        'A link back to a knowledge source',
      ],
      correctIndex: 0,
      explanation:
        'A tool is an action the agent can take on your behalf, like looking up records or sending emails.',
    },
    {
      id: 'm5-q2',
      type: 'true-false',
      prompt:
        'A connector is a ready-made bridge to systems like Outlook, SharePoint, and Dataverse.',
      correct: true,
      explanation:
        'Connectors are ready-made bridges to systems such as Outlook, SharePoint, and Dataverse.',
    },
    {
      id: 'm5-q3',
      type: 'multiple-choice',
      prompt: 'What decides whether the agent picks the right tool at the right moment?',
      options: [
        "The tool's description",
        'The number of connectors installed',
        'The environment it is built in',
        'The channel it is published to',
      ],
      correctIndex: 0,
      explanation:
        "The tool's description decides whether the agent picks it at the right moment — a vague description means a missed tool.",
    },
    {
      id: 'm5-q4',
      type: 'true-false',
      prompt:
        'Agent flows for multi-step automation are covered at an awareness level in this module.',
      correct: true,
      explanation:
        'Agent flows for multi-step automation are introduced at an awareness level in this module.',
    },
    {
      id: 'm5-q5',
      type: 'multiple-choice',
      prompt: 'What is a prompt, as covered in this module?',
      options: [
        'Reusable AI instructions that can be added as a tool',
        'A knowledge source type',
        'A system topic',
        'An environment setting',
      ],
      correctIndex: 0,
      explanation: 'Prompts are reusable AI instructions, and you can add a prompt as a tool.',
    },
  ],

  // ---------------------------------------------------------------------
  // Module 6 — Work with multiple agents
  // ---------------------------------------------------------------------
  6: [
    {
      id: 'm6-q1',
      type: 'multiple-choice',
      prompt: 'What is a child agent?',
      options: [
        'A specialist agent that lives inside your agent',
        'A knowledge source type',
        'A channel for publishing',
        'A test set of questions',
      ],
      correctIndex: 0,
      explanation:
        'Child agents are specialists that live inside your agent, each with one narrow job.',
    },
    {
      id: 'm6-q2',
      type: 'true-false',
      prompt:
        'You can connect to an existing Copilot Studio agent someone else built, instead of rebuilding it.',
      correct: true,
      explanation:
        'The module covers connecting to an existing Copilot Studio agent someone else built.',
    },
    {
      id: 'm6-q3',
      type: 'multiple-choice',
      prompt: 'What makes sure the parent agent routes a question to the right child agent?',
      options: [
        "A crisp, one-line description of the child agent's job",
        'The order the child agents were added',
        'The channel the parent is published to',
        'The model selected in Settings',
      ],
      correctIndex: 0,
      explanation:
        'Writing descriptions so the parent always routes to the right specialist is how routing works — a vague description means the wrong child agent answers.',
    },
    {
      id: 'm6-q4',
      type: 'true-false',
      prompt:
        'One giant do-everything agent is easier to build, test, and trust than several specialists.',
      correct: false,
      explanation:
        'The module explains the opposite: one giant do-everything agent gets messy, while specialists with clear jobs are easier to build, test, and trust.',
    },
    {
      id: 'm6-q5',
      type: 'multiple-choice',
      prompt: 'What is an MCP server, at the awareness level covered here?',
      options: [
        'A standard plug for external tools',
        'A type of knowledge source',
        'A system topic',
        'An environment picker',
      ],
      correctIndex: 0,
      explanation:
        'MCP servers are covered at an awareness level as a standard plug for external tools.',
    },
  ],

  // ---------------------------------------------------------------------
  // Module 7 — Settings, orchestration & models
  // ---------------------------------------------------------------------
  7: [
    {
      id: 'm7-q1',
      type: 'multiple-choice',
      prompt: "A model is tagged 'preview'. Where can you use it?",
      options: [
        'Anywhere — preview models are fully supported',
        'In exploration only, never in production',
        'Only in the Production environment',
        'Only for autonomous agents',
      ],
      correctIndex: 1,
      explanation:
        'Preview and experimental model tags are fine to explore, but never for production.',
    },
    {
      id: 'm7-q2',
      type: 'true-false',
      prompt: 'Your admin controls whether preview models appear at all in your environment.',
      correct: true,
      explanation:
        'Whether preview models appear is controlled by your admin — do not assume they are available everywhere.',
    },
    {
      id: 'm7-q3',
      type: 'multiple-choice',
      prompt: 'What is the main trade-off when picking a primary model from the dropdown?',
      options: [
        'Reasoning depth vs speed vs cost',
        'Number of channels vs number of topics',
        'Knowledge sources vs tools',
        'Dev vs Test vs Production',
      ],
      correctIndex: 0,
      explanation:
        'Picking a primary model from the dropdown is a trade-off between reasoning depth, speed, and cost.',
    },
    {
      id: 'm7-q4',
      type: 'multiple-choice',
      prompt: 'What are agent instructions, in plain terms?',
      options: [
        'The standing guidance your agent always follows',
        'A one-time setup checklist',
        'A list of connectors',
        'The demo website link',
      ],
      correctIndex: 0,
      explanation: 'Agent instructions are the standing guidance your agent always follows.',
    },
    {
      id: 'm7-q5',
      type: 'true-false',
      prompt:
        'Orchestration, generative responses, deep reasoning, and prompts can each have separate model settings.',
      correct: true,
      explanation:
        'The module covers separate model settings for orchestration, generative responses, deep reasoning, and prompts.',
    },
  ],

  // ---------------------------------------------------------------------
  // Module 8 — Test, activity & evaluation
  // ---------------------------------------------------------------------
  8: [
    {
      id: 'm8-q1',
      type: 'multiple-choice',
      prompt: 'What does the activity map show you?',
      options: [
        'Which knowledge, tools, and topics the agent picked, and why',
        "The agent's licensing tier",
        'The list of connected channels',
        "The environment's data policy",
      ],
      correctIndex: 0,
      explanation:
        'Reading the activity map shows which knowledge, tools, and topics the agent picked, and why.',
    },
    {
      id: 'm8-q2',
      type: 'true-false',
      prompt: "'It seemed fine when I tried it' counts as testing an agent.",
      correct: false,
      explanation:
        "The module is explicit that 'it seemed fine when I tried it' is not testing — a repeatable test set is how you know the agent actually works.",
    },
    {
      id: 'm8-q3',
      type: 'multiple-choice',
      prompt: 'What is a test set?',
      options: [
        'Real questions paired with expected answers',
        'A list of connectors',
        'A group of child agents',
        'The pre-publish checklist',
      ],
      correctIndex: 0,
      explanation:
        'A test set pairs real questions with expected answers so you can repeatably check the agent.',
    },
    {
      id: 'm8-q4',
      type: 'true-false',
      prompt: 'The minimum bar for a test set in this module is 10 real user questions.',
      correct: true,
      explanation:
        'The build steps and Try it exercise both call for a 10-question test set as the minimum bar.',
    },
    {
      id: 'm8-q5',
      type: 'order',
      prompt: 'Put the improvement loop in the correct order.',
      steps: [
        'Re-run the evaluation and compare results',
        'Fix the description or instructions behind your worst-scoring answer',
        'Find your worst-scoring answer in the results',
        'Run an evaluation on your test set',
      ],
      correctOrder: [3, 2, 1, 0],
      explanation:
        'The improvement loop is: run an evaluation, find the worst-scoring answer, fix the description or instructions behind it, then re-run and compare.',
    },
  ],

  // ---------------------------------------------------------------------
  // Module 9 — Monitor & improve
  // ---------------------------------------------------------------------
  9: [
    {
      id: 'm9-q1',
      type: 'multiple-choice',
      prompt: 'Which numbers does the analytics summary track?',
      options: [
        'Sessions, engagement, resolution, and escalation',
        'Licensing, credits, and quotas',
        'Dev, Test, and Production usage',
        'Knowledge sources and connectors',
      ],
      correctIndex: 0,
      explanation:
        'Reading the analytics summary means looking at sessions, engagement, resolution, and escalation.',
    },
    {
      id: 'm9-q2',
      type: 'true-false',
      prompt: 'Publishing an agent is the finish line — no further review is needed.',
      correct: false,
      explanation:
        "Publishing isn't the finish line — a 15-minute weekly review keeps a live agent healthy and improving.",
    },
    {
      id: 'm9-q3',
      type: 'multiple-choice',
      prompt: 'About how long should the simple weekly review take?',
      options: ['About 15 minutes', 'A full day', 'About 3 hours', "It isn't necessary weekly"],
      correctIndex: 0,
      explanation: 'The module describes a simple weekly ritual that takes about 15 minutes.',
    },
    {
      id: 'm9-q4',
      type: 'true-false',
      prompt: 'Autonomous agent health is covered in this module, where it applies.',
      correct: true,
      explanation: 'The module notes autonomous agent health as a topic, where it applies.',
    },
    {
      id: 'm9-q5',
      type: 'multiple-choice',
      prompt: 'What should the weekly ritual cover, according to this module?',
      options: [
        "What to check, what 'bad' looks like, and who to tell",
        'Rewriting all topics from scratch',
        'Switching environments',
        'Re-licensing the agent',
      ],
      correctIndex: 0,
      explanation:
        "The simple weekly ritual covers what to check, what 'bad' looks like, and who to tell.",
    },
  ],

  // ---------------------------------------------------------------------
  // Module 10 — Channels & publishing
  // ---------------------------------------------------------------------
  10: [
    {
      id: 'm10-q1',
      type: 'multiple-choice',
      prompt: 'You fixed a typo in the instructions but users still see old behavior. Why?',
      options: [
        "The fix didn't save",
        'Changes stay in draft until you publish again',
        'The agent needs to be rebuilt from scratch',
        "Typos can't be fixed after publishing",
      ],
      correctIndex: 1,
      explanation:
        'Nothing is live until you press Publish — changes stay in draft on purpose, so a fix needs a re-publish before users see it.',
    },
    {
      id: 'm10-q2',
      type: 'true-false',
      prompt: 'The demo website channel is meant for stakeholder review before broad rollout.',
      correct: true,
      explanation: 'Use the demo website for stakeholder review before broad rollout.',
    },
    {
      id: 'm10-q3',
      type: 'multiple-choice',
      prompt:
        "What does deploying to Teams and Microsoft 365 require, that the demo website doesn't?",
      options: [
        'An admin approval step',
        'A new environment',
        'A new knowledge source',
        'A different model',
      ],
      correctIndex: 0,
      explanation: 'Teams and M365 deployment includes an admin approval step.',
    },
    {
      id: 'm10-q4',
      type: 'true-false',
      prompt:
        'The pre-publish checklist includes confirming knowledge is verified and evaluation has passed.',
      correct: true,
      explanation:
        'The pre-publish checklist covers knowledge verified, evaluation passed, right environment, and right channel.',
    },
    {
      id: 'm10-q5',
      type: 'order',
      prompt: 'Put these pre-publish checklist items in the order this module lists them.',
      steps: ['Right channel', 'Evaluation passed', 'Right environment', 'Knowledge verified'],
      correctOrder: [3, 1, 2, 0],
      explanation:
        'The pre-publish checklist runs: knowledge verified, evaluation passed, right environment, right channel.',
    },
  ],
}

export function getQuizForModule(moduleId: number): QuizQuestion[] {
  return quizzesByModule[moduleId] ?? []
}
