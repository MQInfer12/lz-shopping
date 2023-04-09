import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useData } from '../../context/data'
import { Sale } from '../../interfaces/sale'
import { reserveProduct } from '../../services/sale'
import { Button } from '../../style/buttons'
import { Inputcontainer, SelectContainer } from '../../style/input'

interface Props {
  sale: Sale | undefined
  idProduct: number
  quantitySold: number
  stock: number
}

const SaleForm = ({ sale, idProduct, quantitySold, stock }: Props) => {
  const [ci, setCi] = useState(sale?.clientCi ? String(sale.clientCi) : "");
  const [amount, setAmount] = useState(sale?.amount ? String(sale.amount) : "1");
  const [loading, setLoading] = useState(false);
  const { handleReserve, handleCancelReserve } = useData();

  const handleSendReserve = async () => {
    setLoading(true);
    const res = await reserveProduct({
      saleId: sale?.id,
      ci,
      amount
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
    setLoading(false);
  }

  useEffect(() => {
    if(!sale) setCi("");
  }, [sale]);

  return (
    <>
      <div className='two-columns'>
        <SelectContainer small>
          <label>Cantidad*</label>
          <select 
            disabled={!!sale}
            value={amount} 
            onChange={e => setAmount(e.target.value)}
          >
            {
              sale ?
              <option>{sale?.amount}</option> :
              new Array(stock - quantitySold).fill("option").map((v, i) => (
                <option key={i} value={i + 1}>{i + 1}</option>
              ))
            }
          </select>
        </SelectContainer>
        <Inputcontainer>
          <label>CI</label>
          <input 
            disabled={!!sale}
            style={{ textAlign: "center" }} 
            value={ci} 
            onChange={(e) => setCi(e.target.value)} 
            type="text" 
          />
        </Inputcontainer>  
      </div>  
      <Button 
        onClick={handleSendReserve}
        disabled={loading}
      >
        {loading ? "Cargando..." : sale?.reserved ? "Cancelar reserva" : "Añadir reserva"}
      </Button>
      {/* <Button>Vender</Button>  */}
    </>
  )
}

export default SaleForm