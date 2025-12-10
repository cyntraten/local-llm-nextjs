"use client";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { Button } from "../button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Label } from "../label";
import { TemperatureSlider } from "./temperature-slider";
import { profileSettingsSchema, TProfileSettings } from "../forms/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SystemPromptTextarea } from "./system-prompt-textarea";

export function ProfileSettings({ children }: React.PropsWithChildren) {
  const [open, setOpen] = useState(false);

  const form = useForm<TProfileSettings>({
    resolver: zodResolver(profileSettingsSchema),
    defaultValues: {
      temperature: 0.5,
      systemPrompt: "",
    },
  });

  useEffect(() => {
    if (open) {
      const fetchSettings = async () => {
        try {
          const res = await fetch("/api/profile/settings");
          if (!res.ok) throw new Error("Failed to fetch settings");
          const data = await res.json();

          form.reset({
            temperature: data.temperature ?? 0.5,
            systemPrompt: data.systemPrompt ?? "",
          });
        } catch (e) {
          console.error("Failed to load profile settings: ", e);
        }
      };

      fetchSettings();
    }
  }, [form, open]);

  const onSubmit = async (data: TProfileSettings) => {
    try {
      const res = await fetch("/api/profile/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("[UPDATE_PROFILE] fetch error");
      }

      setOpen(false);
    } catch (e) {
      console.error("Update profile error: ", e);
    }
  };

  return (
    <div className="w-full">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <FormProvider {...form}>
          <DialogContent className="sm:max-w-[425px] bg-black">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Profile settings</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3 mt-3">
                  <Label htmlFor="systemPrompt">System Prompt</Label>
                  <SystemPromptTextarea
                    value={form.watch("systemPrompt")}
                    onChange={(e) =>
                      form.setValue("systemPrompt", e.target.value)
                    }
                    maxRows={6}
                    placeholder="Enter system prompt"
                  />
                </div>
                <div className="grid gap-3 mt-3">
                  <Label htmlFor="temperature">Temperature</Label>
                  <Controller
                    control={form.control}
                    name="temperature"
                    render={({ field }) => (
                      <TemperatureSlider
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button variant={"secondary"} type="submit">
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </FormProvider>
      </Dialog>
    </div>
  );
}
