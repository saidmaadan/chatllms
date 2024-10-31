"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Model } from "@/lib/types";

export const models: Model[] = [
  { id: "anthropic/claude-3-sonnet", name: "Claude 3 Sonnet" },
  { id: "anthropic/claude-3-haiku", name: "Claude 3 Haiku" },
  { id: "anthropic/claude-2", name: "Claude 2" },
  { id: "openai/gpt-4", name: "GPT-4" },
  { id: "openai/gpt-4-turbo", name: "GPT-4 Turbo" },
  { id: "openai/gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
  { id: "google/gemini-pro", name: "Gemini Pro" },
  { id: "google/gemini-1.5-pro", name: "Gemini 1.5 Pro" },
  { id: "mistral/mistral-tiny", name: "Mistral Tiny" },
  { id: "mistral/mistral-small", name: "Mistral Small" },
  { id: "mistral/mistral-medium", name: "Mistral Medium" },
  { id: "meta-llama/llama-2-70b-chat", name: "Llama 2 70B" },
  { id: "meta-llama/llama-2-13b-chat", name: "Llama 2 13B" },
  { id: "gryphe/mythical-destroyer", name: "Mythical Destroyer" },
  { id: "nousresearch/nous-hermes-2-mixtral", name: "Nous Hermes 2" },
];

interface ModelSelectorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function ModelSelector({ value, onChange, placeholder = "Select a model" }: ModelSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {models.map((model) => (
          <SelectItem key={model.id} value={model.id}>
            {model.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}