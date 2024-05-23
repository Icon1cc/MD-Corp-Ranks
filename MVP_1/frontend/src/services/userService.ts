const backendUrlAndPort = "http://localhost:8080";

const checkUserStatus = async (): Promise<{ userId: string; reviewAlreadyGiven: boolean; success: boolean }> => {
  try {
    const response = await fetch(`${backendUrlAndPort}/api/register`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return { userId: '', reviewAlreadyGiven: false, success: false };
    }

    const data = await response.json();
    return { ...data, success: true };
  } catch (error) {
    console.error(error);
    return { userId: '', reviewAlreadyGiven: false, success: false };
  }
};

export default {
  checkUserStatus,
};
