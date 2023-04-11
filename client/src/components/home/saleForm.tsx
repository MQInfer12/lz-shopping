import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useData } from '../../context/data'
import { Sale } from '../../interfaces/sale'
import { reserveProduct } from '../../services/sale'
import { Button } from '../../style/buttons'
import { Inputcontainer, SelectContainer } from '../../style/input'
import { useNavigate } from 'react-router-dom'

interface Props {
  sale: Sale | undefined
  idProduct: number
  quantitySold: number
  stock: number
  quantityUrl: string | undefined
  ciUrl: string | undefined
}

const SaleForm = ({ sale, idProduct, quantitySold, stock, quantityUrl, ciUrl }: Props) => {
  const navigate = useNavigate();
  const [ci, setCi] = useState(sale ? String(sale.clientCi) : ciUrl || "");
  const [amount, setAmount] = useState(sale ? String(sale.amount) : quantityUrl || "");
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
      navigate("/home");
    }
    setLoading(false);
  }

  return (
    <>
      <div className='two-columns'>
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