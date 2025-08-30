import React from "react";

interface PdfUploadProps {
    onFileSelect: (file: File) => void;
}

const PdfUpload: React.FC<PdfUploadProps> = ({ onFileSelect }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === "application/pdf") {
            onFileSelect(file);
        } else {
            alert("Please upload a valid PDF file.");
        }
    };

    return (
        <div className="w-full flex flex-col items-center">
            <input
                type="file"
                accept="application/pdf"
                onChange={handleChange}
                className="block w-full max-w-xs mx-auto mb-4 text-sm text-gray-500"
            />
            <p className="text-center text-xs text-green-400">
                Upload a PDF file from your device
            </p>
        </div>
    );
};

export default PdfUpload;
