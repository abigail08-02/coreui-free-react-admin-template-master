import React from 'react'
import {
    CCard,
    CCardHeader,
    CCardBody,
    CPopover,
} from "@coreui/react";

 function CardHeaderDatosAudit({auditorias}) {
    return (
        <CCard>
            <CCardHeader>Datos Auditoria</CCardHeader>
            <CCardBody>
                <div>
                    {
                        auditorias && auditorias.map((audit) => {
                            return (<CPopover key={
                                audit.id
                            }
                            header={
                                audit.iglesia.nombre
                            }
                            content={
                                `Actual: ${

                                    audit.actual ? 'si' : 'No'
                                }`
                            }>
                                <button className="btn btn-primary"> {
                                    audit.fecha
                                } </button>
                            </CPopover>);
                        })
                    }
                </div>
            </CCardBody>
        </CCard>
    )
}

export default CardHeaderDatosAudit