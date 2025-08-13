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
    <div className="firstproduct">
      <img className="productimage1" src={image} alt={title} />

      {quantity === 0 ? (
        <button
          className="productaddtocart"
          onClick={() =>
            addToCart({ image, category, title, price, quantity: 1 })
          }
        >
          <img src={cart} alt="cart" /> Add to cart
        </button>
      ) : (
        <div className="productaddtocart active">
          <button
            className="counter-btn"
            onClick={() => addToCart({ title, change: -1 })}
          >
            <img src={subtract_icon} alt="minus" className="icon-btn" />
          </button>

          <span className="counter-value">{quantity}</span>

          <button
            className="counter-btn"
            onClick={() => addToCart({ title, change: 1 })}
          >
            <img src={add_icon} alt="plus" className="icon-btn" />
          </button>
        </div>
      )}

      <p className="productp">{category}</p>
      <h2 className="producth2">{title}</h2>
      <h3 className="producth3">{formatPrice(price)}</h3>
    </div>
  );
};

const Product = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const products = [
    {
      image: productimage1,
      category: "Waffle",
      title: "Waffle with Berries",
      price: 6.5,
    },
    {
      image: productimage2,
      category: "Crème Brûlée",
      title: "Vanilla Bean Crème Brûlée",
      price: 7.0,
    },
    {
      image: productimage3,
      category: "Macaron",
      title: "Macaron Mix of Five",
      price: 8.0,
    },
    {
      image: productimage4,
      category: "Tiramisu",
      title: "Classic Tiramisu",
      price: 5.5,
    },
    {
      image: productimage5,
      category: "Baklava",
      title: "Pistachio Baklava",
      price: 4.0,
    },
    {
      image: productimage6,
      category: "Pie",
      title: "Lemon Meringue Pie",
      price: 5.0,
    },
    {
      image: productimage7,
      category: "Cake",
      title: "Red Velvet Cake",
      price: 4.5,
    },
    {
      image: productimage8,
      category: "Brownie",
      title: "Salted Caramel Brownie",
      price: 5.5,
    },
    {
      image: productimage9,
      category: "Panna Cotta",
      title: "Vanilla Panna Cotta",
      price: 6.5,
    },
  ];

  const handleAddToCart = ({
    image,
    category,
    title,
    price,
    quantity,
    change,
  }) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.title === title);
      if (existingItem) {
        const updatedQty = existingItem.quantity + (change || 0);
        if (updatedQty <= 0) {
          return prev.filter((item) => item.title !== title);
        }
        return prev.map((item) =>
          item.title === title ? { ...item, quantity: updatedQty } : item
        );
      } else {
        return [...prev, { image, category, title, price, quantity }];
      }
    });
  };

  const removeItem = (title) => {
    setCartItems((prev) => prev.filter((item) => item.title !== title));
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  return (
    <div className="product">
      <div className="product-content">
        <h1 className="producth1">Dessert</h1>

        {[0, 3, 6].map((start, index) => (
          <div className="first" key={start}>
            {products.slice(start, start + 3).map((p) => (
              <ProductItem
                key={p.title}
                {...p}
                addToCart={handleAddToCart}
                cartItem={cartItems.find((item) => item.title === p.title)}
              />
            ))}

            {index === 0 && (
              <div className="cartresult">
                <h1 className="cartresulth1">Your Cart ({totalItems})</h1>

                {cartItems.length === 0 ? (
                  <>
                    <img
                      className="emptyillustration"
                      src={empty_illustration}
                      alt="empty cart"
                    />
                    <p className="cartresultp">
                      Your added items will appear here
                    </p>
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
                              <span className="price">
                                @ {formatPrice(item.price)}
                              </span>
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
                      <span className="ordertotalspan">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>

                    <div className="delivery">
                      <div className="carbonimgp">
                        <img src={carbon_tree} className="carbontree" alt="" />
                        <p className="deliveryp">
                          This is a{" "}
                          <span className="deliverypspan">Carbon-neutral</span>{" "}
                          delivery
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
            )}
          </div>
        ))}
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
