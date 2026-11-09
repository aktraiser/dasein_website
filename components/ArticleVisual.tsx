import Image from "next/image";
import type { ArticleCover } from "@/content/articleIndex";
import type { Locale } from "@/lib/i18n";

/** Shared editorial images: homepage, journal and article use the same cover. */
const photos: Record<ArticleCover, string> = {
  midterms: "/articles/midterms/texas-capitol.jpg",
  ratelimit: "/images/editorial/ratelimit-collage.webp",
  "weak-signal": "/images/editorial/weak-signal-collage.webp",
  phaseone: "/images/editorial/phaseone-collage.webp",
  mcp: "/images/editorial/mcp-collage.webp",
  semantic: "/images/editorial/semantic-collage.webp",
  platform: "/images/editorial/platform-collage.webp",
  business: "/images/editorial/business-collage.webp",
  "user-augmentation": "/images/editorial/user-augmentation-collage.webp",
  gigawatt: "/articles/megawatt/ashburn-aerial.jpg",
  energy: "/articles/megawatt/datacenter-roof.jpg",
};

export function ArticleVisual({ cover, large = false }: { cover: ArticleCover; lang: Locale; large?: boolean }) {
  const photo = photos[cover];
  return <Image className={photo.includes("/editorial/") ? "article-visual--collage" : undefined} src={photo} alt="" fill sizes={large ? "(max-width: 1200px) 95vw, 1200px" : "(max-width: 699px) 90vw, (max-width: 1099px) 45vw, 30vw"} />;
}
