import Element from "../Base/Pages/Element";
import { EditorContext } from "../Context/EditorContext";

export default function Editor() {
    return (
        <>
            <EditorContext.Provider value={true}>
                <Element />
            </EditorContext.Provider>
        </>
    );
}