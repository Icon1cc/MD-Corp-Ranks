const backendUrlAndPort = "http://localhost:8080";

const savePreferences = async (userId: string, identityPreference: string, reviewPreference: string): Promise<{ success: boolean }> => {
  try {
    const response = await fetch(`${backendUrlAndPort}/api/preferences`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        identityPreference,
        reviewPreference,
      }),
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

export default {
  savePreferences,
};
