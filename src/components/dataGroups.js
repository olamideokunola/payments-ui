import { EmptyComponent } from "./emptyComponent";

export function DataGroup (props) {
    return  <div className='rounded-md border-2 border-gray-200 p-2 flex flex-col gap-2'>
        {props.children}
    </div>
}

export function DataSection (props) {
    return <div className='border-b-2 p-4 border-gray-50 '>
        <p className='text-xs text-gray-500'>{props.label}</p>
        <p className='text-xl'>{props.value}</p>
    </div>
}

export function NoMerchants (props) {
    return(
        <EmptyComponent message={"No merchants to display at the moment"}></EmptyComponent>
    );
}