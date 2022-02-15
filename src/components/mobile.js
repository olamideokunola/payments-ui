export function MobileListPrimaryText(props) {
    return <p className="text-blue-600 text-xl">{props.children}</p>
}

export function MobileListSecondaryText(props) {
    return <p className="font-light text-gray-600">{props.children}</p>
}

export function MobileListTertiaryText(props) {
    return <p className="font-thin text-gray-600 text-sm">{props.children}</p>
}