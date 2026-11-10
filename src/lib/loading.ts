"use client";

import { useEffect, useState } from "react";

export type ReadyKey = "fonts" | "scene" | "bird" | "map";

interface GlobalState {
  readyKeys: Set<ReadyKey>;
  loaded: boolean;
  calmMode: boolean;
  autoFly: boolean;
}

const state: GlobalState = {
  readyKeys: new Set<ReadyKey>(),
  loaded: false,
  calmMode: false, // Default OFF per spec
  autoFly: false,
};

const listeners = new Set<() => void>();

function emit() {
  for (const fn of listeners) fn();
}

export function markReady(key: ReadyKey) {
  if (!state.readyKeys.has(key)) {
    state.readyKeys.add(key);
    emit();
  }
}

export function setLoaded() {
  if (!state.loaded) {
    state.loaded = true;
    emit();
  }
}

export function setCalmMode(next: boolean) {
  state.calmMode = next;
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("calm-mode", next);
  }
  emit();
}

export function setAutoFly(next: boolean) {
  state.autoFly = next;
  emit();
}

export function useAppStore() {
  const [, setTick] = useState(0);
  useEffect(() => {
    const sub = () => setTick((t) => t + 1);
    listeners.add(sub);
    return () => {
      listeners.delete(sub);
    };
  }, []);
  return {
    readyKeys: state.readyKeys,
    loaded: state.loaded,
    calmMode: state.calmMode,
    autoFly: state.autoFly,
  };
}
