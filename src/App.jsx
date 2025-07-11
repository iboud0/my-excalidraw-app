import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Excalidraw } from "@excalidraw/excalidraw";
import { convertToExcalidrawElements } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

function App() { 
    const elements = convertToExcalidrawElements([
   
    ]);
    return (
        <>
         <h1 style={{ textAlign: "center" }}>Excalidraw Example</h1>
         <div style={{ height: "75vh", width: "100vw" }}>
          <Excalidraw
            initialData={{
                elements,
                appState: { zenModeEnabled: true },
                scrollToContent: true,
            }}
          />
         </div>
        </>
    );
}

export default App
