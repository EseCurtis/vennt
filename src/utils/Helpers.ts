export function sortMessagesByTimestamp(recieved: any[], sent: any[]) {
    const messages = [...recieved, ...sent];
    return messages.slice().sort((a:any, b:any) => a.timestamp - b.timestamp);
}