import { defineTool } from "@nekuda/webmcp-sdk";

export type PrepareFstMeetingRequestInput = {
  name: string;
  email: string;
  organisation?: string;
  start: string;
  duration: 30 | 60;
  context?: string;
};

export type BookingToolBindings = {
  prepare(input: PrepareFstMeetingRequestInput): Promise<unknown>;
};

let activeBindings: BookingToolBindings | undefined;

export function attachBookingToolBindings(bindings: BookingToolBindings) {
  activeBindings = bindings;
  return () => {
    if (activeBindings === bindings) activeBindings = undefined;
  };
}

export const prepareFstMeetingRequestTool = defineTool<PrepareFstMeetingRequestInput>({
  stableKey: "fst.booking.prepare",
  name: "prepare_fst_meeting_request",
  title: "Prepare an FST meeting request",
  description: "Fill FST's booking form with proposed meeting details and bring it into view. Use only when a visitor wants to review an appointment request; returns the prepared values and validation notes. It does not create a calendar event or send invitations—the visitor must review consent and submit the form.",
  inputSchema: {
    type: "object",
    properties: {
      name: { type: "string", minLength: 1, maxLength: 120, description: "Visitor name to place in the form." },
      email: { type: "string", format: "email", maxLength: 254, description: "Business email to place in the form." },
      organisation: { type: "string", maxLength: 160, description: "Optional organisation or project." },
      start: { type: "string", pattern: "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}$", description: "Requested local start in YYYY-MM-DDTHH:mm form." },
      duration: { type: "integer", enum: [30, 60], description: "Meeting length in minutes." },
      context: { type: "string", maxLength: 3000, description: "Optional non-confidential meeting context." },
    },
    required: ["name", "email", "start", "duration"],
    additionalProperties: false,
  },
  annotations: { readOnlyHint: false, untrustedContentHint: true },
  async execute(input) {
    if (!activeBindings) throw new Error("the FST booking form is not currently available on this page");
    return activeBindings.prepare(input);
  },
});
