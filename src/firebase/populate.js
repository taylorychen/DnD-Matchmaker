import { faker } from "@faker-js/faker";
import { createPost } from "./helpers";

const users = [
  "taylor@gmail.com",
  "cmchoi220@gmail.com",
  "annie@gmail.com",
  "angeline@gmail.com",
  "gayatri@gmail.com",
];

/**
 * creates random posts in the database
 * @param {number} number number of posts to create
 */
export function createRandomPosts(number) {
  for (let i = 0; i < number; i++) {
    const randomNum = Math.floor(Math.random() * users.length);
    const owner = users[randomNum];
    const title = `${faker.word.adjective()} game`;
    const description = faker.lorem.sentences();
    const location = faker.address.cityName();
    const maxPlayers = Math.floor(Math.random() * 15) + 1;
    const tags = [];
    for (let j = 0; j < Math.floor(Math.random() * 5); j++) {
      tags.push(faker.word.adjective());
    }
    createPost(owner, title, description, tags, location, maxPlayers);
  }
}
