import { useLocation, useNavigate, useParams } from "react-router-dom"

export function withLocation(Component){
    return props => <Component {...props} location={useLocation()}/>
}

export function withNavigate(Component){
    return props => <Component {...props} navigate={useNavigate()}/>
}

export function withParams(Component){
    return props => <Component {...props} params={useParams()}/>
}

export function withRegistration(Component){
    return props => <Component {...props}/>
}