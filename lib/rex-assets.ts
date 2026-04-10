/** Chemins publics des assets Rex (sprites découpés dans /public/rex/) */
export type RexPose = "neutral" | "celebrate" | "thinking" | "sad" | "point";

export const REX_IMAGE: Record<RexPose, string> = {
  neutral: "/rex/rex-neutral.png",
  celebrate: "/rex/rex-celebrate.png",
  thinking: "/rex/rex-thinking.png",
  sad: "/rex/rex-sad.png",
  point: "/rex/rex-point.png",
};

export const REX_LOGO = "/rex/rex-logo.png";
