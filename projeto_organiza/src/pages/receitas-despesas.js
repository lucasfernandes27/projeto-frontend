import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function App() {
  const [entries, setEntries] = useState([]);
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('Receita'); // Padrão: Receita

  const addEntry = () => {
    if (description && value) {
      const entry = {
        description,
        value: parseFloat(value),
        category,
        date: new Date().toLocaleDateString(),
      };

      setEntries([...entries, entry]);
      setDescription('');
      setValue('');
    }
  };

  const deleteEntry = (index) => {
    const updatedEntries = [...entries];
    updatedEntries.splice(index, 1);
    setEntries(updatedEntries);
  };

  const editEntry = (index, newDescription, newValue) => {
    const updatedEntries = [...entries];
    updatedEntries[index].description = newDescription;
    updatedEntries[index].value = parseFloat(newValue);
    setEntries(updatedEntries);
  };

  const totalBalance = entries.reduce((total, entry) => {
    return entry.category === 'Receita'
      ? total + entry.value
      : total - entry.value;
  }, 0);

  const totalReceitas = entries.reduce((total, entry) => {
    return entry.category === 'Receita' ? total + entry.value : total;
  }, 0);

  const totalDespesas = entries.reduce((total, entry) => {
    return entry.category === 'Despesa' ? total + entry.value : total;
  }, 0);

  return (
    <div className="bg-main min-h-screen flex flex-col">
        <Navbar/>
    <div className="container mx-auto p-4">
       
      <h1 className="text-2xl font-bold mb-4">Registro de Receitas e Despesas</h1>
       
      <div className="mb-4">
      <input
          type="text"
          className="p-2 border rounded w-1/8 mr-2"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
            <input
          type="number"
          className="p-2 border rounded w-1/8 mr-2"
          placeholder="Valor"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <select
          className="p-2 border rounded w-1/8"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Receita">Receita</option>
          <option value="Despesa">Despesa</option>
        </select>
        <button
          className="bg-blue-navbar text-white hover:bg-blue-700 font-bold py-2 px-4 rounded ml-2"
          onClick={addEntry}
        >
          Adicionar
        </button>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold">SALDO TOTAL: R$ {totalBalance.toFixed(2)}</h2>
        <h3 className="text-lg font-semibold">ENTRADAS: R$ {totalReceitas.toFixed(2)}</h3>
        <h3 className="text-lg font-semibold">SAÍDAS: R$ {totalDespesas.toFixed(2)}</h3>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Histórico de Registros</h2>
        <ul>
          {entries.map((entry, index) => (
            <li key={index} className="mb-2">
              {entry.description} ({entry.category}): R$ {entry.value.toFixed(2)} ({entry.date})
              <button
                className="bg-editar hover:bg-yellow-700 text-white font-bold py-1 px-1 rounded ml-2 "
                onClick={() => editEntry(index, prompt('Nova descrição:', entry.description), prompt('Novo valor:', entry.value))}
              >
                Editar
              </button>
              <button
                className="bg-red hover:bg-red-700 text-white font-bold py-1 px-1 rounded ml-2 W"
                onClick={() => deleteEntry(index)}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
    <div className="mt-auto">
            <Footer />
          </div>
    </div>
  );
}

export default App;
