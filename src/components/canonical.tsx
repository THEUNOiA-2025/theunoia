import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Canonical: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    let link: HTMLLinkElement | null = document.querySelector(
      "link[rel='canonical']"
    );

    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }

    link.setAttribute(
      "href",
      window.location.origin + location.pathname
    );
  }, [location]);

  return null;
};

export default Canonical;
