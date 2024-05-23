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

const getTotalScore = async (): Promise<string> => {
  try {
    const response = await fetch(`${backendUrlAndPort}/api/reviews`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return '';
    }

    const data = await response.json();
    return data.totalScore;
  } catch (error) {
    console.error('Error getting total score:', error);
    return '';
  }
};

export const sendFarewell = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${backendUrlAndPort}/api/farewells`, {
      method: 'POST',
      credentials: 'include',
    });
    return response.ok;
  } catch (error) {
    console.error('Error during farewell:', error);
    return false;
  }
};

export const setupBeforeUnloadListener = () => {
  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = '';
    sendFarewell();
  };

  window.addEventListener('beforeunload', handleBeforeUnload);

  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
};

export default {
  checkUserStatus,
  getTotalScore,
  sendFarewell,
  setupBeforeUnloadListener,
};
