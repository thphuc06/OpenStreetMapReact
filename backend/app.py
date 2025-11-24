from flask import Flask, request, jsonify
from flask_cors import CORS
from googletrans import Translator
import os

# Tạo Flask app
app = Flask(__name__)

# Enable CORS cho tất cả routes
CORS(app)

# Tạo translator object
translator = Translator()

# Route chính - Home page
@app.route('/')
def home():
    return jsonify({
        "message": "Translation API is running!",
        "usage": "POST to /api/translate with JSON: {\"text\": \"your text\", \"source\": \"en\", \"target\": \"vi\"}"
    })

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

        # Dịch bằng Google Translate
        result = translator.translate(text, src=source_lang, dest=target_lang)

        return jsonify({
            "success": True,
            "original": text,
            "translated": result.text,
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