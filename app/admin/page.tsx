'use client'

import { useState } from 'react'

interface StoredResponse {
  timestamp: string;
  data: {
    isAvailable: boolean | null;
    date: string | null;
    time: string;
    food: string[];
    movie: string;
    excitement: number;
  };
}

export default function AdminPage() {
  const [responses, setResponses] = useState<StoredResponse[]>([])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          setResponses([{
            timestamp: new Date().toISOString(),
            data: data
          }]);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">¡Invitación Especial para una Contadora Geek! 🎉</h1>
      
      <div className="mb-8">
        <p className="text-lg mb-4">
          ¡Hola [nombre de tu amiga]! 🎉 Como contadora, sé que eres una experta en organizar todo, ¡pero hoy quiero invitarte a algo que no requiere ningún balance! ¿Qué opinas de una cita especial para ti?
        </p>
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-pink-50 file:text-pink-700
            hover:file:bg-pink-100"
        />
      </div>

      {responses.length === 0 ? (
        <p>¡Sube un archivo JSON con las respuestas para verlas!</p>
      ) : (
        responses.map((response) => (
          <div key={response.timestamp} className="mb-8 p-4 border rounded bg-white shadow-lg">
            <p className="text-lg font-semibold mb-2">
              Hora de la respuesta: {new Date(response.timestamp).toLocaleString()}
            </p>
            <div className="space-y-2 text-left">
              <p>📅 Fecha: {response.data.date ? new Date(response.data.date).toLocaleDateString() : 'No seleccionada'}</p>
              <p>⏰ Hora: {response.data.time || 'No seleccionada'}</p>
              <p>🍕 Comida Seleccionada: {response.data.food.join(', ') || 'No seleccionada'}</p>
              <p>🎬 Película Elegida: {response.data.movie || 'No seleccionada'}</p>
              <p>💖 Nivel de Emoción: {response.data.excitement}/100</p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
