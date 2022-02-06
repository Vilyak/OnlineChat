function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
}

export function getShortDescription(description: string) {
    return description.length >= 185 ? `${description.substring(0, 184)} ...` : description;
}