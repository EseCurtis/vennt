export const HashRoute = (route: string) => {
    return location.hash = `#${route.toLowerCase()}`;
}