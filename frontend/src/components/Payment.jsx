/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "react-bootstrap";
import { useState } from "react";

function payment() {
  const handlePayNowClick = () => {
    setTxRef("negad3-tx-" + Math.random().toString(36).substr(2, 9));
  };
  const [txRef, setTxRef] = useState(
    "negad3-tx-" + Math.random().toString(36).substr(2, 9)
  );

  console.log(txRef);
  return (
    <div>
      <form method="POST" action="https://api.chapa.co/v1/hosted/pay">
        <input
          type="hidden"
          name="public_key"
          value="CHAPUBK_TEST-NDJfoLuHMpqJj4UM1wJUHPSXcksiZyp9"
        />
        <input type="hidden" name="tx_ref" value={txRef} />
        <input type="hidden" name="amount" value="100" />
        <input type="hidden" name="currency" value="ETB" />
        <input type="hidden" name="email" value="noblebarch@gmail.com" />
        <input type="hidden" name="first_name" value="noble" />
        <input type="hidden" name="last_name" value="biru" />
        <input type="hidden" name="title" value="Online Shopping" />
        <input
          type="hidden"
          name="description"
          value="Paying with Confidence with cha"
        />
        <input
          type="hidden"
          name="logo"
          value="https://chapa.link/asset/images/chapa_swirl.svg"
        />
        <input
          type="hidden"
          name="callback_url"
          value="https://example.com/callbackurl"
        />
        <input
          type="hidden"
          name="return_url"
          value="http://loaclhost:5188/"
        />
        <input type="hidden" name="meta[title]" value="test" />
        <Button variant="primary" type="submit" onClick={handlePayNowClick}>
          Pay Now
        </Button>
      </form>
    </div>
  );
}

export default payment;
