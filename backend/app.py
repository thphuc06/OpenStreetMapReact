from flask import Flask, request, jsonify
from flask_cors import CORS
from deep_translator import GoogleTranslator
from huggingface_hub import InferenceClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Tạo Flask app
app = Flask(__name__)

# Enable CORS cho tất cả routes
CORS(app)

# Tạo Hugging Face client cho chatbot
hf_api_key = os.getenv('HUGGINGFACE_API_KEY', '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')
hf_client = InferenceClient(api_key=hf_api_key)

# System prompt cho chuyên gia cafe
CAFE_EXPERT_PROMPT = """Bạn là chuyên gia tư vấn cafe chuyên nghiệp với nhiều năm kinh nghiệm.
Bạn có kiến thức sâu về các loại hạt cafe, phương pháp pha chế, nguồn gốc cafe, và văn hóa cafe.
Hãy trả lời câu hỏi một cách thân thiện, chuyên nghiệp và chi tiết.
Nếu câu hỏi không liên quan đến cafe, hãy lịch sự chuyển hướng về chủ đề cafe."""

# Route chính - Home page
@app.route('/')
def home():
    return jsonify({
        "message": "Coffee Expert Chatbot API is running!",
        "endpoints": {
            "chatbot": "POST /api/chatbot - Coffee expert chatbot",
            "translate": "POST /api/translate - Translation service"
        }
    })

# Route chatbot - Chuyên gia cafe
@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    try:
        data = request.get_json()

        # Kiểm tra có message không
        if not data or 'message' not in data:
            return jsonify({"error": "Missing 'message' field"}), 400

        user_message = data['message']
        conversation_history = data.get('history', [])

        # Tạo messages cho API
        messages = [{"role": "system", "content": CAFE_EXPERT_PROMPT}]

        # Thêm lịch sử hội thoại nếu có
        for msg in conversation_history:
            messages.append({
                "role": msg.get("role", "user"),
                "content": msg.get("content", "")
            })

        # Thêm message hiện tại
        messages.append({"role": "user", "content": user_message})

        # Gọi Hugging Face API
        completion = hf_client.chat.completions.create(
            model="meta-llama/Llama-3.2-1B-Instruct",
            messages=messages,
            max_tokens=500,
            temperature=0.7
        )

        bot_response = completion.choices[0].message.content

        return jsonify({
            "success": True,
            "message": bot_response
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Xin lỗi, tôi đang gặp sự cố. Vui lòng thử lại."
        }), 500

# Route dịch văn bản - EN to VI
@app.route('/api/translate', methods=['POST'])
def translate():
    try:
        # Lấy data từ request
        data = request.get_json()

        # Kiểm tra có text không
        if not data or 'text' not in data:
            return jsonify({"error": "Missing 'text' field"}), 400

        text = data['text']
        source_lang = data.get('source', 'en')  # Mặc định là English
        target_lang = data.get('target', 'vi')  # Mặc định là Vietnamese

        # Dịch bằng Google Translate (deep-translator)
        translated_text = GoogleTranslator(source=source_lang, target=target_lang).translate(text)

        return jsonify({
            "success": True,
            "original": text,
            "translated": translated_text,
            "source": source_lang,
            "target": target_lang
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

# Main function - chạy server
if __name__ == '__main__':
    # Lấy port từ environment hoặc dùng 8080    
    port = int(os.getenv('PORT', 8080))

    print("=" * 50)
    print(f"🚀 Flask Translation API đang chạy!")
    print(f"📍 Port: {port}")
    print(f"🌐 URL: http://localhost:{port}")
    print(f"📝 API: http://localhost:{port}/api/translate")
    print("=" * 50)

    # Chạy app
    app.run(
        host='0.0.0.0',
        port=port,
        debug=True
    )