const adjectives: string[] = [
    "enigmatic",
    "beautiful",
    "happy",
    "splendid",
    "mysterious",
    "gorgeous",
    "joyful",
    "exquisite",
    "radiant",
    "wondrous",
    "serene",
    "delightful",
    "blissful",
    "captivating",
    "vibrant",
    "magnificent",
    "elegant",
    "cheerful",
    "majestic",
    "charming",
];

const listenerNouns: { noun: string; weight: number }[] = [
    { noun: "guide", weight: 3 },
    { noun: "counselor", weight: 2 },
    { noun: "listener", weight: 2 },
    { noun: "supporter", weight: 2 },
    { noun: "mentor", weight: 2 },
    { noun: "adviser", weight: 2 },
    { noun: "ally", weight: 2 },
    { noun: "companion", weight: 2 },
    { noun: "helper", weight: 2 },
    { noun: "confidant", weight: 2 },
    { noun: "healer", weight: 2 },
    { noun: "facilitator", weight: 2 },
    { noun: "comforter", weight: 2 },
    { noun: "nurturer", weight: 2 },
    { noun: "presence", weight: 1 },
    { noun: "empathizer", weight: 1 },
    { noun: "coach", weight: 1 },
    { noun: "practitioner", weight: 1 },
    { noun: "advocate", weight: 1 },
    { noun: "partner", weight: 1 },
];

const personSharingNouns: { noun: string; weight: number }[] = [
    { noun: "expressor", weight: 2 },
    { noun: "communicator", weight: 3 },
    { noun: "sharer", weight: 2 },
    { noun: "venter", weight: 2 },
    { noun: "seeker", weight: 2 },
    { noun: "storyteller", weight: 2 },
    { noun: "opener", weight: 2 },
    { noun: "discloser", weight: 2 },
    { noun: "articulator", weight: 2 },
    { noun: "confider", weight: 2 },
    { noun: "soul", weight: 1 },
    { noun: "champion", weight: 1 },
    { noun: "heart-sharer", weight: 1 },
    { noun: "discoverer", weight: 1 },
    { noun: "sharer", weight: 1 },
    { noun: "truthseeker", weight: 1 },
    { noun: "explorer", weight: 1 },
    { noun: "being", weight: 1 },
    { noun: "opener", weight: 1 },
    { noun: "reflectionist", weight: 1 },
];

function generateRandomPair(adjectives: string[], nouns: { noun: string; weight: number }[]): string {
    const totalWeight = nouns.reduce((sum, noun) => sum + noun.weight, 0);
    let randomWeight = Math.random() * totalWeight;

    for (const noun of nouns) {
        randomWeight -= noun.weight;
        if (randomWeight <= 0) {
            const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
            return `${randomAdjective} ${noun.noun}`;
        }
    }

    // This should not happen, but if it does, fallback to a simple random selection
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)].noun;
    return `${randomAdjective} ${randomNoun}`;
}

export function generateRandomListener(): string {
    return generateRandomPair(adjectives, listenerNouns);
}

export function generateRandomPersonSharing(): string {
    return generateRandomPair(adjectives, personSharingNouns);
}