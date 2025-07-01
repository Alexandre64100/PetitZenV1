import Head from 'next/head';
import Link from 'next/link'; // Pour la navigation
import { useState } from 'react'; // Pour gérer l'état (par exemple, ouverture/fermeture d'un menu)

export default function Layout({ children, title = 'PetitZen V2' }) {
  // Tu peux ajouter des états ici si tu as des menus déroulants ou des barres latérales qui s'ouvrent
  const [sidebarOpen, setSidebarOpen] = useState(false); // Exemple pour une sidebar

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Gérez vos documents simplement" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Top Navbar (Barre de navigation supérieure) */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center z-10">
        <div className="flex items-center">
          <button
            className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 mr-4"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {/* Icône de menu pour mobile */}
            ☰
          </button>
          <Link href="/">
            <p className="text-2xl font-bold text-blue-600 cursor-pointer">
              & PetitZen
            </p>
          </Link>
          {/* Zone de recherche (à améliorer plus tard) */}
          <input
            type="text"
            placeholder="Recherche..."
            className="ml-8 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 hidden md:block"
          />
        </div>
        <div className="flex items-center space-x-6">
          {/* Icônes de navigation droite (Dashboard, Clients, etc. - provisoire) */}
          <Link href="/dashboard"><p className="text-gray-600 hover:text-blue-600 cursor-pointer">📊</p></Link>
          <Link href="/clients"><p className="text-gray-600 hover:text-blue-600 cursor-pointer">👤</p></Link>
          <Link href="/tasks"><p className="text-gray-600 hover:text-blue-600 cursor-pointer">✅</p></Link>
          <Link href="/invoices"><p className="text-gray-600 hover:text-blue-600 cursor-pointer">🧾</p></Link>
          <Link href="/analytics"><p className="text-gray-600 hover:text-blue-600 cursor-pointer">📈</p></Link>
          {/* Icône utilisateur / profil */}
          <button className="p-2 rounded-full bg-blue-100 text-blue-600">
            User
          </button>
        </div>
      </nav>

      {/* Conteneur principal: Sidebar + Contenu */}
      <div className="flex flex-1">
        {/* Sidebar (Barre latérale gauche) */}
        <aside
          className={`bg-blue-800 text-white w-64 p-6 space-y-6 flex flex-col transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static absolute h-full`}
        >
          <nav>
            <Link href="/dashboard">
              <p className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white cursor-pointer">
                Dashboard
              </p>
            </Link>
            <Link href="/clients">
              <p className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white cursor-pointer">
                Clients
              </p>
            </Link>
            <Link href="/tasks">
              <p className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white cursor-pointer">
                Tasks
              </p>
            </Link>
            <Link href="/invoices">
              <p className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white cursor-pointer">
                Invoices
              </p>
            </Link>
            <Link href="/analytics">
              <p className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white cursor-pointer">
                Analytics
              </p>
            </Link>
          </nav>
        </aside>

        {/* Contenu principal de la page */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children} {/* C'est ici que le contenu de tes pages (comme index.js) sera affiché */}
        </main>
      </div>
    </div>
  );
} 