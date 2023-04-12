import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useData } from '../../context/data'
import { Sale } from '../../interfaces/sale'
import { reserveProduct } from '../../services/sale'
import { Button } from '../../style/buttons'
import { useNavigate } from 'react-router-dom'
import InputText from '../global/inputText'
import { InputSelect } from '../global/inputSelect'

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
  const [ci, setCi] = useState<string | null>(sale ? (sale.clientCi ? String(sale.clientCi) : null) : (ciUrl || null));
  const quantityLeft = stock - quantitySold;
  const [amount, setAmount] = useState(
    sale ? String(sale.amount) : 
    (Number(quantityUrl) > (quantityLeft) ? String(quantityLeft) : quantityUrl || "1")
  );
  const [loading, setLoading] = useState(false);
  const { handleReserve, handleCancelReserve } = useData();
  const [errors, setErrors] = useState<any>({});

  const checkNulls = () => {
    const nullErrors: any = {};
    if(ci === null) {
      nullErrors.ci = "Este espacio es requerido";
    }
    return nullErrors;
  }

  const checkErrors = () => {
    let newErrors: any = {};
    if(ci != null && !ci.trim()) {
      newErrors.ci = "Este espacio es requerido";
    } else if(ci != null && !/^\d+$/.test(ci)) {
      newErrors.ci = "Este espacio solo puede tener números";
    }
    return newErrors;
  }

  const handleSendReserve = async () => {
    const nullErrors = checkNulls();
    if(!Object.keys(nullErrors).length && !Object.keys(errors).length) {
      setLoading(true);
      const res = await reserveProduct({
        saleId: sale?.id,
        ci: ci || "",
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
    } else {
      setErrors({...checkNulls(), ...checkErrors()});
      Swal.fire({
        title: "Error al enviar",
        text: "Comprueba que no existan errores en el formulario.",
        icon: "error"
      });
    }
  }

  useEffect(() => {
    setErrors(checkErrors());
  }, [ci]);

  return (
    <>
      <div className='two-columns'>
        <InputText
          text='CI*'
          state={ci || ""}
          handleChange={(e) => setCi(e.target.value)}
          style={{ textAlign: "center" }}
          disabled={!!sale}
          error={errors.ci}
        />
        <InputSelect 
          text='Cantidad*'
          state={amount}
          handleChange={e => setAmount(e.target.value)}
          options={
            sale ? [{ 
              value: sale.amount,
              text: sale.amount 
            }] :
            Array.from(Array(quantityLeft).keys()).map(v => ({
              value: v + 1,
              text: v + 1
            }))
          }
          disabled={!!sale}
          danger={(!sale && Number(quantityUrl) > (quantityLeft) && `Se querían ${quantityUrl} pero solo quedan ${quantityLeft}`) || ""}
          small
        />
      </div> 
      <Button 
        onClick={handleSendReserve}
        disabled={loading}
      >
        {loading ? "Cargando..." : sale?.reserved ? "Cancelar reserva" : "Añadir reserva"}
      </Button>
    </>
  )
}

export default SaleForm