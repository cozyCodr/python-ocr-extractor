import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@heroui/button';
import { Textarea } from '@heroui/input';

const PdfUploader = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setPdfFile(event.target.files[0]);
    }
  };

  const handleExtractText = async () => {
    if (!pdfFile) {
      alert('Please select a PDF file.');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('pdf_file', pdfFile);

    try {
      const response = await axios.post('http://127.0.0.1:5000/extract_text', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setExtractedText(response.data.text);
    } catch (error: any) {
      console.error('Error extracting text:', error);
      alert(`Error extracting text: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center p-8 bg-gray-100 rounded-lg shadow-md h-full">
      {/* Left Column: PDF Input */}
      <div className="w-full md:w-1/3 p-4 flex flex-col items-center">
        <label htmlFor="pdf-upload" className="w-full block text-gray-700 text-sm font-bold mb-2">
          Select PDF File:
        </label>
        <input
          id="pdf-upload"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="shadow appearance-none border rounded w-full h-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />
        <Button onClick={handleExtractText} disabled={isLoading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          {isLoading ? 'Extracting...' : 'Extract Text'}
        </Button>
      </div>

      {/* Right Column: Extracted Text Output */}
      <div className="w-full h-full md:w-2/3 p-4">
        <label htmlFor="extracted-text" className="block text-gray-700 text-sm font-bold mb-2">
          Extracted Text:
        </label>

        <textarea
          value={extractedText}
          className="shadow appearance-none border rounded w-full h-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
        />
      </div>
    </div>
  );
};

export default PdfUploader;