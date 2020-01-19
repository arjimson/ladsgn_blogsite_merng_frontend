import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";

export const filesQuery = gql`
  {
    files
  }
`;

function Files() {
    const { data, loading } = useQuery(filesQuery);

    if (loading) {

        return <div>loading...</div>;
    }
    if (data) {
        console.log(data);
    }

    return (
        <div>
            {data.files.map(x => (
                <img
                    style={{ width: 200 }}
                    key={x}
                    src={`http://localhost:5000/static/${x}`}
                    alt={x}
                />
            ))}
        </div>
    );
};

export default Files;