import { useSyncExternalStore } from "react"

// Valor guardado en localStorage que varios componentes leen a la vez.
// Se sincroniza entre pestañas con el evento "storage" y, en el servidor,
// devuelve siempre `fallback` para que la hidratación no falle.
export function createLocalStore<T>(
  key: string,
  fallback: T,
  parse: (raw: unknown) => T,
) {
  let cache: T | undefined
  const listeners = new Set<() => void>()

  const read = (): T => {
    if (cache !== undefined) return cache
    try {
      const raw = window.localStorage.getItem(key)
      cache = raw === null ? fallback : parse(JSON.parse(raw))
    } catch {
      cache = fallback
    }
    return cache
  }

  const notify = () => listeners.forEach((listener) => listener())

  const onStorage = (event: StorageEvent) => {
    if (event.key !== key && event.key !== null) return
    cache = undefined
    notify()
  }

  const subscribe = (listener: () => void) => {
    if (listeners.size === 0) window.addEventListener("storage", onStorage)
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
      if (listeners.size === 0) window.removeEventListener("storage", onStorage)
    }
  }

  const set = (update: T | ((prev: T) => T)) => {
    const next =
      typeof update === "function" ? (update as (prev: T) => T)(read()) : update
    cache = next
    try {
      window.localStorage.setItem(key, JSON.stringify(next))
    } catch {
      // Modo privado o cuota llena: el valor vive solo en memoria.
    }
    notify()
  }

  // Definido aquí y no inline en `useValue`: el React Compiler sacaba la
  // flecha a nivel de módulo, fuera del alcance de `fallback`.
  const readServer = () => fallback

  const useValue = () => useSyncExternalStore(subscribe, read, readServer)

  return { useValue, set, get: read }
}

const noopSubscribe = () => () => {}

// false durante el render del servidor y la hidratación; true después.
// Evita enseñar "carrito vacío" un instante antes de leer localStorage.
export const useHydrated = () =>
  useSyncExternalStore(noopSubscribe, () => true, () => false)
