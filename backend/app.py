from flask import Flask, request, jsonify
import os
from pdf2image import convert_from_path
import pytesseract
from werkzeug.utils import secure_filename
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Path to Tesseract and Poppler (adjust these based on your setup)
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'  # YOUR PATH
POPPLER_PATH = r"C:\poppler-24.08.0\Library\bin"  # YOUR PATH


def ocr_scanned_pdf(pdf_path):
    text = ""
    images = convert_from_path(
        pdf_path,
        dpi=300,
        poppler_path=POPPLER_PATH
    )

    for i, img in enumerate(images):
        text += pytesseract.image_to_string(img) + "\n"

    return text


@app.route('/extract_text', methods=['POST'])
def extract_text():
    if 'pdf_file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    pdf_file = request.files['pdf_file']

    if pdf_file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if pdf_file:
        print("uploading")
        filename = secure_filename(pdf_file.filename)

        print("saving ")
        pdf_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

        print(pdf_path)
        pdf_file.save(pdf_path)  # Save the uploaded file

        try:
            extracted_text = ocr_scanned_pdf(pdf_path)
            return jsonify({'text': extracted_text})
        except Exception as e:
            return jsonify({'error': str(e)}), 500  # Handle exceptions

        finally:
            os.remove(pdf_path)  # Remove the temporary file

    return jsonify({'error': 'Something went wrong'}), 500


if __name__ == '__main__':
    app.run(debug=True)
