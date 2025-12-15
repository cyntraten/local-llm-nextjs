import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AiModel {
  name: string;
  isSelected: boolean;
  id: number;
}

interface ModelsState {
  models: AiModel[];
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: ModelsState = {
  models: [],
  loading: "idle",
};
export type SelectModelPayload = Pick<AiModel, "name">;

export const fetchModels = createAsyncThunk("models/fetchModels", async () => {
  const res = await fetch("/api/models");
  const models = await res.json();
  const modelsData: AiModel[] = models.data.map(
    (model: AiModel, index: number) => {
      return {
        name: model.id,
        isSelected: index === 0,
      };
    }
  );
  return modelsData;
});

export const modelsSlice = createSlice({
  name: "models",
  initialState,
  reducers: {
    selectModel: (state, action: PayloadAction<SelectModelPayload>) => {
      state.models.forEach((model) => {
        model.isSelected = model.name === action.payload.name;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchModels.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchModels.fulfilled, (state, action) => {
        state.models = action.payload;
        state.loading = "succeeded";
      })
      .addCase(fetchModels.rejected, (state) => {
        state.loading = "failed";
      });
  },
});

export const { selectModel } = modelsSlice.actions;
export default modelsSlice.reducer;
