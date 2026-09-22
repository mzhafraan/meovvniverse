export const liveScheduleSchema = {
  name: "liveSchedule",
  title: "Live Schedule",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Broadcast Title" },
    {
      name: "platform",
      type: "string",
      title: "Platform",
      options: {
        list: [
          { title: "CHURRRR", value: "CHURRRR" },
          { title: "YouTube Live", value: "YouTube Live" },
          { title: "Instagram Live", value: "Instagram Live" },
          { title: "Special", value: "Special" },
        ],
      },
    },
    { name: "scheduledAt", type: "string", title: "Scheduled Date & Time String" },
    { name: "isLive", type: "boolean", title: "Is Currently Live?" },
    {
      name: "memberNames",
      type: "array",
      of: [{ type: "string" }],
      title: "Participating Members",
    },
    { name: "streamUrl", type: "url", title: "Stream Link" },
    {
      name: "bannerImage",
      type: "image",
      title: "Banner Thumbnail",
      options: { hotspot: true },
    },
    { name: "tagline", type: "text", title: "Event Brief / Tagline" },
  ],
};
