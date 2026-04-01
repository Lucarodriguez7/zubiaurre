// useFavorites.js — favoritos con localStorage, sin backend
import { useState, useEffect, useCallback } from "react";

const KEY = "re_favorites";

function readFavs() {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
  catch { return []; }
}

export function useFavorites() {
  const [favs, setFavs] = useState(readFavs);

  // Sync across tabs
  useEffect(() => {
    const fn = () => setFavs(readFavs());
    window.addEventListener("storage", fn);
    return () => window.removeEventListener("storage", fn);
  }, []);

  const toggle = useCallback((id) => {
    setFavs((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isFav     = useCallback((id) => favs.includes(id), [favs]);
  const clearAll  = useCallback(() => { localStorage.removeItem(KEY); setFavs([]); }, []);
  const count     = favs.length;

  return { favs, toggle, isFav, clearAll, count };
}
