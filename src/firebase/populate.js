import { faker } from "@faker-js/faker";
import { createPost } from "./helpers";

const users = [
  "taylor@gmail.com",
  "cmchoi220@gmail.com",
  "annie@gmail.com",
  "angeline@gmail.com",
  "gayatri@gmail.com",
];

export function createRandomPosts(amount) {
  for (let i = 0; i < amount; i++) {
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
