import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE, getSeoForPath } from "../data/seo.js";
import { projects } from "../data/projects.js";
 
/* ─── head helpers ──────────────────────────────────────────── */
 
const upsertMeta = (attr, key, content) => {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};
 
const upsertLink = (rel, href) => {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};
 
/* One managed <script> node, replaced on every navigation. The static
   Organization + WebSite graph in index.html is left alone. */
const upsertJsonLd = (data) => {
  const ID = "page-jsonld";
  document.getElementById(ID)?.remove();
  if (!data) return;
 
  const el = document.createElement("script");
  el.type = "application/ld+json";
  el.id = ID;
  el.textContent = JSON.stringify(data);
  document.head.appendChild(el);
};
 
/* ─── per-page structured data ──────────────────────────────── */
 
const buildJsonLd = (seo, url) => {
  if (seo.noindex) return null;
 
  if (seo.service) {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      name: seo.service,
      description: seo.description,
      url,
      serviceType: seo.service,
      provider: { "@id": `${SITE.url}/#organization` },
      areaServed: { "@type": "Place", name: "Worldwide" },
    };
  }
 
  if (seo.project) {
    return {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: seo.project.name,
      description: seo.project.summary,
      url,
      dateCreated: seo.project.year,
      creator: { "@id": `${SITE.url}/#organization` },
    };
  }
 
  return null;
};
 
/* ─── component ─────────────────────────────────────────────── */
 
const Seo = () => {
  const { pathname } = useLocation();
 
  useEffect(() => {
    const seo = getSeoForPath(pathname, projects);
    const url = `${SITE.url}${seo.canonicalPath}`;
    const image = `${SITE.url}${SITE.ogImage}`;
 
    document.title = seo.title;
 
    upsertMeta("name", "description", seo.description);
    upsertMeta(
      "name",
      "robots",
      seo.noindex ? "noindex, follow" : "index, follow, max-image-preview:large",
    );
    upsertLink("canonical", url);
 
    upsertMeta("property", "og:type", seo.project ? "article" : "website");
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:title", seo.title);
    upsertMeta("property", "og:description", seo.description);
    upsertMeta("property", "og:image", image);
 
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", seo.title);
    upsertMeta("name", "twitter:description", seo.description);
    upsertMeta("name", "twitter:image", image);
 
    upsertJsonLd(buildJsonLd(seo, url));
  }, [pathname]);
 
  return null;
};
 
export default Seo;
 