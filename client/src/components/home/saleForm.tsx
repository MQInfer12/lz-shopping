import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useData } from '../../context/data'
import { Sale } from '../../interfaces/sale'
import { reserveProduct } from '../../services/sale'
import { Button } from '../../style/buttons'
import { Inputcontainer } from '../../style/input'

interface Props {
  sale: Sale | undefined
  idProduct: number
}

const SaleForm = ({ sale, idProduct }: Props) => {
  const [ci, setCi] = useState(sale?.clientCi ? String(sale.clientCi) : "");
  const { handleReserve, handleCancelReserve } = useData();
  
  const handleSendReserve = async () => {
    const res = await reserveProduct({
      saleId: sale?.id,
      ci: ci
    }, idProduct);
    if(sale?.reserved) {
      handleCancelReserve(res.data, idProduct);
      Swal.fire({
        title: "Petición correcta.",
        text: "Reserva cancelada correctamente.",
        icon: 'success'
      });
    } else {
      handleReserve(res.data, idProduct);
      Swal.fire({
        title: "Petición correcta.",
        text: "Producto reservado correctamente.",
        icon: 'success'
      });
    }
  }

  useEffect(() => {
    if(!sale) setCi("");
  }, [sale]);

  return (
    <>
      <Inputcontainer>
        <label>CI</label>
        <input 
          style={{ textAlign: "center" }} 
          value={ci} 
          onChange={(e) => setCi(e.target.value)} 
          type="text" 
        />
      </Inputcontainer>    
      <Button 
        onClick={handleSendReserve}
      >
        {sale?.reserved ? "Cancelar reserva" : "Añadir reserva"}
      </Button>
      <Button>Vender</Button> 
    </>
  )
}

export default SaleForm