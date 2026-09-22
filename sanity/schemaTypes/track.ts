export const trackSchema = {
  name: "track",
  title: "Discography Track",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Track Title" },
    { name: "album", type: "string", title: "Album / Single Name" },
    { name: "releaseDate", type: "date", title: "Release Date" },
    { name: "duration", type: "number", title: "Duration in Seconds" },
    { name: "audioFile", type: "file", title: "Audio File (MP3/WAV)" },
    {
      name: "coverArt",
      type: "image",
      title: "Cover Art",
      options: { hotspot: true },
    },
    { name: "youtubeId", type: "string", title: "YouTube MV ID" },
    {
      name: "lyrics",
      type: "array",
      title: "Synchronized Lyrics",
      of: [
        {
          type: "object",
          fields: [
            { name: "time", type: "number", title: "Time in seconds (e.g. 14.5)" },
            { name: "text", type: "string", title: "Lyric Text" },
            { name: "speaker", type: "string", title: "Member / Speaker" },
            { name: "romanization", type: "string", title: "Romanized Lyric" },
            { name: "translation", type: "string", title: "English/Indo Translation" },
          ],
        },
      ],
    },
  ],
};
