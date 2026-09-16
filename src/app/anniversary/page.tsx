import { AnniversaryScroll, type AnniversaryContent } from "@/components/AnniversaryScroll";

const content: AnniversaryContent = {
  title: "Seven Months",
  dateLine: "16 September 2026",
  // Day counter is computed from this. Adjust to your true start date.
  startDate: "2026-02-16",
  opening: "My love,",
  track: "/anniversary/theme.mp3",
  signOff: "Akachukwu",
  ps: "P.S. I kept every one of these. Scroll slowly. I want you to see what I see.",
  // Drop your files in public/anniversary/ using these exact names.
  // Photos: photo-1.jpg ... ; videos: video-1.mp4 ... (poster optional).
  // Until a file exists, its frame shows a soft placeholder. Edit captions freely,
  // add or remove entries as you like, and set type:"video" for clips.
  media: [
    { type: "image", src: "/anniversary/photo-1.jpg", caption: "the day it began", rotate: -3 },
    { type: "image", src: "/anniversary/photo-2.jpg", caption: "your favourite laugh", rotate: 2.5 },
    { type: "video", src: "/anniversary/video-1.mp4", caption: "this one, on loop", rotate: -1.5 },
    { type: "image", src: "/anniversary/photo-3.jpg", caption: "us, unposed", rotate: 2 },
    { type: "video", src: "/anniversary/video-2.mp4", caption: "your laugh, with sound", rotate: 3 },
  ],
  paragraphs: [
    "Seven months ago you let me love you, and I have spent every day since quietly astonished that you said yes. It is not a long time, as the world measures time. But I have lived more inside these seven months than I did in whole years before you.",

    "I did not fall for you in one grand moment. I fell in the small ones. The ordinary mornings. The way you say my name when you are half asleep. The thousand tiny things no photograph can hold and no song can quite say.",

    "This has not been an easy season for you, and still you have been the most alive thing in my life. You have carried so much, for your sister, for your family, for the future you are fighting to build, and somehow you still kept a hand free to hold mine. I will never take that for granted.",

    "So today I am not going to write you anything heavy. Today I only want to say thank you. Thank you for choosing me again on the ordinary days, when choosing is not romantic and is simply a decision you make with your whole tired heart.",

    "Look at these with me. Look at how young we still are in them, and how much has already happened behind those smiles. This is us. This is the beginning of a very long story, and I intend to be here for the whole of it.",

    "Seven months.",

    "And I would sign for seven hundred more without once reading the fine print.",

    "I love you the way I breathe now. Without thinking about it, and without the option to stop.",

    "Happy anniversary, my love. Here is to us, and to every quiet morning still to come.",
  ],
};

export default function AnniversaryPage() {
  return <AnniversaryScroll {...content} />;
}
