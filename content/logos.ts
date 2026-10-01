/**
 * Technology logos shown in the hero's stacked badges, three at a time.
 * The list is a ring: each click on the stack moves three logos forward,
 * so every brand shows up in turn. Files live in /public/logos/<id>.svg.
 *
 * Sources: Simple Icons (Snowflake, Databricks, Claude, Datadog, Google, in
 * brand colours) and Wikimedia Commons (ServiceNow, Salesforce, AWS, Azure,
 * OpenAI).
 * All are trademarks of their owners. `wide` gives long wordmarks more room.
 */
export type Logo = { id: string; name: string; wide?: boolean };

export const logos: Logo[] = [
  { id: "snowflake", name: "Snowflake" },
  { id: "servicenow", name: "ServiceNow", wide: true },
  { id: "salesforce", name: "Salesforce" },
  { id: "databricks", name: "Databricks" },
  { id: "aws", name: "AWS" },
  { id: "azure", name: "Microsoft Azure" },
  { id: "google", name: "Google" },
  { id: "openai", name: "OpenAI" },
  { id: "claude", name: "Claude" },
  { id: "datadog", name: "Datadog" },
];

/** The three logos shown at a given position in the ring. */
export const logoWindow = (start: number) => [0, 1, 2].map((i) => logos[(start + i) % logos.length]);
