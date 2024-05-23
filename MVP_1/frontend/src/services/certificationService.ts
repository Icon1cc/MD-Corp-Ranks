const backendUrlAndPort = "http://localhost:8080";

const logCertificationAccess = async (): Promise<{ success: boolean }> => {
  try {
    const response = await fetch(`${backendUrlAndPort}/api/detail_requests`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
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
  logCertificationAccess,
};
