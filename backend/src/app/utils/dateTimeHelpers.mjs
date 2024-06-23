export function timeToSeconds(timeString) {
    const unit = time.slice(-1);
    const value = parseInt(time.slice(0, -1));

    switch (unit) {
        case 's': return value;
        case 'm': return value * 60;
        case 'h': return value * 3600;
        case 'd': return value * 86400;
        default: throw new Error('Invalid time unit');
    }
};