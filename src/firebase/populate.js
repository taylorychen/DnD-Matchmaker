import { faker } from "@faker-js/faker";
import { createPost } from "./helpers";

const users = [
    "tchen073@gmail.com",
    "cmchoi220@gmail.com",
    "annietran04@g.ucla.edu",
    "agx191@g.ucla.edu",
    "gpuppala@g.ucla.edu",
];

const locations = [
    "Wooden Games Lounge",
    "Sunset Rec",
    "Olympic Hall Lounge",
    "Reiber Court Lounge",
    "Sproul Hall Lounge",
    "Covel Commons",
    "Royce Hall 154",
    "Janss Steps",
    "123 Kelton",
    "4567 Strathmore",
    "ACM Clubhouse",
    "Ackerman Bruin Fun Zone",
];

const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * creates random posts in the database
 * @param {number} number number of posts to create
 */
export function createRandomPosts(number) {
    for (let i = 0; i < number; i++) {
        const owner = users[Math.floor(Math.random() * users.length)];
        const title = `A ${capitalize(faker.word.adjective())} Game`;
        const description = faker.lorem.sentences();
        const location =
            locations[Math.floor(Math.random() * locations.length)];
        const maxPlayers = Math.floor(Math.random() * 14) + 2;

        // tags
        const t_campaign = Math.random() < 0.5;
        const t_homebrew = Math.random() < 0.5;
        const t_looseRules = Math.random() < 0.5;
        const t_oneShot = Math.random() < 0.5;
        const t_preWritten = Math.random() < 0.5;
        createPost(
            owner,
            title,
            description,
            t_looseRules,
            t_oneShot,
            t_campaign,
            t_homebrew,
            t_preWritten,
            location,
            maxPlayers
        );
    }
}
