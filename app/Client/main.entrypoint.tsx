import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";

console.log("added page");

createInertiaApp({
  resolve: (name) => {
    // @ts-ignore
    const pages = import.meta.glob("../../client/pages/**/*.tsx", {
      eager: true,
    });
    return pages[`../../client/pages/${name}.tsx`];
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});
