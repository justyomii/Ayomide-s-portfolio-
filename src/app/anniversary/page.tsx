import { AnniversaryScroll, type AnniversaryContent } from "@/components/AnniversaryScroll";

const content: AnniversaryContent = {
  title: "Seven Months",
  dateLine: "16 September 2026",
  // Day counter is computed from this. Adjust to your true start date.
  startDate: "2026-02-16",
  opening: "Ẹ káàárọ̀, ìyàwó mi ẹlẹ́wà, arẹwà mi.",
  track: "/anniversary/theme.mp3",
  signOff: "Akachukwu",
  ps: "P.S. Scroll down slowly. I kept a few of us.",
  // Curated from the "yomi" folder, web-optimized. Captions are yours to edit.
  media: [
    { type: "image", src: "/anniversary/photo-1.jpg", caption: "the two of us", rotate: -3 },
    { type: "image", src: "/anniversary/photo-2.jpg", caption: "this smile", rotate: 2.5 },
    { type: "video", src: "/anniversary/video-1.mp4", poster: "/anniversary/video-1.jpg", caption: "us, being ridiculous", rotate: -2 },
    { type: "image", src: "/anniversary/photo-3.jpg", caption: "us", rotate: 3 },
    { type: "image", src: "/anniversary/photo-4.jpg", caption: "my favourite person", rotate: -2 },
    { type: "video", src: "/anniversary/video-2.mp4", poster: "/anniversary/video-2.jpg", caption: "your laugh", rotate: 2 },
    { type: "image", src: "/anniversary/photo-5.jpg", caption: "just us", rotate: -3 },
    { type: "image", src: "/anniversary/photo-6.jpg", caption: "that face I love", rotate: 2 },
    { type: "video", src: "/anniversary/video-3.mp4", poster: "/anniversary/video-3.jpg", caption: "you, unfiltered", rotate: -1.5 },
    { type: "image", src: "/anniversary/photo-7.jpg", caption: "caught you", rotate: 3 },
    { type: "image", src: "/anniversary/photo-8.jpg", caption: "me, waiting for you", rotate: -2.5 },
    { type: "video", src: "/anniversary/video-4.mp4", poster: "/anniversary/video-4.jpg", caption: "a whole minute of us", rotate: 2 },
    { type: "image", src: "/anniversary/photo-9.jpg", caption: "sunshine", rotate: -3 },
    { type: "image", src: "/anniversary/photo-10.jpg", caption: "ours", rotate: 2.5 },
    { type: "video", src: "/anniversary/video-5.mp4", poster: "/anniversary/video-5.jpg", caption: "coming to me", rotate: -2 },
    { type: "image", src: "/anniversary/photo-11.jpg", caption: "you and me", rotate: 3 },
    { type: "image", src: "/anniversary/photo-12.jpg", caption: "good morning, you", rotate: -2 },
    { type: "image", src: "/anniversary/photo-13.jpg", caption: "my whole heart", rotate: 2 },
    { type: "image", src: "/anniversary/photo-14.jpg", caption: "my favourite view", rotate: -3 },
    { type: "image", src: "/anniversary/photo-15.jpg", caption: "an ordinary day, made better", rotate: 2.5 },
  ],
  paragraphs: [
    "Yes, I said wife. Seven months in and I already know how this one ends, so I stopped pretending otherwise a long time ago.",

    "An Igbo boy learning to greet you in Yoruba every morning. That is us, Yomi. You rearranged my whole life so gently that I never felt it happen, until one day I could not picture a single morning without you in it.",

    "This season has asked so much of you, and you keep meeting it with that stubborn, praying, beautiful heart. I see every bit of it. I am not going anywhere.",

    "So I made you a small corner of the internet that belongs to no one but us. A few of our moments, a song I am still choosing, and a man who is completely and permanently yours.",

    "Happy seven months, my love. To us, and to every ordinary morning still on its way.",
  ],
};

export default function AnniversaryPage() {
  return <AnniversaryScroll {...content} />;
}
