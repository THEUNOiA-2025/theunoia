// /components/SEO/SEOManager.tsx

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { seoConfig } from "./seoConfig";

const BASE_URL = "https://www.theunoia.com";

export function SEOManager() {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname.replace(/\/$/, "") || "/";

    const cleanPath = pathname === "/" ? "" : pathname;
    const canonicalUrl = `${BASE_URL}${cleanPath}`;

    /* =========================
       CANONICAL
    ========================== */

    let canonical = document.querySelector(
      "link[rel='canonical']"
    ) as HTMLLinkElement | null;

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", canonicalUrl);

    /* =========================
       TITLE + DESCRIPTION
    ========================== */

    let seo = seoConfig[pathname];

    // Dynamic blog fallback
    if (!seo && pathname.startsWith("/blog/")) {
      seo = {
        title: "UNOIA Blog",
        description:
          "Read insights, freelancing tips and startup strategies from UNOIA.",
      };
    }

    // Global fallback
    if (!seo) {
      seo = {
        title: "UNOIA – Freelance Marketplace",
        description:
          "UNOIA connects businesses with skilled student freelancers across multiple domains.",
      };
    }

    document.title = seo.title;

    let metaDescription = document.querySelector(
      "meta[name='description']"
    ) as HTMLMetaElement | null;

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }

    metaDescription.setAttribute("content", seo.description);
  }, [location.pathname]);

  return null;
}