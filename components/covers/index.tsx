import type { ArticleCover } from "@/content/articleIndex";
import type { Locale } from "@/lib/i18n";
import { BusinessCover } from "./BusinessCover";
import { EnergyCover } from "./EnergyCover";
import { McpCover } from "./McpCover";
import { PhaseoneCover } from "./PhaseoneCover";
import { PlatformCover } from "./PlatformCover";
import { UserAugmentationCover } from "./UserAugmentationCover";
import { WeakSignalCover } from "./WeakSignalCover";

const covers: Record<ArticleCover, (props: { lang: Locale }) => React.JSX.Element> = {
  energy: EnergyCover,
  mcp: McpCover,
  phaseone: PhaseoneCover,
  platform: PlatformCover,
  business: BusinessCover,
  "user-augmentation": UserAugmentationCover,
  "weak-signal": WeakSignalCover,
};

/** The illustrated cover of an article; fills its (positioned) parent. */
export function Cover({ cover, lang }: { cover: ArticleCover; lang: Locale }) {
  const Illustration = covers[cover];
  return <Illustration lang={lang} />;
}
