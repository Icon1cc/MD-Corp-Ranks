const backendUrlAndPort = "http://localhost:8080";

export const submitCompany = async (companyName: string): Promise<{ success: boolean, message?: string }> => {
    try {
        const response = await fetch(`${backendUrlAndPort}/api/companies`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ companyName })
        });

        if (response.ok) {
            console.log('Company submission successful.');
            return { success: true };
        } else {
            const errorData = await response.json();
            console.error('Failed to submit company with status:', response.status, errorData.message);
            return { success: false, message: errorData.message || 'Failed to submit company.' };
        }
    } catch (error) {
        console.error('Error submitting company:', error);
        return { success: false, message: 'Network error or server is unreachable.' };
    }
};

export default submitCompany;