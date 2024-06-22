import { useEffect, useState } from "react";
import Element from "../Base/Pages/Element";
import { EditorContext } from "../Context/EditorContext";
import Login from "./Login";
import { isExpired } from "react-jwt";

export default function Editor() {
    const [auth, setAuth] = useState(false)
    const [stashedContent, setStashedContent] = useState()

    useEffect(() => {
        let token = localStorage.getItem("jwt-token")
        if (token) {
            if (isExpired(token)) {
                setAuth(false)
                return
            }
            setAuth(true)
        }
    }, [])

    return (
        <>
            <EditorContext.Provider value={true}>
                {auth ? <Element setAuth={setAuth} setStashedContent={setStashedContent} stashedContent={stashedContent}/> : <Login setAuth={setAuth} />}
            </EditorContext.Provider>
        </>
    );
}