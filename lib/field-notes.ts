export type FieldNoteSection = {
  heading: string;
  paragraphs: string[];
  points?: string[];
};

export type FieldNote = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  description: string;
  published: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  tone: "violet" | "cobalt" | "orange";
  sections: FieldNoteSection[];
};

export const fieldNotes: FieldNote[] = [
  {
    slug: "useful-internal-control-review",
    category: "Controls in practice",
    title: "What a useful internal-control review should leave behind",
    summary: "A field guide to process ownership, testable evidence and actions that management can actually close.",
    description: "How to design an internal-control review that leaves management with clear ownership, evidence, priorities and actions that can be closed.",
    published: "2026-08-03",
    readingTime: "6 minute read",
    image: "/fst-management.webp",
    imageAlt: "A controls workshop assigning owners and actions",
    tone: "violet",
    sections: [
      {
        heading: "Start with the decision, not a generic checklist",
        paragraphs: [
          "A useful review begins by identifying what the process must achieve, which failures would matter and who relies on the result. A checklist can help organise work, but it cannot replace an understanding of the transaction flow, systems, people and evidence involved.",
          "This framing keeps the review proportionate. It also prevents a long list of observations that are technically correct but commercially irrelevant.",
        ],
      },
      {
        heading: "Map the process and its evidence",
        paragraphs: [
          "Walk the process from initiation to recording, approval, execution and reporting. For each material step, identify the person responsible, the system or document used, the control objective and the evidence that would show the control actually operated.",
        ],
        points: [
          "The event or risk that triggers the control",
          "The named control owner and any reviewer",
          "The frequency and population covered",
          "The evidence retained and where it is stored",
          "The escalation route when an exception is found",
        ],
      },
      {
        heading: "Separate design gaps from operating failures",
        paragraphs: [
          "A control may be well designed but inconsistently performed, or performed diligently without addressing the real risk. Those are different problems and need different remedies. Design gaps require a better control; operating failures require clearer ownership, capacity, training, evidence or supervision.",
          "The report should state which condition exists and the evidence supporting that conclusion. Avoid assigning a high rating solely because a policy is missing when another effective control already addresses the risk.",
        ],
      },
      {
        heading: "Leave management with a closeable action plan",
        paragraphs: [
          "Every agreed action should identify the risk addressed, the deliverable, one accountable owner, a realistic date and the evidence required for closure. Broad actions such as “strengthen controls” cannot be tested or closed.",
          "The final pack should therefore contain a concise process map, control matrix, evidence register, prioritised findings and an action tracker. That is the difference between a review that records weaknesses and one that helps management change the process.",
        ],
      },
    ],
  },
  {
    slug: "stress-testing-business-plan",
    category: "Planning & management",
    title: "Stress-testing a business plan before implementation",
    summary: "The connections to check across the commercial case, operating milestones, cash forecast, resources and management assumptions.",
    description: "A practical method for testing whether a business plan's market, operating, management and financial assumptions agree before implementation.",
    published: "2026-08-03",
    readingTime: "7 minute read",
    image: "/fst-finance.webp",
    imageAlt: "A financial model and business plan being stress-tested",
    tone: "cobalt",
    sections: [
      {
        heading: "Test whether the plan describes one coherent business",
        paragraphs: [
          "A plan becomes credible when its market argument, operating model, organisation, milestones and financial forecast describe the same activity. A strong market section cannot compensate for a delivery plan that lacks people, capacity or working capital.",
          "Begin by tracing each important revenue assumption back to a customer group, offer, price, sales route, conversion assumption and delivery requirement.",
        ],
      },
      {
        heading: "Connect milestones to resources and cash",
        paragraphs: [
          "Implementation milestones should appear in the forecast at the time they consume or generate cash. Recruitment needs salaries and lead time. New premises create deposits, fit-out and recurring costs. Product development affects both expenditure and the earliest realistic revenue date.",
        ],
        points: [
          "Which milestone unlocks each revenue stream?",
          "What must be paid before that milestone is reached?",
          "Which role, supplier or approval is on the critical path?",
          "How much delay can the cash position absorb?",
          "Which costs remain even if sales arrive later than planned?",
        ],
      },
      {
        heading: "Challenge the base case",
        paragraphs: [
          "A single forecast is not a stress test. Build a small number of decision-relevant cases: slower sales, lower pricing, delayed launch, higher direct costs or slower collection. Avoid changing every assumption at once; management needs to see which pressure creates the problem.",
          "The purpose is not to predict the exact future. It is to identify the assumptions that require early monitoring and the actions available if they move unfavourably.",
        ],
      },
      {
        heading: "Turn assumptions into a management rhythm",
        paragraphs: [
          "The finished plan should name the few commercial and operating indicators that reveal whether execution remains on course. Each indicator needs an owner, source, review frequency and response threshold.",
          "A credible output is therefore more than a narrative and spreadsheet. It is a milestone map, integrated forecast, sensitivity view, risk register and first-year review cadence that management can operate.",
        ],
      },
    ],
  },
  {
    slug: "tax-working-file-that-reconciles",
    category: "Tax operations",
    title: "Building a tax working file that reconciles before filing day",
    summary: "How a repeatable ledger-to-return review can surface missing support, classification issues and tax exposures earlier.",
    description: "How to organise a repeatable ledger-to-return tax working file with reconciliations, evidence, review points and approval before filing.",
    published: "2026-08-03",
    readingTime: "6 minute read",
    image: "/fst-tax.webp",
    imageAlt: "A tax specialist reconciling a working file",
    tone: "orange",
    sections: [
      {
        heading: "Build from the final ledger, not around it",
        paragraphs: [
          "The return should be traceable to an identified ledger or final trial balance. Record the reporting period, source version, extraction date and person responsible. If the ledger changes after preparation begins, document the change and refresh the affected schedules.",
          "This simple version control prevents the common situation where the return, accounts and supporting analysis are all internally reasonable but based on different numbers.",
        ],
      },
      {
        heading: "Use reconciliations as the spine of the file",
        paragraphs: [
          "Start with the control totals that should agree across records, returns and payments. The exact schedules depend on the tax, but every difference should be either corrected or explained before approval.",
        ],
        points: [
          "Ledger balances to the draft return",
          "Opening positions to prior filed returns and assessments",
          "Tax payable or refundable to payments and authority statements",
          "Sales and purchases to VAT or transaction summaries where relevant",
          "Payroll records to employer declarations and year-end submissions",
        ],
      },
      {
        heading: "Make adjustments reviewable",
        paragraphs: [
          "Each adjustment should have a description, amount, source, tax treatment, supporting evidence and reviewer conclusion. Grouping adjustments into broad unexplained totals makes review slower and weakens the audit trail.",
          "Keep unresolved matters on a visible query list. Record who must answer, the evidence required, the deadline and the impact if the point remains open.",
        ],
      },
      {
        heading: "Separate preparation, approval and filing",
        paragraphs: [
          "A complete working file should produce a clear review pack: draft return, reconciliations, material adjustments, outstanding matters, payment position and approval evidence. Filing should occur only after the responsible person and client have approved the final position where required.",
          "This routine makes the deadline the final control point rather than the first time the file is assembled. It also makes later queries, audits and repeat periods materially easier to manage.",
        ],
      },
    ],
  },
];

export function getFieldNote(slug: string) {
  return fieldNotes.find((note) => note.slug === slug);
}
