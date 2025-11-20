/**
 * Returns a greeting based on the current time of day
 * 06:00-10:00: Jó reggelt
 * 10:00-12:00: Jó napot
 * 12:00-17:00: Jó délutánt
 * 17:00-06:00: Jó estét
 */
export const getTimeBasedGreeting = (): string => {
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 10) {
        return "Jó reggelt, már hiányoztál.";
    } else if (hour >= 10 && hour < 12) {
        return "Jó napot, már hiányoztál.";
    } else if (hour >= 12 && hour < 17) {
        return "Jó délutánt, már hiányoztál.";
    } else {
        return "Jó estét, már hiányoztál.";
    }
};
