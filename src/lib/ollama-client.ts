import { Ollama } from "ollama";

const ollamaClient = new Ollama({
  host: process.env.LLM_HOST || "http://ollama:11434",
});

export { ollamaClient };
