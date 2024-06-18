import Element from "./Element";
import { EditorContext } from "./EditorContext";

export default function Editor() {
    return (
        <>
            <EditorContext.Provider value={true}>
                <Element isEditor={true} />
            </EditorContext.Provider>
        </>
    );
}