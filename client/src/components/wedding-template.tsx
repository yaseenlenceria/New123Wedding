import { type ThemeConfig } from "@/lib/themes";
import type { Order } from "@shared/schema";
import TemplateSageGreen from "./templates/TemplateSageGreen";
import TemplateOldMoney from "./templates/TemplateOldMoney";
import TemplateMinimalist from "./templates/TemplateMinimalist";
import TemplateLuxuryGold from "./templates/TemplateLuxuryGold";
import TemplateBotanical from "./templates/TemplateBotanical";

export default function WeddingTemplate({ order, theme }: { order: Order; theme: ThemeConfig }) {
  switch (theme.id) {
    case "sage_green":
      return <TemplateSageGreen order={order} theme={theme} />;
    case "old_money":
      return <TemplateOldMoney order={order} theme={theme} />;
    case "minimalist":
      return <TemplateMinimalist order={order} theme={theme} />;
    case "luxury_gold":
      return <TemplateLuxuryGold order={order} theme={theme} />;
    case "botanical":
      return <TemplateBotanical order={order} theme={theme} />;
    default:
      return <TemplateSageGreen order={order} theme={theme} />;
  }
}
