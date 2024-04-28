const backendUrlAndPort = "http://localhost:8080";

export async function trackReviewSubmission(): Promise<{ success: boolean }> {
    try {
        const response = await fetch(`${backendUrlAndPort}/api/reviews`, {
            method: 'POST',
            credentials: 'include'
        });
        if (response.ok) {
            console.log('Review submission tracked successfully.');
            return { success: true };
        } else {
            console.error('Failed to track review submission with status:', response.status);
            return { success: false };
        }
    } catch (error) {
        console.error('Error tracking review submission:', error);
        return { success: false };
    }
}

export async function subscribeToEmail(email: string): Promise<{ success: boolean }> {
    try {
        const response = await fetch(`${backendUrlAndPort}/api/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
            credentials: 'include',
        });

        if (response.ok) {
            console.log('Email subscription successful.');
            return { success: true };
        } else {
            console.error('Failed to subscribe email with status:', response.status);
            return { success: false };
        }
    } catch (error) {
        console.error('Error subscribing email:', error);
        return { success: false };
    }
}