const backendUrlAndPort = "http://localhost:8080";

export const fetchQuestions = async (): Promise<{ questions: { id: number; title: string; subtitle: string }[] }> => {
  try {
    const response = await fetch(`${backendUrlAndPort}/api/questions`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      console.error('Failed to fetch questions with status:', response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

export const submitRating = async (questionId: number, rating: number): Promise<void> => {
  try {
    const response = await fetch(`${backendUrlAndPort}/api/questions/${questionId}/ratings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating }),
      credentials: 'include',
    });

    if (!response.ok) {
      console.error('Failed to submit rating with status:', response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error submitting rating:', error);
    throw error;
  }
};

export default {
  fetchQuestions,
  submitRating
};
