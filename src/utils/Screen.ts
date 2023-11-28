export const HashRoute = (route: string) => {
    return location.hash = `#${route.toLowerCase()}`;
}

export const matchesRoute = (route: string) => {
    return (location.hash == `#${route.toLowerCase()}`);
}