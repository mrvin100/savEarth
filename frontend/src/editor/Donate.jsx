export default function Donate() {
  return (
    <section className="donate container">
      <div className="category">
        <div className="box">
          <i className="bx bxl-visa"></i>
          <span>visa</span>
        </div>
        <div className="box">
          <i className="bx bxl-paypal"></i>
          <span>paypal</span>
        </div>
      </div>
      <form action="" className="donate-form">
        <div className="input_box">
          <label htmlFor="number">Card number</label>
          <input
            type="text"
            id="number"
            placeholder="1234 1234 1234 1234"
            className="box"
          />
        </div>
        <div className="cols">
          <div className="col">
            <div className="input_box">
              <label htmlFor="expiry">Expiry</label>
              <input
                type="text"
                id="expiry"
                placeholder="MM/YY"
                className="box"
              />
            </div>
            <div className="input_box">
              <label htmlFor="cvc">CVC</label>
              <input type="text" id="cvc" placeholder="CVC" className="box" />
            </div>
          </div>
          <div className="col">
            <div className="input_box">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                placeholder="Cameroon"
                className="box"
              />
            </div>
            <div className="input_box">
              <label htmlFor="code">Postal Code</label>
              <input
                type="text"
                id="code"
                placeholder="90210"
                className="box"
              />
            </div>
          </div>
        </div>
        <div className="input_box">
          <label htmlFor="amount">amount of donate</label>
          <input
            type="text"
            id="amount"
            placeholder="20 000XAF"
            className="box"
          />
        </div>
        <input type="submit" className="btn" value="donate" />
      </form>
    </section>
  );
}
