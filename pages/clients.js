// pages/clients.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient'; // Importe ton client Supabase

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false); // État pour afficher la modale d'ajout
  const [showEditModal, setShowEditModal] = useState(false); // État pour afficher la modale d'édition
  const [currentClient, setCurrentClient] = useState(null); // Client actuellement édité

  // États pour le formulaire
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // Fonction pour récupérer les clients depuis Supabase
  const fetchClients = async () => {
    try {
      setLoading(true);
      setError(null); // Réinitialise les erreurs précédentes
      const { data, error } = await supabase
        .from('clients') // Nom de ta table dans Supabase
        .select('*')    // Sélectionne toutes les colonnes
        .order('name', { ascending: true }); // Trie par nom

      if (error) {
        throw error;
      }
      setClients(data);
    } catch (err) {
      console.error("Erreur lors du chargement des clients :", err.message);
      setError("Impossible de charger les clients. Veuillez réessayer. Détails: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Ajout / Mise à jour d'un client
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const clientData = { name, email, phone, address };
    let error;

    if (currentClient) {
      // Mode édition
      const { error: updateError } = await supabase
        .from('clients')
        .update(clientData)
        .eq('id', currentClient.id);
      error = updateError;
    } else {
      // Mode ajout
      const { error: insertError } = await supabase
        .from('clients')
        .insert(clientData);
      error = insertError;
    }

    if (error) {
      console.error("Erreur lors de l'opération sur le client :", error.message);
      setError("Erreur lors de l'enregistrement du client. Veuillez réessayer. Détails: " + error.message);
    } else {
      resetForm();
      setShowAddModal(false);
      setShowEditModal(false);
      fetchClients(); // Recharger la liste des clients
    }
    setLoading(false);
  };

  // Suppression d'un client
  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) {
      setLoading(true);
      setError(null);
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Erreur lors de la suppression du client :", error.message);
        setError("Erreur lors de la suppression du client. Veuillez réessayer. Détails: " + error.message);
      } else {
        fetchClients(); // Recharger la liste des clients
      }
      setLoading(false);
    }
  };

  // Initialise le formulaire pour l'ajout
  const handleAddClick = () => {
    resetForm();
    setCurrentClient(null);
    setShowAddModal(true);
  };

  // Initialise le formulaire pour l'édition
  const handleEditClick = (client) => {
    setCurrentClient(client);
    setName(client.name);
    setEmail(client.email);
    setPhone(client.phone);
    setAddress(client.address);
    setShowEditModal(true);
  };

  // Réinitialise les champs du formulaire
  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setCurrentClient(null);
  };

  // Charger les clients au montage du composant
  useEffect(() => {
    fetchClients();
  }, []);

  if (loading && !clients.length && !error) { // Affiche le chargement uniquement si c'est le premier chargement et pas d'erreur
    return (
      <div className="bg-white p-8 rounded-lg shadow-md h-full flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-avironBayonnaisBlue mb-6">Clients 🧑‍🤝‍🧑</h1>
        <p className="text-xl text-gray-700">Chargement des clients...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md min-h-[calc(100vh-180px)] flex flex-col">
      <h1 className="text-4xl font-bold text-avironBayonnaisBlue mb-6">Clients 🧑‍🤝‍🧑</h1>
      <p className="text-xl text-gray-700 mb-8">
        Gérez ici la liste de tous vos clients.
      </p>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

      <div className="mb-6">
        <button
          onClick={handleAddClick}
          className="bg-buttonPrimary hover:bg-buttonHover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Ajouter un client
        </button>
      </div>

      {clients.length === 0 && !loading && !error ? (
        <div className="text-center text-gray-500 text-lg mt-8">
          Aucun client pour le moment.
          <p className="text-sm mt-2">
            (Utilisez le bouton "Ajouter un client" ci-dessus ou ajoutez-en directement dans Supabase)
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto flex-grow">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">Nom</th>
                <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">Email</th>
                <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">Téléphone</th>
                <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">Adresse</th>
                <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{client.name}</td>
                  <td className="py-2 px-4 border-b">{client.email}</td>
                  <td className="py-2 px-4 border-b">{client.phone}</td>
                  <td className="py-2 px-4 border-b">{client.address}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleEditClick(client)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm mr-2"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(client.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modale d'ajout de client */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-1/2 max-w-lg">
            <h2 className="text-2xl font-bold mb-6 text-avironBayonnaisBlue">Ajouter un nouveau client</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nom:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Téléphone:</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Adresse:</label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-buttonPrimary hover:bg-buttonHover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={loading}
                >
                  {loading ? 'Enregistrement...' : 'Ajouter le client'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modale d'édition de client */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-1/2 max-w-lg">
            <h2 className="text-2xl font-bold mb-6 text-avironBayonnaisBlue">Modifier le client</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit-name">Nom:</label>
                <input
                  type="text"
                  id="edit-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit-email">Email:</label>
                <input
                  type="email"
                  id="edit-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit-phone">Téléphone:</label>
                <input
                  type="tel"
                  id="edit-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="edit-address">Adresse:</label>
                <input
                  type="text"
                  id="edit-address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={loading}
                >
                  {loading ? 'Mise à jour...' : 'Mettre à jour le client'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}