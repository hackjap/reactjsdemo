import React, { useState, useEffect } from 'react';

const Helloworld = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const url = "http://my-service.default.svc/hello";
        fetch(url)
            .then((response) => {
                return response.text()
            })
            .then((message) => {
                setData(message);
            });
    }, []);

    return (
        <div>
            {data}
        </div>
    )
};

export default Helloworld;