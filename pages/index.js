export default function Home() {
  return (
    <>
      <div className="header">
        <div className="container">
          <h2>
            <img src="/logo-petitzen.png" alt="PetitZen" style={{height: '40px', verticalAlign: 'middle', marginRight: '10px'}} />
            PetitZen
          </h2>
        </div>
      </div>
      <div className="hero">
        <img src="/logo-petitzen.png" alt="PetitZen Logo" style={{width: '150px', marginBottom: '2rem'}} />
        <h1>PetitZen.tech</h1>
        <p className="tagline">Votre assistant administratif intelligent</p>
        <p style={{color: '#666', marginBottom: '2rem'}}>SaaS pour auto-entrepreneurs</p>
        <button className="button">Commencer gratuitement</button>
      </div>
    </>
  );
}
