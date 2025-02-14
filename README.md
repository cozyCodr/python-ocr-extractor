# Python OCR Extractor

A web application that extracts text from scanned PDF documents using OCR (Optical Character Recognition) technology. The application consists of a Python Flask backend and a frontend interface.

## Features

- PDF file upload functionality
- OCR text extraction from scanned PDFs
- Real-time text extraction processing
- Cross-Origin Resource Sharing (CORS) enabled
- Clean and simple API endpoint

## Prerequisites

Before running this application, make sure you have the following installed:

- Python 3.x
- Tesseract OCR ([Download](https://github.com/UB-Mannheim/tesseract/wiki))
- Poppler ([Download](https://github.com/oschwartz10612/poppler-windows/releases/))

## Installation

1. Clone the repository:
```bash
git clone https://github.com/cozyCodr/python-ocr-extractor.git
cd python-ocr-extractor
```

2. Install backend dependencies
```bash
cd backend
pip install -r requirements.txt
```

3. Configure Tesseract and Poppler paths:
  - Open backend/app.py
  - Update the following paths according to your system
    ```bash
    pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
    POPPLER_PATH = r"C:\poppler-24.08.0\Library\bin"
    ```


## Project Structure
python-ocr-extractor/
├── backend/
│   ├── app.py              # Flask application
│   └── requirements.txt    # Python dependencies
├── frontend-app/          # Frontend application
└── .gitignore


## API Endpoints
**POST /extract_text**
Extracts text from an uploaded PDF file.

Request:
```
Method: POST
Content-Type: multipart/form-data
Body: pdf_file (PDF file)
```


## Usage
1. Start the backend server:
```bash
cd backend
python app.py
```

2. The server will start running on `http://localhost:5000`

