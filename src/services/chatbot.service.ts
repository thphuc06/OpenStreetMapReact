interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatbotRequest {
  message: string;
  history?: Message[];
}

interface ChatbotResponse {
  success: boolean;
  message?: string;
  error?: string;
  timestamp?: number;
}

class ChatbotService {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:8080') {
    this.baseUrl = baseUrl;
  }

  async sendMessage(
    message: string,
    history: Message[] = []
  ): Promise<ChatbotResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/chatbot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          history: history.slice(-6), // Chỉ gửi 6 messages gần nhất
        } as ChatbotRequest),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ChatbotResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Chatbot service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Xin lỗi, tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau.',
      };
    }
  }

  setBaseUrl(url: string) {
    this.baseUrl = url;
  }
}

export const chatbotService = new ChatbotService(
  import.meta.env.VITE_API_URL || 'http://localhost:8080'
);

export default chatbotService;
