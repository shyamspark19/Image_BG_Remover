import React, { useState } from 'react';
import Navbar from './components/Navbar';
import UploadBox from './components/UploadBox';
import ProcessingModal from './components/ProcessingModal';
import ResultModal from './components/ResultModal';
import { removeBackground } from './services/bgRemovalService';
import './App.css';


export default function App() {
  // State variables for background removal workflow
  const [resultImage, setResultImage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);


  const handleSelectImage = async (file) => {
    try {
      setIsProcessing(true);
      setProgress(10);

      // Call background removal engine
      const { resultUrl } = await removeBackground(file, (pct) => {
        setProgress(pct);
      });

      setResultImage(resultUrl);
      setIsProcessing(false);
    } catch (error) {
      console.error('Error removing background:', error);
      setIsProcessing(false);
      alert('Failed to process image. Please try another image file.');
    }
  };


  const handleReset = () => {
    setResultImage('');
    setIsProcessing(false);
    setProgress(0);
  };

  return (
    <div className="app-container">
      {/* 1. Top Header */}
      <Navbar />

      {/* 2. Main Home Screen */}
      <main className="main-content">
        <section style={styles.heroSection}>
          <h1 className="gradient-title">Image Background Remover</h1>
          <p className="subheading">
            Upload your image below to automatically remove the background in seconds.
          </p>
        </section>

        {/* Upload Box Component */}
        <UploadBox onSelect={handleSelectImage} />
      </main>

      {/* 3. Processing Popup Modal */}
      <ProcessingModal
        isOpen={isProcessing}
        progress={progress}
      />

      {/* 4. Result Popup Modal */}
      <ResultModal
        isOpen={Boolean(resultImage)}
        resultUrl={resultImage}
        onReset={handleReset}
      />
    </div>
  );
}


const styles = {
  heroSection: {
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
};
