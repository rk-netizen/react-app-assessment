import { useState } from "react";
import PdfUpload from "./components/PdfUpload";

function App() {
    const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
    const [signedPdfUrl, setSignedPdfUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSignPdf = async () => {
        if (!selectedPdf) return;
        setLoading(true);
        setSignedPdfUrl(null);
        const formData = new FormData();
        formData.append("pdf", selectedPdf);
        try {
            const response = await fetch("/api/sign-pdf", {
                method: "POST",
                body: formData,
            });
            if (!response.ok) throw new Error("Failed to sign PDF");
            const blob = await response.blob();
            setSignedPdfUrl(URL.createObjectURL(blob));
        } catch (error) {
            console.error("Error signing PDF:", error);
            alert("Error signing PDF");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white p-4 text-gray-900">
            <h1 className="text-2xl font-bold mb-4 bg-green-500 text-white">
                Tailwind Test: Mobile PDF Signer
            </h1>
            <PdfUpload onFileSelect={setSelectedPdf} />
            {selectedPdf && !signedPdfUrl && (
                <button
                    onClick={handleSignPdf}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    disabled={loading}
                >
                    {loading ? "Signing..." : "Sign PDF"}
                </button>
            )}
            {signedPdfUrl && (
                <div className="mt-6 w-full flex flex-col items-center">
                    <h2 className="text-lg font-bold mb-2">Signed PDF:</h2>
                    <iframe
                        src={signedPdfUrl}
                        title="Signed PDF"
                        className="w-full max-w-md h-96 border rounded"
                    />
                    <a
                        href={signedPdfUrl}
                        download="signed.pdf"
                        className="mt-2 text-blue-600 underline"
                    >
                        Download Signed PDF
                    </a>
                </div>
            )}
        </div>
    );
}

export default App;
