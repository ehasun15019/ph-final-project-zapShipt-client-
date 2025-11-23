import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");
  const [paymentInfo, SetPaymentInfo] = useState({});
  console.log(session_id);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (session_id) {
      axiosSecure
        .patch(`/payment-success?session_id=${session_id}`)
        .then((res) => {
          console.log(res.data);

          SetPaymentInfo({
            transactionId: res.data.transactionId,
            tracingId: res.data.trackingId
          })
        });
    }
  }, [session_id, axiosSecure]);

  return (
    <div>
      <h2 className="text-2xl">Payment Successful</h2>
      <p>Transactions id: {paymentInfo.transactionId}</p>
      <p>Tracking Id: {paymentInfo.tracingId}</p>
      <p></p>
    </div>
  );
};

export default PaymentSuccess;
