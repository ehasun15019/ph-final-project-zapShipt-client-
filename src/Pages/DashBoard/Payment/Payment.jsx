import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router'
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Payment = () => {

    const {parcelId} = useParams();
    const axiosSecure = useAxiosSecure();

    // backend data fetch with tanstack 
    const {data: parcel, isLoading} = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async() => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data
        }
    });


    // handle pay functionality
    const handlePay = async () => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName
        }

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        console.log(res.data);

        // stripe ka amader react-router ar vitore nia aste hove 
        window.location.href = res.data.url
    }


    if(isLoading) {
        return (
           <div className='flex justify-center items-center'>
             <span className="loading loading-infinity loading-xl text-primary"></span>
           </div>
        )
    }

  return (
    <div>
      <h2>Please pay ${parcel.cost} for: {parcel.parcelName}</h2>
      <button onClick={handlePay} className='btn btn-primary text-black'>Please Pay</button>
    </div>
  )
}

export default Payment
