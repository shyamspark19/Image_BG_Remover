/**
 * Explanation: Background Removal Service Module
 * Calls the Express.js backend server (/api/remove-bg) to process background removal using API4AI.
 */

// Express Server Endpoint
const EXPRESS_SERVER_URL = 'http://localhost:5000/api/remove-bg';

/**
 * Explanation: Main function to remove image background
 * Sends image file to Express.js server and returns transparent image URL.
 * 
 * @param {File|string} fileOrUrl - Image file object or image URL
 * @param {Function} onProgress - Progress reporting callback
 * @returns {Promise<{ resultUrl: string }>} Transparent image result URL
 */
export async function removeBackground(fileOrUrl, onProgress = () => {}) {
  onProgress(25);

  try {
    const formData = new FormData();

    if (typeof fileOrUrl === 'string') {
      formData.append('url', fileOrUrl);
    } else {
      formData.append('image', fileOrUrl);
    }

    onProgress(50);

    // Call Express.js Backend Server API
    const response = await fetch(EXPRESS_SERVER_URL, {
      method: 'POST',
      body: formData,
    });

    onProgress(85);

    if (response.ok) {
      const contentType = response.headers.get('content-type') || '';

      if (contentType.includes('application/json')) {
        const json = await response.json();
        const base64Data = 
          json?.results?.[0]?.entities?.[0]?.image || 
          json?.results?.[0]?.entities?.[0]?.objects?.[0]?.image;

        if (base64Data) {
          onProgress(100);
          const resultUrl = base64Data.startsWith('data:') 
            ? base64Data 
            : `data:image/png;base64,${base64Data}`;
          return { resultUrl };
        }
      } else {
        const blob = await response.blob();
        onProgress(100);
        return { resultUrl: URL.createObjectURL(blob) };
      }
    }
  } catch (error) {
    console.warn('Express backend offline, running local canvas fallback:', error);
  }

  // Smooth fallback processing if Express backend server is offline
  return processLocalFallback(fileOrUrl, onProgress);
}

/**
 * Explanation: Local Fallback Processing Function
 * Runs local canvas transparency mask if Express server is offline.
 */
function processLocalFallback(fileOrUrl, onProgress) {
  return new Promise((resolve) => {
    const imageUrl = typeof fileOrUrl === 'string' ? fileOrUrl : URL.createObjectURL(fileOrUrl);
    const img = new Image();

    img.onload = () => {
      onProgress(90);
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Sample top-left corner background color
      const bgR = data[0], bgG = data[1], bgB = data[2];

      const threshold = 40;
      for (let i = 0; i < data.length; i += 4) {
        const dist = Math.sqrt(
          (data[i] - bgR) ** 2 + (data[i + 1] - bgG) ** 2 + (data[i + 2] - bgB) ** 2
        );
        if (dist < threshold) {
          data[i + 3] = 0;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      onProgress(100);
      resolve({ resultUrl: canvas.toDataURL('image/png') });
    };

    img.src = imageUrl;
  });
}
