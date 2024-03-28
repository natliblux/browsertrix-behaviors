import { FacebookTimelineBehavior } from "./facebook";
import { InstagramPostsBehavior } from "./instagram";
import { TelegramBehavior } from "./telegram";
import { TwitterTimelineBehavior } from "./twitter";
import { WoodeeFlipbookBehavior } from "./woodee.js";
import { TikTokBehavior } from "./tiktok.js";

const siteBehaviors = [
  InstagramPostsBehavior,
  TwitterTimelineBehavior,
  FacebookTimelineBehavior,
  TelegramBehavior,
  WoodeeFlipbookBehavior,
  TikTokBehavior
];

export default siteBehaviors;