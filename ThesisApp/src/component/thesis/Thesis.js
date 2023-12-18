import React, { Fragment } from 'react'
import { Text } from 'react-native'
import ListThesis from './ListThesis'
import AddThesis from './AddThesis'

const Thesis = () => {
    return (
        <Fragment>
            <ListThesis />
            <AddThesis />
        </Fragment>
    )
}

export default Thesis