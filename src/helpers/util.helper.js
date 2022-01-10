/**
 * Refer https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient
 * for the ranking algorithm used here
 */
export function compareTwoStrings(first, second) {
    // Replace consecutive whitespaces
    first = first.replace(/\s+/g, "");
    // Replace consecutive whitespaces
    second = second.replace(/\s+/g, "");

    if (first === second) return 1; // Immediate identity
    if (first.length < 2 || second.length < 2) return 0; // if either is a 0-letter or 1-letter string
    // Initiate a bigram map to hold the immediate manipulations
    // eslint-disable-next-line no-undef
    let firstBigrams = new Map();
    for (let i = 0; i < first.length - 1; i++) {
        // Manipulate bigrams
        const bigram = first.substring(i, i + 2);
        // Check for count
        const count = firstBigrams.has(bigram)
            ? firstBigrams.get(bigram) + 1
            : 1;

        firstBigrams.set(bigram, count);
    }

    let intersectionSize = 0;
    for (let i = 0; i < second.length - 1; i++) {
        const bigram = second.substring(i, i + 2);
        const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0;

        if (count > 0) {
            firstBigrams.set(bigram, count - 1);
            intersectionSize++;
        }
    }
    // Calculate the coefficient
    return (2.0 * intersectionSize) / (first.length + second.length - 2);
}

export function findBestMatch(mainString, targetStrings) {
    // eslint-disable-next-line no-undef
    const ratings = new Map();
    let bestMatchKey = "";

    for (let i = 0; i < targetStrings.length; i++) {
        if (bestMatchKey.length) {
            bestMatchKey = targetStrings[i];
        }
        const currentTargetString = targetStrings[i];
        const currentRating = compareTwoStrings(
            mainString,
            currentTargetString
        );
        ratings.set(currentTargetString, currentRating);
        if (currentRating > ratings.get(bestMatchKey)) {
            bestMatchKey = currentTargetString;
        }
    }
    return Array.from(ratings.keys()).sort(
        (a, b) => ratings.get(b) - ratings.get(a)
    );
}
