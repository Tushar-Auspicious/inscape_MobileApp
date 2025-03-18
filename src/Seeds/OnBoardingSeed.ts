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
    title: "REDUCE YOUR STRESS",
    subtitle:
      "Reduce your stress by simply listening to our guided meditations.",
  },
  {
    id: "2",
    image: IMAGES.slide2,
    title: "QUIET YOUR MIND",
    subtitle: "Learn how to calm that overactive mind and find stillness.",
  },
  {
    id: "3",
    image: IMAGES.slide3,
    title: "FOR WORK",
    subtitle:
      "Acquire skills to make your time at work more productive and successful.",
  },
  {
    id: "4",
    image: IMAGES.slide1,
    title: "LIVE BETTER.",
    subtitle: "Find the secrets in our meditations to a better life.",
  },
];

export default OnBoardingSlides;
