import { reactive, type UnwrapNestedRefs } from "vue";

export function useLocalStorage<T>(key: string, defaultValue: T[] = []) {
  const data = reactive<T[]>(defaultValue);

  function load() {
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored) as UnwrapNestedRefs<T[]>;
      data.length = 0;
      data.push(...parsed);
    }
  }

  function save() {
    localStorage.setItem(key, JSON.stringify(data));
    location.reload();
  }

  load();

  return {
    data: data as UnwrapNestedRefs<T[]>,
    save,
    load,
  };
}
