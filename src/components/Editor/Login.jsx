export default function Login(){
    return <form action="/api/login" style={{
        maxWidth: "fit-content",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10%"
        }}>
        <label>Korisničko ime:
            <input type="text" />
        </label>
        <label>Šifra:
            <input type="password" />
        </label>
        <input type="button" value="Uloguj se" />
    </form>
}