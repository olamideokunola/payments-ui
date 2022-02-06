import React from 'react';
import classNames from 'classnames';

function FormattedInput(props) {

    return(
        <div className='flex flex-col lg:gap-2'>
            <label className="text-white text-sm font-thin">{props.label}</label>
            <div 
                className='flex rounded border-2 border-blue-400 text-lg text-black'
                >
                    {props.children}
            </div>
        </div>
        
    );
}

function FormattedInputSubmit(props) {

    return(
        <div className='flex flex-col lg:gap-2'>
            <div className='bg-blue-600 text-center text-white py-4 font-bold text-xl rounded-md'>
                    {props.children}
            </div>
        </div>
        
    );
}

function NumberInput(props) {

    return(
        <div className='flex flex-col lg:gap-2'>
            <label className="hidden lg:block">{props.label}</label>
            <input 
                className='flex p-4 rounded border-2 border-blue-400 text-lg text-black' 
                type='number'
                placeholder={props.placeholder}>
            </input>
        </div>
        
    );
}

function TextInput(props) {

    let getInputType = () => {
        if (props.type === undefined) {
            return 'text'
        } else {
            return props.type
        }
    }

    return(
        <div className='flex flex-col lg:gap-2'>
            <label className="hidden lg:block">{props.label}</label>
            <input 
                className='flex p-4 rounded border-2 border-blue-400 text-lg text-black' 
                type={getInputType()}
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                >
            </input>
        </div>
        
    );
}

function SelectInput(props) {
    return(
        <div className='flex flex-col lg:gap-2'>
            <label className="hidden lg:block">{props.label}</label>
            <select 
                className='p-4 border-2 rounded border-blue-400 text-xl bg-white' 
                placeholder={props.placeholder}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                // style="background-image: url(../imgs/logo.png)"
            >
                {props.options.map((opt, ind) => {
                    return <option key={ind} value={opt.value}>{opt.text}</option>
                })}
            </select>
        </div>
    );
}

function TextAreaInput(props) {
    return(
        <div className='flex flex-col lg:gap-2'>
            <label className="hidden lg:block">{props.label}</label>
            <textarea 
                className='border-2 border-blue-400 text-lg' 
                type='text' 
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}>
            </textarea>
        </div>
    );
}

function FileInput(props) {
    return(
        <div className='flex flex-col lg:gap-2'>
            <label className="hidden lg:block">{props.label}</label>
            <input 
                className='p-4 border-2 border-blue-400 text-lg' 
                type='file' 
                placeholder={props.placeholder}>
            </input>
        </div>
    );
}

class NavButton extends React.Component {

    constructor(props){
        super(props)

        this.handleOnClick = this.handleOnClick.bind(this)
    }

    handleOnClick() {
        this.props.onClick()
        console.log(`In handleOnClick`)
    }

    render() {
        return (
            <button className="hover:bg-gray-300 active:bg-gray-600 px-2 rounded-md" onClick={this.handleOnClick}>
                {this.props.children}
            </button>
        );
    }
}

class ListView extends React.Component {

    constructor(props){
        console.log(`in ListView constructor`)
        super(props)

        this.lastPage = Math.ceil(this.props.items.length / this.props.itemsPerPage)

        this.state={
            currentPage: 1,
            startIndex: 0,
            endIndex: this.props.itemsPerPage + 0,
            // pageItems: this.props.items.slice(0, this.props.itemsPerPage)
        }

        this.gotoFirstPage = this.gotoFirstPage.bind(this)
        this.gotoLastPage = this.gotoLastPage.bind(this)
        this.gotoNextPage = this.gotoNextPage.bind(this)
        this.gotoPreviousPage = this.gotoPreviousPage.bind(this)
    }

    componentDidMount(){
        console.log(`list view mounted`)
    }

    componentWillUnmount(){

    }

    setPage(currPageIndex,newStartIndex, newEndIndex){
        this.setState({
            currentPage: currPageIndex,
            startIndex: newStartIndex,
            endIndex: newEndIndex,
            // pageItems: props.items.slice(startIndex, endIndex)
        })
    }

    gotoFirstPage() {

        console.log('goto first page')
        this.moveForward(1)  

    }

    gotoNextPage() {

        let currPageIndex = this.state.currentPage + 1
        this.moveForward(currPageIndex)  

    }

    gotoPreviousPage(){

        let currPageIndex = this.state.currentPage - 1
        this.moveBackward(currPageIndex)     

    }

    moveForward(currPageIndex){
        console.log(`In moveForward ${currPageIndex}`)
        if(currPageIndex <= this.lastPage) {
            
            let startIndex = (currPageIndex - 1) * this.props.itemsPerPage
            let endIndex = startIndex + this.props.itemsPerPage

            this.setPage(currPageIndex,startIndex, endIndex)   
        }
    }

    moveBackward(currPageIndex){
        if(currPageIndex >= 1) {
            
            let startIndex = currPageIndex * this.props.itemsPerPage - this.props.itemsPerPage
            let endIndex = startIndex + this.props.itemsPerPage

            this.setPage(currPageIndex,startIndex, endIndex)   
        }
    }

    gotoLastPage(){

        let currPageIndex = this.lastPage
        this.moveForward(currPageIndex)  

    }

    render() {

        let gridClassStr = `grid-cols-${this.props.headers.length}`

        let headerClass = classNames({
            "hidden lg:grid": true,
            [gridClassStr]: true,
            "lg:grid-rows-1 gap-6 text-sm text-blue-600 pb-2 border-b-2": true
        })

        return(
            <div className=''>
                <div>
                    {/* <h1>{headerClass}</h1> */}
                    <div className={headerClass}>
                        {/* title */}
                        {this.props.headers.map((header, index) => <p key={index} className=''>{header}</p>)}
                    </div>
                </div>
                
                <div className='flex flex-col lg:display gap-4'>
                    {this.props.items.slice(this.state.startIndex, this.state.endIndex).map((item, index) => {
                        return <div key={index}>{this.props.displayRow(item, index)}</div>
                    })}
                </div>
                <div className="hidden lg:flex flex-row mt-4 gap-1 justify-end">
                    {/* <button onClick={this.gotoFirstPage}>{`<<`}</button>
                    <button onClick={this.gotoPreviousPage}>{`<`}</button> */}
                    <NavButton onClick={this.gotoFirstPage}>
                        {`<<`}
                    </NavButton>
                    <NavButton onClick={this.gotoPreviousPage}>
                        {`<`}
                    </NavButton>
                    <p>{`${this.state.currentPage} of ${this.lastPage}`}</p>
                    <NavButton onClick={this.gotoNextPage}>
                        {`>`}
                    </NavButton>
                    <NavButton onClick={this.gotoLastPage}>
                        {`>>`}
                    </NavButton>
                    {/* <button className="hover:bg-gray-300 active:bg-gray-600 px-2 rounded-md" onClick={this.gotoNextPage}>{`>`}</button> */}
                    {/* <button onClick={this.gotoLastPage}>{`>>`}</button> */}
                </div>
            </div>
        );
    }
}


export { TextInput, NumberInput, SelectInput, TextAreaInput, FileInput, FormattedInput, FormattedInputSubmit, NavButton, ListView }