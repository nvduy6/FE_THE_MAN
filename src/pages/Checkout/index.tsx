import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { formatCurrency } from '../../ultis'
import {useForm, SubmitHandler} from 'react-hook-form'
import { addCarts } from '../../redux/slices/orderSlice'
import { getDistrict, getProvince, getWards } from '../../redux/slices/provinceSlice'
import { readUserLocal } from '../../redux/slices/userSlice'
import { readCart } from '../../redux/slices/cartSlice'
type Props = {}

const CheckoutPage = (props: Props) => {
  const dispatch = useDispatch<any>() 
  const navigate = useNavigate()
  const carts = useSelector((state: any) => state.carts)
  const province = useSelector((state: any) => state.province)
  const [users, setUsers] = useState<any>()
  useEffect(() => {
   dispatch(getProvince())
  },[dispatch])
  useEffect(() => {
    (async () => {
      const res = await dispatch(readUserLocal())
      const res2 = await dispatch(readCart(res?.payload?.users?.id))
    }) ()
    
  }, [])
  
  let sum = 0;
  const {register, handleSubmit, formState: {errors}} = useForm()
  const onAdd:SubmitHandler<any> = (data: any) => {
      const products = {
        product: carts,
        infomation: data,
        totalprice: sum
      }
      dispatch(addCarts(products))
      navigate('/') 
  }
  const onProvince = async (e:any) => {
          await dispatch(getDistrict(parseInt(e.target.value)))  
  }
  const onDistrict = async (e: any) => {
          await dispatch(getWards(parseInt(e.target.value)))
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onAdd)}>
      <section className="flex gap-8 w-10/12 m-auto py-20">
        <section className="basis-4/6">
          <h4 className="text-2xl font-bold mb-10">THÔNG TIN GIAO HÀNG</h4>
          <table className="table-auto w-full ">
            <label htmlFor="" className="font-semibold">Họ và Tên <span className='text-red-700'>*</span></label><br />
          <input
              className="border w-8/12 py-3 px-2  mt-5 mb-5"
              type="text"
              placeholder="Họ và Tên"
              {...register("fullname", {required: true})}
            />
            {errors?.fullname && <span>Không được để trống </span>}
          </table>
          <table className="table-auto w-full ">
            <label htmlFor="" className="font-semibold">Địa chỉ <span className='text-red-700'>*</span></label><br />
          <input
              className="border w-8/12 py-3 px-2  mt-5 mb-5"
              type="text"
              placeholder="Địa chỉ"
              {...register("address", {required: true})}
            />
              {errors?.address && <span>Không được để trống </span>}
          </table>
          <table className="table-auto w-full flex">
              <select onChange={(e) => onProvince(e)} className='py-[10px]' name="" id="">
                <option value="0">Tỉnh</option>
                {province.province?.map((item: any, index: number) => {
                  return <option key={index ++} value={item.ProvinceID}>{item.ProvinceName}</option>
                })}
              </select>
              <select onChange={(e) => onDistrict(e)} className='py-[10px]' name="" id="">
              <option value="0">Huyện </option>
                {province?.district?.map((item:any, index:number) => {
                  return <option key={index ++} value={item.DistrictID}>{item.DistrictName} </option>
                })}
              </select>
              <select className='py-[10px]' name="" id="">
                <option value="0">Xã</option>
                {province?.ward?.map((item:any, index:number) => {
                  return <option key={index ++} value={item.WardCode}>{item.WardName} </option>
                })}
              </select>
          </table>
          
          <table className="table-auto w-full ">
            <label htmlFor="" className="font-semibold">Số Điện Thoại <span className='text-red-700'>*</span></label><br />
          <input
              className="border w-8/12 py-3 px-2  mt-5 mb-5"
              type="text"
              placeholder="Số Điện Thoại"
              {...register("phonenumber", {required: true})}
            />
            {errors?.phonenumber && <span>Không được để trống </span>}
          </table>
          <table className="table-auto w-full ">
            <label htmlFor="" className="font-semibold">Email <span className='text-red-700'>*</span></label><br />
          <input
              className="border w-8/12 py-3 px-2 mt-5 mb-5"
              type="text"
              placeholder="Email"
              {...register("email", {required: true})}
            />
            {errors?.email && <span>Không được để trống </span>}
          </table>
          <table className="table-auto w-full ">
            <label htmlFor="" className="font-semibold">Ghi chú</label><br />
          <input
              className="border w-8/12 py-3 px-2  mt-5 mb-5"
              type="text"
              placeholder="Ghi chú"
              {...register("note")}
            />
          </table>
          
          
        </section>
        <section className="basis-2/6 w-full">
          <section className="bg-zinc-100 mt-12">
            <div className="p-10">
              <p className='text-2xl font-bold'>ĐƠN HÀNG CỦA BẠN</p>
              <div>-----------------------------------------------------------</div>
              <div className=" pt-5 flex">
                <span className="grow font-semibold">Sản Phẩm</span>
                <span className="text-right font-semibold">Giá</span>
              </div>
              {carts?.carts?.map((item:any, index: number) => {
                sum += item.quantity * item.price
                return <div key={index++} className=" pt-5 flex">
                <span className="grow flex">{index = index + 1 }. <span className='font-bold'>{item.name}</span> - <div style={{ backgroundColor: `${item.color}` }} className='w-[20px] h-[20px] rounded-[50%]'></div> / {item.size}</span>
                <span className="text-right ">{formatCurrency(item.price * item.quantity)}</span>
              </div>
              })}
              <div>-----------------------------------------------------------</div>
              <div className=" pt-5 flex">
                <span className="grow font-semibold">Tạm Tính </span>
                <span className="text-right ">{formatCurrency(sum)}</span>
              </div>
              <div className=" pt-5 flex">
                <span className="grow font-semibold">Chi phí vận chuyển</span>
                <span className="text-right ">{formatCurrency(30000)}</span>
              </div>
              <div className=" pt-5 flex">
                <span className="grow font-semibold">Tổng tiền</span>
                <span className="text-right ">{formatCurrency(sum + 30000)}</span>
              </div>


              <button className="bg-black text-white font-semibold p-3 mt-10 w-full">
              Hoàn tất Đơn hàng
              </button>
            </div>
          </section>
        </section>
      </section>
      </form>
    </div>
  )
}

export default CheckoutPage