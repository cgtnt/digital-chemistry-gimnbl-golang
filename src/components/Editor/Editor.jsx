import { useEffect, useState } from "react";
import Element from "../Base/Pages/Element";
import { EditorContext } from "../Context/EditorContext";
import Login from "./Login";

export default function Editor() {
    const [auth, setAuth] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("jwt-token")) {
            setAuth(true)
        }
    }, [])

    return (
        <>
            <EditorContext.Provider value={true}>
                { auth ? <Element /> : <Login setAuth={setAuth} />}
            </EditorContext.Provider>
        </>
    );
}