"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { fetchModels, selectModel } from "../../../store/models/modelsSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useEffect } from "react";
import { Skeleton } from "@/shared/ui/skeleton";
import { Check, ChevronDown } from "lucide-react";

export const ChatBoxHeader = () => {
  const dispatch = useAppDispatch();
  const { models, loading } = useAppSelector((state) => state.models);
  const selectedModel = models.find((model) => model.isSelected);

  useEffect(() => {
    dispatch(fetchModels());
  }, [dispatch]);

  if (loading === "pending") {
    return (
      <Skeleton className="ml-3 h-[32px] w-[85px] rounded-sm bg-gray-500" />
    );
  }
  if (loading === "failed") {
    return <div className="text-red-500">Unable to load LLM&apos;s</div>;
  }

  if (loading === "succeeded") {
    return (
      <div className="ml-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-sm hover:bg-gray-500 px-1 py-1 hover:cursor-pointer">
            <div className="flex">
              {selectedModel?.name ?? "Model is not selected"}
              <ChevronDown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-black">
            <DropdownMenuLabel>Models</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {models.map((model) => (
              <DropdownMenuItem
                key={model.name}
                className="rounded-sm hover:bg-gray-500 px-1 py-1 hover:cursor-pointer"
                onClick={() =>
                  dispatch(
                    selectModel({
                      name: model.name,
                    })
                  )
                }
              >
                <button className="hover:cursor-pointer flex">
                  {model.name}{" "}
                  {model.isSelected ? (
                    <Check
                      className="ml-1 pt-1"
                      strokeWidth={5}
                      absoluteStrokeWidth
                    />
                  ) : (
                    ""
                  )}
                </button>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
};
