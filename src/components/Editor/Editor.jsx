import Element from "../Base/Pages/Element";
import { EditorContext } from "../Context/EditorContext";
import Login from "./Login";

export default function Editor() {
    return (
        <>
            <EditorContext.Provider value={true}>
                {/* <Login /> */}
                <Element />
            </EditorContext.Provider>
        </>
    );
}