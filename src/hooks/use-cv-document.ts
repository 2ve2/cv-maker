import { useEffect, useState, useCallback } from 'react'
import { type CVDocument, emptyCV } from '@/types/cv'

const STORAGE_KEY = 'cv_maker_current'

export function useCVDocument() {
  const [doc, setDoc] = useState<CVDocument>(() => {
    if (typeof window === 'undefined') return emptyCV();
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...emptyCV(), ...JSON.parse(raw) };
    } catch {
      return;
    }
    return emptyCV();
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(doc));
    } catch {
      return;
    }
  }, [doc])

  const update = useCallback((updater: (d: CVDocument) => CVDocument) => {
    setDoc((prev) => updater(prev));
  }, [])

  const reset = useCallback(() => setDoc(emptyCV()), []);

  return { doc, setDoc, update, reset }
}
