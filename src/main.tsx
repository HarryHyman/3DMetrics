import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import Home from './Home.tsx'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Results from "./Results.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Home />}></Route>
                    <Route path="/results" element={<Results />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
