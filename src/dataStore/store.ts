import { ref, type Ref } from "vue";

type store = {
  instrument: string | null;
  interval: string | null;
  dataLoading: boolean;
};

export const store: Ref<store> = ref({
  instrument: null,
  interval: null,
  dataLoading: false,
});
