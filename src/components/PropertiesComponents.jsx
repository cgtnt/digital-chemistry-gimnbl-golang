function Formula({children}){
    return (
        <div>{children}</div>
    );
}

function Paragraph({children}){
    return (
        <p>{children}</p>
    );
}

function Heading({children}){
    return (
        <h1>{children}</h1>
    );
}

export {Formula, Paragraph, Heading}