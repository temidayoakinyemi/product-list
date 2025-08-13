import React, { useState } from "react";
import "./Product.css";
import productimage1 from "../../assets/productimage1.jpg";
import productimage2 from "../../assets/productimage2.png";
import productimage3 from "../../assets/productimage3.png";
import productimage4 from "../../assets/productimage4.png";
import productimage5 from "../../assets/productimage5.png";
import productimage6 from "../../assets/productimage6.png";
import productimage7 from "../../assets/productimage7.png";
import productimage8 from "../../assets/productimage8.png";
import productimage9 from "../../assets/productimage9.png";
import cart from "../../assets/cart.png";
import empty_illustration from "../../assets/empty illustration.png";
import add_icon from "../../assets/add icon.png";
import subtract_icon from "../../assets/subtract icon.png";
import cancel_icon from "../../assets/cancel icon.png";
import carbon_tree from "../../assets/carbon tree.svg";
import checkmark from "../../assets/checkmark.png";

function formatPrice(amount) {
  return `$${amount.toFixed(2)}`;
}

const ProductItem = ({
  image,
  category,
  title,
  price,
  addToCart,
  cartItem,
}) => {
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="product">
      <div className="product-content">
        <h1 className="producth1">Dessert</h1>

        {[0, 3, 6].map((start) => (
          <div className="first" key={start}>
            {products.slice(start, start + 3).map((p) => (
              <ProductItem
                key={p.title}
                {...p}
                addToCart={handleAddToCart}
                cartItem={cartItems.find((item) => item.title === p.title)}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="cartresult">
        <h1 className="cartresulth1">Your Cart ({totalItems})</h1>

        {cartItems.length === 0 ? (
          <>
            <img
              className="emptyillustration"
              src={empty_illustration}
              alt="empty cart"
            />
            <p className="cartresultp">Your added items will appear here</p>
          </>
        ) : (
          <>
            {cartItems.map((item) => (
              <div className="itemtitle" key={item.title}>
                <div className="cart-item-flex">
                  <div>
                    <p className="cart-item-title">{item.title}</p>
                    <p className="cart-item-line">
                      <span className="quantity">{item.quantity}x</span>
                      <span className="price">@ {formatPrice(item.price)}</span>
                      <span className="amount">
                        = {formatPrice(item.price * item.quantity)}
                      </span>
                    </p>
                  </div>
                  <img
                    src={cancel_icon}
                    alt="remove"
                    className="cancel-icon"
                    onClick={() => removeItem(item.title)}
                  />
                </div>
              </div>
            ))}

            <div className="ordertotalprice">
              <span>Order Total</span>
              <span className="ordertotalspan">{formatPrice(totalPrice)}</span>
            </div>

            <div className="delivery">
              <div className="carbonimgp">
                <img src={carbon_tree} className="carbontree" alt="" />
                <p className="deliveryp">
                  This is a{" "}
                  <span className="deliverypspan">Carbon-neutral</span> delivery
                </p>
              </div>
            </div>

            <button
              className="confirmorderbtn"
              onClick={() => setShowPopup(true)}
            >
              Confirm Order
            </button>
          </>
        )}
      </div>

      {showPopup && (
        <>
          <div className="overlay" onClick={() => setShowPopup(false)}></div>

          <div className="popup">
            <img src={checkmark} alt="Confirmed" className="confirm-icon" />

            <h2>Order Confirmed</h2>
            <p>We hope you enjoy your food!</p>

            <div className="popup-items">
              {cartItems.map((item) => (
                <div className="popup-item" key={item.title}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="popup-item-img"
                  />
                  <div className="popup-item-info">
                    <p className="popup-item-title">{item.title}</p>
                    <p className="popup-item-line">
                      <span className="popup-item-qty">{item.quantity}x</span>
                      <span className="popup-item-price">
                        @ {formatPrice(item.price)}
                      </span>
                      <span className="popup-item-total">
                        {formatPrice(item.quantity * item.price)}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="popup-total">
              <span>Order Total</span>
              <span className="popup-total-price">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <button
              className="popup-new-order-btn"
              onClick={() => {
                setShowPopup(false);
                setCartItems([]);
              }}
            >
              Start New Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
