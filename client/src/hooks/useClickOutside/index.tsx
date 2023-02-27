import { useEffect, RefObject } from "react";

type Event = MouseEvent | TouchEvent;

const useClickOutside = (
  refs: RefObject<HTMLElement>[],
  handler: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      for (let ref of refs) {
        const el = ref?.current;
        if (!el || el.contains((event?.target as Node) || null)) {
          return;
        }
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [refs, handler]);
};

export default useClickOutside;
