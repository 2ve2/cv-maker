import { BrowserRouter, Routes, Route } from 'react-router'
import { HomePage } from '@/pages/HomePage'
import { EditorPage } from '@/pages/EditorPage'
import { CVsPage } from '@/pages/CVsPage'
import { CVViewPage } from '@/pages/CVViewPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route path="/cvs" element={<CVsPage />} />
        <Route path="/cv/:id" element={<CVViewPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
