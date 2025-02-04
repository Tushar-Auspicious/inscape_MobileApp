const TrendingData: {
  title: string;
  rating: string;
  duration: string;
  imageUrl: string;
  type: "default" | "potrait";
}[] = [
  {
    title: "Exploring the Ocean",
    rating: "4.7",
    duration: "15 min",
    imageUrl:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG11c2ljfGVufDB8fDB8fHww",
    type: "potrait",
  },
  {
    title: "Mountain Adventures",
    rating: "4.9",
    duration: "20 min",
    imageUrl:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG11c2ljfGVufDB8fDB8fHww",
    type: "potrait",
  },
  {
    title: "Stargazing Wonders",
    rating: "4.8",
    duration: "18 min",
    imageUrl:
      "https://media.istockphoto.com/id/1319479588/photo/the-musicians-were-playing-rock-music-on-stage-there-was-an-audience-full-of-people-watching.webp?a=1&b=1&s=612x612&w=0&k=20&c=8OHDcUxBaGcMsaEwYaDFGXLGbylCnM-mTkS6Rzl0_ZM=",
    type: "potrait",
  },
  {
    title: "City Lights",
    rating: "4.6",
    duration: "10 min",
    imageUrl:
      "https://media.istockphoto.com/id/1974638266/photo/white-paper-with-musical-notes-closeup-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=fuwwHeBZ0zVklZ6dJIOH-2_gwn7yv_r2uvRCO_1TJHA=",
    type: "potrait",
  },
];

const breathingSessions = [
  {
    id: "1",
    title: "Lion’s breath",
    duration: "02:27 min",
    level: "Beginner",
    url: "https://samplelib.com/lib/preview/mp3/sample-15s.mp3",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fG11c2ljfGVufDB8fDB8fHww",
  },
  {
    id: "2",
    title: "Sitali breath",
    duration: "11 min",
    level: "Beginner",
    url: "https://samplelib.com/lib/preview/mp3/sample-6s.mp3",
    imageUrl:
      "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG11c2ljfGVufDB8fDB8fHww",
  },
  {
    id: "3",
    title: "Diaphragmatic breathing",
    duration: "02:00 min",
    level: "Intermediate",
    url: "https://samplelib.com/lib/preview/mp3/sample-9s.mp3",
    imageUrl:
      "https://images.unsplash.com/photo-1477233534935-f5e6fe7c1159?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fG11c2ljfGVufDB8fDB8fHww",
  },
];

export { TrendingData, breathingSessions };
