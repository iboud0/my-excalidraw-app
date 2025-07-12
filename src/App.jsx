import { useState, useEffect } from 'react';
import './App.css';
import { Excalidraw, convertToExcalidrawElements } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

function App() {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

  useEffect(() => {
    if (!excalidrawAPI) {
      return;
    }

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const eventSource = new EventSource(`${apiUrl}/events`);

    console.log(`Connecting to SSE at ${apiUrl}/events`);

    eventSource.onmessage = (event) => {
      try {
        const newElements = JSON.parse(event.data);
        const excalidrawElements = convertToExcalidrawElements(newElements);
        
        excalidrawAPI.updateScene({
          elements: excalidrawElements,
          appState: {
            scrollToContent: true,
          },
          commitToHistory: true, 
        });

      } catch (error) {
        console.error('Error parsing SSE data:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE connection error:', error);
      eventSource.close();
    };

    return () => {
      console.log('Closing SSE connection.');
      eventSource.close();
    };
  }, [excalidrawAPI]); 
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Real-time Excalidraw Viewer</h1>
      <div style={{ height: "85vh", width: "100vw" }}>
        <Excalidraw
          excalidrawAPI={(api) => setExcalidrawAPI(api)}
          
          initialData={{
            elements: [],
            appState: { zenModeEnabled: true },
          }}
        />
      </div>
    </div>
  );
}

export default App;
