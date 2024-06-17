import Element from "./Element";

export default function Editor() {
    return (
        <>
            <h3 style={{backgroundColor: "red"}}>U edit modu</h3>
            <Element isEditor={true} />
        </>
    );
}