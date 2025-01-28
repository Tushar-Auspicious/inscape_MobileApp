const songsDownloaded = [
  {
    id: "1",
    title: "Lion's breath",
    duration: "02:27 min",
    level: "Beginner",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/5075/aee1/4a4a32584307fd3265238217290ea6d0?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GrL8u8ZFdzsGKnIFGrlo2Ysb76HxVe4cLT6tdEDXRC8SS5Mj4uHxS8R8eODjAxM6rz7U4ToyvqSsPL4Rs2yITcT4Vpw9SZ5taFTFYkLZBhyitXKvdoAlZHeVziG2S8tfIhnTOfaM21bKJr40zhe91bRdD1OPJp4oHYQgKff9Zdq9veYfeIKW2xpZojU25S-5er~ibkNBjKhiz~voGbtpJb4VXGWBWpdlCF2m-ZUy75c3ShJvRzSk4qhbY9VrrI~kX7aUJ-lQwIdk6xjQdmz472OpCmUGkWe8sXyuzMhxm~UGDx~iNlNVmlKIOFeJEtp~CUovb~nrMaoTlrfKf4bMQw__", // Replace with actual image URL
  },
  {
    id: "2",
    title: "Sitali breath",
    duration: "11 min",
    level: "Beginner",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/400d/861a/100901d40d386ebc86e1ba1808f025c8?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lJT7PWdE5qGpw1TXV1I5AS0QMXutBnkLQAh250FgzhDUWoPh5369OJGzYlXC2~rI5AbkzHadDIY9CXYO1arIhUFGbJZeRSL533knfz8kUQWNTTYhiG6ReZh1NUhpRE2TuipeJbrsGbwarvTSIIGCGVtFTkfwKZ1W0O4HbuwtCsSrcHtEXALm9t~elbjMfqR7kQUegQVOoTGnIqPgJOfgxLNDedtcB99rnb8LgIl~HB-h-ZMNHvv5axLw7NiJyVgHhJWVyCMdOiuvR1Gih-L67Slrt5UDG6PsoGu3kwyuLJbyRXFpqEb4RvtJyqULbHvaYJn~MpD6atCpyN6H34QnMQ__", // Replace with actual image URL
  },
  {
    id: "3",
    title: "Diaphragmatic breathing",
    duration: "02:00 min",
    level: "Intermediate",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/7ad5/d22d/1577c913655d7edcf2a349274cc7c991?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QDZHwbSvTKGMakFz6WV9SDKn03guEYXOuBnAe1n4fkKbtfxaVPA1m9HvSGS6frh2ehZo3i2Z-xpjnEv01avqxNvkEM8wfITzQ3RNdOkR9rSdx0vOpL-Y3F3vSf6~hAQwJBe7Jn1ktXfEdToL75VB8jF5SH0RxZy9x5Uk4rx1x8buQq3V-ilFg3lGpMuLZ5K-AqS-vRrCFGrjCoASKKnHSIERnCqFscYHqPWJhVGxiJjZtzz7TKheM~95y2q7Vo7IzG0veaOFfuFBQ9EaZrAZlR1bEWjC7ElyOXREbTel9O~fYzW1CExxifOsXgA2uMu-ONHp-WvVulpQgvAufp3QbA__", // Replace with actual image URL
  },
  {
    id: "4",
    title: "Sitali breath",
    duration: "11 min",
    level: "Beginner",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/5075/aee1/4a4a32584307fd3265238217290ea6d0?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GrL8u8ZFdzsGKnIFGrlo2Ysb76HxVe4cLT6tdEDXRC8SS5Mj4uHxS8R8eODjAxM6rz7U4ToyvqSsPL4Rs2yITcT4Vpw9SZ5taFTFYkLZBhyitXKvdoAlZHeVziG2S8tfIhnTOfaM21bKJr40zhe91bRdD1OPJp4oHYQgKff9Zdq9veYfeIKW2xpZojU25S-5er~ibkNBjKhiz~voGbtpJb4VXGWBWpdlCF2m-ZUy75c3ShJvRzSk4qhbY9VrrI~kX7aUJ-lQwIdk6xjQdmz472OpCmUGkWe8sXyuzMhxm~UGDx~iNlNVmlKIOFeJEtp~CUovb~nrMaoTlrfKf4bMQw__", // Replace with actual image URL
  },
  {
    id: "5",
    title: "Diaphragmatic breathing",
    duration: "02:00 min",
    level: "Intermediate",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/400d/861a/100901d40d386ebc86e1ba1808f025c8?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lJT7PWdE5qGpw1TXV1I5AS0QMXutBnkLQAh250FgzhDUWoPh5369OJGzYlXC2~rI5AbkzHadDIY9CXYO1arIhUFGbJZeRSL533knfz8kUQWNTTYhiG6ReZh1NUhpRE2TuipeJbrsGbwarvTSIIGCGVtFTkfwKZ1W0O4HbuwtCsSrcHtEXALm9t~elbjMfqR7kQUegQVOoTGnIqPgJOfgxLNDedtcB99rnb8LgIl~HB-h-ZMNHvv5axLw7NiJyVgHhJWVyCMdOiuvR1Gih-L67Slrt5UDG6PsoGu3kwyuLJbyRXFpqEb4RvtJyqULbHvaYJn~MpD6atCpyN6H34QnMQ__", // Replace with actual image URL
  },
  {
    id: "6",
    title: "Lion's breath",
    duration: "02:27 min",
    level: "Beginner",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/5075/aee1/4a4a32584307fd3265238217290ea6d0?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GrL8u8ZFdzsGKnIFGrlo2Ysb76HxVe4cLT6tdEDXRC8SS5Mj4uHxS8R8eODjAxM6rz7U4ToyvqSsPL4Rs2yITcT4Vpw9SZ5taFTFYkLZBhyitXKvdoAlZHeVziG2S8tfIhnTOfaM21bKJr40zhe91bRdD1OPJp4oHYQgKff9Zdq9veYfeIKW2xpZojU25S-5er~ibkNBjKhiz~voGbtpJb4VXGWBWpdlCF2m-ZUy75c3ShJvRzSk4qhbY9VrrI~kX7aUJ-lQwIdk6xjQdmz472OpCmUGkWe8sXyuzMhxm~UGDx~iNlNVmlKIOFeJEtp~CUovb~nrMaoTlrfKf4bMQw__", // Replace with actual image URL
  },
  {
    id: "7",
    title: "Diaphragmatic breathing",
    duration: "02:00 min",
    level: "Intermediate",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/7ad5/d22d/1577c913655d7edcf2a349274cc7c991?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QDZHwbSvTKGMakFz6WV9SDKn03guEYXOuBnAe1n4fkKbtfxaVPA1m9HvSGS6frh2ehZo3i2Z-xpjnEv01avqxNvkEM8wfITzQ3RNdOkR9rSdx0vOpL-Y3F3vSf6~hAQwJBe7Jn1ktXfEdToL75VB8jF5SH0RxZy9x5Uk4rx1x8buQq3V-ilFg3lGpMuLZ5K-AqS-vRrCFGrjCoASKKnHSIERnCqFscYHqPWJhVGxiJjZtzz7TKheM~95y2q7Vo7IzG0veaOFfuFBQ9EaZrAZlR1bEWjC7ElyOXREbTel9O~fYzW1CExxifOsXgA2uMu-ONHp-WvVulpQgvAufp3QbA__", // Replace with actual image URL
  },
  {
    id: "8",
    title: "Sitali breath",
    duration: "11 min",
    level: "Beginner",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/5075/aee1/4a4a32584307fd3265238217290ea6d0?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GrL8u8ZFdzsGKnIFGrlo2Ysb76HxVe4cLT6tdEDXRC8SS5Mj4uHxS8R8eODjAxM6rz7U4ToyvqSsPL4Rs2yITcT4Vpw9SZ5taFTFYkLZBhyitXKvdoAlZHeVziG2S8tfIhnTOfaM21bKJr40zhe91bRdD1OPJp4oHYQgKff9Zdq9veYfeIKW2xpZojU25S-5er~ibkNBjKhiz~voGbtpJb4VXGWBWpdlCF2m-ZUy75c3ShJvRzSk4qhbY9VrrI~kX7aUJ-lQwIdk6xjQdmz472OpCmUGkWe8sXyuzMhxm~UGDx~iNlNVmlKIOFeJEtp~CUovb~nrMaoTlrfKf4bMQw__", // Replace with actual image URL
  },
  {
    id: "9",
    title: "Diaphragmatic breathing",
    duration: "02:00 min",
    level: "Intermediate",
    imageUrl:
      "https://s3-alpha-sig.figma.com/img/400d/861a/100901d40d386ebc86e1ba1808f025c8?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lJT7PWdE5qGpw1TXV1I5AS0QMXutBnkLQAh250FgzhDUWoPh5369OJGzYlXC2~rI5AbkzHadDIY9CXYO1arIhUFGbJZeRSL533knfz8kUQWNTTYhiG6ReZh1NUhpRE2TuipeJbrsGbwarvTSIIGCGVtFTkfwKZ1W0O4HbuwtCsSrcHtEXALm9t~elbjMfqR7kQUegQVOoTGnIqPgJOfgxLNDedtcB99rnb8LgIl~HB-h-ZMNHvv5axLw7NiJyVgHhJWVyCMdOiuvR1Gih-L67Slrt5UDG6PsoGu3kwyuLJbyRXFpqEb4RvtJyqULbHvaYJn~MpD6atCpyN6H34QnMQ__", // Replace with actual image URL
  },
];

export default songsDownloaded;
