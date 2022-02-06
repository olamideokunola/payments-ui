import React from "react";

function EmptyComponent(props) {
    return(
        <div>
            <p className="text-center text-gray-300 p-8">{props.message}</p>
        </div>
    );
}

export { EmptyComponent }