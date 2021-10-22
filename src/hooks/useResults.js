import { useEffect, useState } from "react";
import yelp from '../api/yelp';

export default () => {
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const searchApi = async(searchTerm) => {
        try {
            const response = await yelp.get("/search", {
                params: {
                    limit: 50,
                    term: searchTerm,
                    location: "san jose",
                },
            });

            setResults(response.data.businesses);
            console.log(`Response successful... (${searchTerm} --> submitted term)\n`);
        } catch (err) {
            console.log(
                "* * * * * * * * * * * * ERROR * * * * * * * * * * * * \n" +
                err +
                "\n * * * * * * * * * * * * * * * * * * * * * * * * \n"
            );
            setErrorMessage("Something went wrong!");
        }
    };

    // Call searchApi when component
    // is first rendered. BAD CODE!
    //   searchApi("pasta");   // causes infinite loop, useEffect needed
    useEffect(() => {
        searchApi("fish");
    }, []);

    return [searchApi, results, errorMessage];
};