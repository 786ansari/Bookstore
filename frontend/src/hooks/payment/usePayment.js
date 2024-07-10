import { useCallback, useContext } from "react";
import useRazorpay from "react-razorpay";
import { capturePayment, createOrder } from "../../services/order.service";
import { HotToaster } from "../../utils/Toaster";
import { AuthContext } from "../../context/AuthContext";
import { imageUrl } from "../../services/dataurl";

const usePayment = () => {
  const [Razorpay, isLoaded] = useRazorpay();
  const { userProfile } = useContext(AuthContext);

  const handlePayment = useCallback(
    async ({amount,files,type,planId}) => {
      const data = {
        amount: amount, // Use the amount passed as parameter
      };
      const order = await createOrder(data);

      const options = {
        key_id: "rzp_live_pmrIf8jFsaMb0I",
        key_secret: "IqDJQeXYLMW4jsQMonAnP4E0",
        amount: amount,
        currency: "INR",
        name: "Acme Corp",
        description: "Transaction",
        image: userProfile?.profileIcon ? imageUrl + userProfile?.profileIcon : "./images/user.png",
        order_id: order.data.id,
        handler: async(res) => {
          console.log("res=======>>>>>>>>>", res);
          const resultfiles = {
            amount:amount,
            type:type,
            planId:planId,
            files:JSON.stringify(files),
            payment_id:res.razorpay_payment_id,
            order_id:res.razorpay_order_id,
            signature:res.razorpay_signature,
          }
          const results = await capturePayment(resultfiles)
        },
        prefill: {
          name: userProfile?.name,
          email: userProfile?.emailId,
          contact: userProfile?.mobileNumber,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#e12729",
        },
      };

      const rzpay = new Razorpay(options);
      rzpay.on('payment.failed', function (response) {
        alert('Payment failed');
        console.error('Payment failed:', response.error);
        // Display detailed error information to the user or log it for debugging
        HotToaster(false, response.error.description);
        HotToaster(false, response.error.reason);
      });
      rzpay.open();
    },
    [Razorpay, userProfile]
  );

  return {
    handlePayment,
    Razorpay,
    isLoaded,
  };
};

export default usePayment;
