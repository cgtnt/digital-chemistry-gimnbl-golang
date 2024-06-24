function NotFound() {
    return (
        <div style={{display:"flex", justifyContent:"center", alignItems: "center", height: "100vh"}}>
            <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems: "center", height: "300px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", padding: "30px"}} >
                <h1>404</h1>
                <br />
                <p>Ups! Nismo našli ovu stranicu</p>
                <p>Stranica koju tražite je možda ukljonjena, trenutno nedostupna ili ne postoji</p>
                <br />
                <a href="/" class="btn">Vratite se na poćetnu stranicu</a>
            </div>
        </div>
    );
}

function ServerError() {
    return (
        <div style={{display:"flex", justifyContent:"center", alignItems: "center", height: "100vh"}}>
            <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems: "center", height: "300px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", padding: "30px"}} >
                <h1>500</h1>
                <br />
                <p>Ups! Došlo je do interne greške</p>
                <p>Obratite se administratoru</p>
            </div>
        </div>
    );
}

export { NotFound, ServerError }