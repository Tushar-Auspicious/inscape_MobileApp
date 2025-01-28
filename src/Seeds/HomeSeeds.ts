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
      "https://s3-alpha-sig.figma.com/img/e5fd/9b8f/20ff5d446b26c16b91a905d48458240c?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=URoEJTBuRS2ure3sokcvixGrlsK3Tn~nIw5VZDFp-iI3Gu~E4Pie7ltimdu4UR7g-SUiRcXksvWm~sMYu-i0tYHV3WWnHO1bh5Ufe9Y6f7RohV0B41KMRnW8lVdddVZzySPCiJn4-W30FJLlhtP7tFv04s8FbBCdRHdQ2yqUcGhgcjxLMrdO5okRS5fzofchOjqJler8amxvHm7vOiWHoeNPkGTierBIx4c3RZKnuPGrprVPhjb7UF1G1q-oA38zHmf2uRQUtjAYJAtZVJH35yGV9j2PvybOZudr0x6os8YvkZ47NQFHNBR8BRG6a1rxQr9zJrTSqKY4Q3~g4SzrMg__",
    type: "potrait",
  },
  {
    title: "Mountain Adventures",
    rating: "4.9",
    duration: "20 min",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/7c6b/c0a8/ade6e1210718545efeb8991165767c81?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TcNqYe3gt89mXIXvl511l6upao1wGT8ZkUmSBEMlO-mvnHidQKL~2jtLNG5oWnkQTGoZQMsN5kqHj-Ffr6xEZdAT62aVdcQeAnPQvjkUCMVxUUihkGfNZojozoeXYev1HGVnW9GzGKHGNiNqbBVhFD6ktxmOs8vqT1aMV8ZAHlVJd~-58Y9X21rn~nV74jrQRkop6DxbylMuMa03XifC5HrvBeaXZ0qwpSO7N-QGYYnDdNFMMjeb04nZ7h9fRtthaBNk61AHfitlXTf8mRY4SFG3RiiGVV4lOieZ6JhCb-r2wp3cVleKIVsZLdMv9UswUCYfEL9B-uFdToStWNut5w__",
    type: "potrait",
  },
  {
    title: "Stargazing Wonders",
    rating: "4.8",
    duration: "18 min",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/4ee4/101f/0aefe60e15d8315db07fb95c1fbc17c9?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=da-8bpZ5erV2WRfTtHduM8SQqrV44r~Jo7ZFzt2~mRaoFuxHUDclV5XBY-fsPqOpUSucWuLF5LTB6fHeWuyfkYwdFtp0BhwQQoLwRSYc3vXt44jG8yAxOGO4fTZEXgpBuDAjb8UZisrWMIEIGHy36Nvubhio2hJ2qazNsqrwqcjLIjWbctpwvR8mHh~E3QfUQ-pOb5hrdGWsISgJmZmOE8mQOB-O8PjvQXFji62-a9u76DjXRiPEs1TR85cPL2RRNoG06tkgTaG0Xg0ng~iopYyBqxRirI~uzjVO-ZjfQiSo-QwQxk1OahPNlQnh6UJg-516z~Txel8mqOmKuxrRWw__",
    type: "potrait",
  },
  {
    title: "City Lights",
    rating: "4.6",
    duration: "10 min",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/e5fd/9b8f/20ff5d446b26c16b91a905d48458240c?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=URoEJTBuRS2ure3sokcvixGrlsK3Tn~nIw5VZDFp-iI3Gu~E4Pie7ltimdu4UR7g-SUiRcXksvWm~sMYu-i0tYHV3WWnHO1bh5Ufe9Y6f7RohV0B41KMRnW8lVdddVZzySPCiJn4-W30FJLlhtP7tFv04s8FbBCdRHdQ2yqUcGhgcjxLMrdO5okRS5fzofchOjqJler8amxvHm7vOiWHoeNPkGTierBIx4c3RZKnuPGrprVPhjb7UF1G1q-oA38zHmf2uRQUtjAYJAtZVJH35yGV9j2PvybOZudr0x6os8YvkZ47NQFHNBR8BRG6a1rxQr9zJrTSqKY4Q3~g4SzrMg__",
    type: "potrait",
  },
];

const breathingSessions = [
  {
    id: "1",
    title: "Lion’s breath",
    duration: "02:27 min",
    level: "Beginner",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/5075/aee1/4a4a32584307fd3265238217290ea6d0?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GrL8u8ZFdzsGKnIFGrlo2Ysb76HxVe4cLT6tdEDXRC8SS5Mj4uHxS8R8eODjAxM6rz7U4ToyvqSsPL4Rs2yITcT4Vpw9SZ5taFTFYkLZBhyitXKvdoAlZHeVziG2S8tfIhnTOfaM21bKJr40zhe91bRdD1OPJp4oHYQgKff9Zdq9veYfeIKW2xpZojU25S-5er~ibkNBjKhiz~voGbtpJb4VXGWBWpdlCF2m-ZUy75c3ShJvRzSk4qhbY9VrrI~kX7aUJ-lQwIdk6xjQdmz472OpCmUGkWe8sXyuzMhxm~UGDx~iNlNVmlKIOFeJEtp~CUovb~nrMaoTlrfKf4bMQw__", // Replace with an actual image URL
  },
  {
    id: "2",
    title: "Sitali breath",
    duration: "11 min",
    level: "Beginner",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/400d/861a/100901d40d386ebc86e1ba1808f025c8?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lJT7PWdE5qGpw1TXV1I5AS0QMXutBnkLQAh250FgzhDUWoPh5369OJGzYlXC2~rI5AbkzHadDIY9CXYO1arIhUFGbJZeRSL533knfz8kUQWNTTYhiG6ReZh1NUhpRE2TuipeJbrsGbwarvTSIIGCGVtFTkfwKZ1W0O4HbuwtCsSrcHtEXALm9t~elbjMfqR7kQUegQVOoTGnIqPgJOfgxLNDedtcB99rnb8LgIl~HB-h-ZMNHvv5axLw7NiJyVgHhJWVyCMdOiuvR1Gih-L67Slrt5UDG6PsoGu3kwyuLJbyRXFpqEb4RvtJyqULbHvaYJn~MpD6atCpyN6H34QnMQ__", // Replace with an actual image URL
  },
  {
    id: "3",
    title: "Diaphragmatic breathing",
    duration: "02:00 min",
    level: "Intermediate",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/7ad5/d22d/1577c913655d7edcf2a349274cc7c991?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QDZHwbSvTKGMakFz6WV9SDKn03guEYXOuBnAe1n4fkKbtfxaVPA1m9HvSGS6frh2ehZo3i2Z-xpjnEv01avqxNvkEM8wfITzQ3RNdOkR9rSdx0vOpL-Y3F3vSf6~hAQwJBe7Jn1ktXfEdToL75VB8jF5SH0RxZy9x5Uk4rx1x8buQq3V-ilFg3lGpMuLZ5K-AqS-vRrCFGrjCoASKKnHSIERnCqFscYHqPWJhVGxiJjZtzz7TKheM~95y2q7Vo7IzG0veaOFfuFBQ9EaZrAZlR1bEWjC7ElyOXREbTel9O~fYzW1CExxifOsXgA2uMu-ONHp-WvVulpQgvAufp3QbA__", // Replace with an actual image URL
  },
];

export { TrendingData, breathingSessions };
