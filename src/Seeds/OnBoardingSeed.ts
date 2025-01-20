import IMAGES from "../Assets/images";

export type SlideType = {
  id: string;
  image: any;
  title: string;
  subtitle: string;
};

const OnBoardingSlides: SlideType[] = [
  {
    id: "1",
    image: IMAGES.slide1,
    title: "STRESS LESS.",
    subtitle: "Make mindfulness a daily habit and be kind to your mind.",
  },
  {
    id: "2",
    image: IMAGES.slide2,
    title: "RELAX MORE.",
    subtitle: "Unwind and find serenity in a guided meditation sessions",
  },
  {
    id: "3",
    image: IMAGES.slide3,
    title: "STRESS LESS.",
    subtitle: "Calm racing mind and prepare your body for deep sleep.",
  },
  {
    id: "4",
    image: IMAGES.slide1,
    title: "LIVE BETTER.",
    subtitle: "Invest in personal sense of inner peace and balance.",
  },
];

export default OnBoardingSlides;
