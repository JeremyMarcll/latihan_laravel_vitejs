import "../css/app.css";
import "./bootstrap";

import axios from "axios"; // ← Tambahkan
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";

// ==========================
// FIX CSRF & CREDENTIALS
// ==========================
axios.defaults.withCredentials = true;

const token = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute("content");

if (token) {
    axios.defaults.headers.common["X-CSRF-TOKEN"] = token;
}
// ==========================

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./pages/**/*.jsx", { eager: true });
        return pages[`./pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
