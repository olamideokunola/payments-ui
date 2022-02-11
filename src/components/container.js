import React from 'react'

function ContainerTitle (props) {
    return (
        <h2 className="font-semibold text-xl">{props.title}</h2>
    );
}

function Container (props) {

    return (
        <div className="rounded-md bg-white m-4 p-4 shadow-md overflow-auto">
            <div className="border-b-2 border-gray-100 pb-2 flex flex-row justify-between">
                {props.title !== undefined && <ContainerTitle title={props.title} />}
                {props.actionBar}
            </div>
            {props.children}
        </div>  
    );
}

function Field (props) {

    let labelClassName = props.index == 0 ? "text-blue-500" : "inline lg:hidden text-blue-500"

    return (
        <span className="pr-2 lg:flex lg:flex-col">
            {/* {props.index == 0 && <span className="text-blue-500">
                {props.name}
            </span>} */}
            <span className={labelClassName}>
                {props.name}
            </span>
            <span className="">
                {props.value}
            </span>
        </span>
    );
}

function FieldAsColumn (props) {
    return (
        <span className="flex flex-col pr-2">
            <span className="text-blue-500">
                {props.name}
            </span>
            <span>
                {props.value}
            </span>
        </span>
    );
}

function fromWei(amt) {
    return Number(amt)*1e-18
}

function TokenField(props){
    return(
        <Field name={props.name} value={`${fromWei(props.value).toFixed(2)} ${props.symbol}`} index={props.index}/>
    );
}


function ContainerSection (props) {
    return (
        <div className="border-b-2 border-gray-100 py-2 text-sm">
            {props.children}
        </div>
    );
}

export { Container, ContainerSection, Field, FieldAsColumn, TokenField, fromWei }