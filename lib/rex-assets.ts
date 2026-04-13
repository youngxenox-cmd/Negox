/** PNG dans `public/rex/` — mascotte seule ; le script `crop-rex-sheet.py` peut régénérer depuis `rex-sheet.png` */
export type RexPose = "neutral" | "celebrate" | "thinking" | "sad" | "point";

export const REX_IMAGE: Record<RexPose, string> = {
  neutral: "/rex/rex-neutral.png",
  celebrate: "/rex/rex-celebrate.png",
  thinking: "/rex/rex-thinking.png",
  sad: "/rex/rex-sad.png",
  point: "/rex/rex-point.png",
};

export const REX_LOGO = "/rex/rex-logo.png";
