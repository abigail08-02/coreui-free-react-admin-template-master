import React from 'react';
import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CButton,
} from "@coreui/react";


const EliminarLibMesModal = ({showDelModal, setShowDelModal}) => {


    return (<CModal show={showDelModal}
            onClose={setShowDelModal}>
            <CModalHeader closeButton>
                <CModalTitle>Eliminar libro mes</CModalTitle>
            </CModalHeader>
            <CModalBody>
                Desea eliminar mes
            </CModalBody>
            <CModalFooter>
                <CButton color="danger">Eliminar</CButton>
                {' '}
                <CButton color="secondary"
                    onClick={
                        () => setShowDelModal(false)
                    }>Cancelar</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default EliminarLibMesModal