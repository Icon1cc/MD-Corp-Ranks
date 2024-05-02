// const backendUrlAndPort = "http://localhost:8080";

// export const fetchQuestions = async (): Promise<{ questions: { id: number; title: string; subtitle: string }[] }> => {
//   try {
//     const response = await fetch(`${backendUrlAndPort}/api/questions`, {
//       method: 'GET',
//       credentials: 'include',
//     });

//     if (!response.ok) {
//       console.error('Failed to fetch questions with status:', response.status);
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data; 
//   } catch (error) {
//     console.error('Error fetching questions:', error);
//     throw error;
//   }
// };

// export default {
//   fetchQuestions
// };


// This mock simulates fetching questions from an API
const mockQuestions = {
  questions: [
    {
      id: 1,
      title: "Company goals",
      subtitle: "The company has clear long-term objectives",
    },
    {
      id: 2,
      title: "Work Environment",
      subtitle: "The work setting promotes employee productivity",
    },
    {
      id: 3,
      title: "Management Support",
      subtitle: "Managers regularly support and review employee work",
    },
    {
      id: 4,
      title: "Employee Benefits",
      subtitle: "The company offers competitive employee benefits",
    },
    {
      id: 5,
      title: "Career Development",
      subtitle: "There are ample opportunities for personal growth and career development",
    }
  ]
};

// Simulate network delay
export const fetchQuestions = (): Promise<{ questions: { id: number; title: string; subtitle: string }[] }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.9) {
        resolve(mockQuestions);
      } else {
        reject("Failed to fetch questions: Network error");
      }
    }, 1000);
  });
};

export default {
  fetchQuestions
};
