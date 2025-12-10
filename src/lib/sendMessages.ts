export function buildPromptWithSystem(
  userSystemPrompt: string | null | undefined,
  userPrompt: string
): string {
  if (userSystemPrompt?.trim()) {
    return `${userSystemPrompt} ${userPrompt}`;
  }
  return userPrompt;
}
