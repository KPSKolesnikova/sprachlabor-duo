export type Stage = "A1.1" | "A1.2" | "A2.1" | "A2.2";
export type Examples = [[german: string, russian: string], [german: string, russian: string], [german: string, russian: string]];
export type Check = [prompt: string, answer: string, wrong: string, other: string, feedback: string];
export type Unit = {
  id: string;
  title: string;
  goal: string;
  why: string;
  how: string;
  examples: Examples;
  error: string;
  transfer: string;
  video: string;
  watch: string;
  checks: [Check, Check, Check];
};
export type Module = { title: string; target: string; units: Unit[] };
export type StagePlan = { id: Stage; title: string; outcome: string; modules: Module[] };

export function unit(
  id: string, title: string, goal: string, video: string, watch: string,
  why: string, how: string, examples: Examples, error: string, transfer: string,
  ...checks: [Check, Check, Check]
): Unit {
  return { id, title, goal, video, watch, why, how, examples, error, transfer, checks };
}
