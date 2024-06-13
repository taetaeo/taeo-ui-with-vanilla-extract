import { useEffect, useRef } from "react";

type Callback = () => void | undefined;

export default function useClickOutSide<T extends HTMLElement, U>(callback: Callback = () => {}, update: U | null) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node | null)) {
        callback();
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [update]);

  return ref;
}
