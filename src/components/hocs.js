import React from 'react'
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useQuery } from '@apollo/client';

export function withLocation(Component) {
    return props => <Component {...props} location={useLocation()} />
}

export function withNavigate(Component) {
    return props => <Component {...props} navigate={useNavigate()} />
}

export function withParams(Component) {
    return props => <Component {...props} params={useParams()} />
}

export function withRegistration(Component) {
    return props => <Component {...props} />
}

export function withQuery2(Component) {
    return props => <Component {...props} graphQuery={useQuery} />
}

export function withQuery(Component, QUERY_STRING) {
    return function (props) {
        let params = useParams()
        console.log('params: ', params)

        const { loading, error, data } = useQuery(QUERY_STRING, {
            variables: { id: params.id, timeStamp: 1651236989 },
        });

        if (loading) return 'Loading';
        if (error) return `Error! ${error}`;

        return (<Component {...props} graphResponse={{ loading, error, data }} />)
    }
}

export function withLoadedData(Component, loadData) {
    return class extends React.Component {

        constructor(props) {
            super(props)

            this.state = {
                data: [],
                searchParams: ''
            }

            this.handleSetSearchParams = this.handleSetSearchParams.bind(this)
        }

        async componentDidMount() {
            this.fetchData()
        }

        async fetchData () {
            let data = await loadData(this.state.searchParams)
            console.log(data)
            this.setState({
                data
            })
        }

        componentDidUpdate(prevProps, prevState, snapshot) {
            if (this.state.searchParams !== prevState.searchParams) {
                this.fetchData()
            }
        }

        handleSetSearchParams(newSearchParams) {
            this.setState({ searchParams: newSearchParams })
        }

        render() {

            return (
                <Component data={this.state.data} onSetSearchParams={this.handleSetSearchParams} {...this.props} />
            );
        }
    }
}
