import { useEffect } from "react";

function Test() 
{
    useEffect(() => 
    {
        fetch("http://localhost:3000")
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));
    }, []);
    return <h1>Test Page</h1>;
}

export default Test; 