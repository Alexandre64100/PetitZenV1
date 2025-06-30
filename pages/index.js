{/* Section Kanban */}
<div className="kanban-section">
  <div className="container">
    <h2>Gérez vos documents comme un pro ! 📊</h2>
    <p className="kanban-subtitle">Visualisez l'état de vos factures et documents en temps réel</p>
    
    <div className="kanban-board">
      <div className="kanban-column">
        <div className="kanban-header new">
          <h3>📥 Nouveaux</h3>
          <span className="count">3</span>
        </div>
        <div className="kanban-card">
          <h4>Facture Dupont</h4>
          <p>450€ - Peinture salon</p>
          <span className="date">Aujourd'hui</span>
        </div>
        <div className="kanban-card">
          <h4>Devis Martin</h4>
          <p>780€ - Rénovation cuisine</p>
          <span className="date">Hier</span>
        </div>
      </div>

      <div className="kanban-column">
        <div className="kanban-header processing">
          <h3>⚙️ En traitement</h3>
          <span className="count">2</span>
        </div>
        <div className="kanban-card">
          <h4>Note frais essence</h4>
          <p>65€ - Déplacement chantier</p>
          <span className="date">Lun</span>
        </div>
      </div>

      <div className="kanban-column">
        <div className="kanban-header validated">
          <h3>✅ Validés</h3>
          <span className="count">5</span>
        </div>
        <div className="kanban-card">
          <h4>Facture Leroy Merlin</h4>
          <p>234€ - Matériel</p>
          <span className="date">Mar</span>
        </div>
      </div>

      <div className="kanban-column">
        <div className="kanban-header paid">
          <h3>💰 Payés</h3>
          <span className="count">12</span>
        </div>
        <div className="kanban-card success">
          <h4>Facture Garcia</h4>
          <p>1200€ - Travaux complets</p>
          <span className="date">Payé ✓</span>
        </div>
      </div>
    </div>
  </div>
</div>
