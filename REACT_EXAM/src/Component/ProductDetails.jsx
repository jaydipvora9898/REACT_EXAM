import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./common.css"
import { FaAlignLeft, FaArrowCircleLeft } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          setProduct({ id: productSnap.id, ...productSnap.data() });
        } else {
          alert("Product not found");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        navigate("/");
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (!product) return <div className="text-center mt-5">Loading product...</div>;

  return (
    <div className="detail-page">
    <div className="container my-5">
    <div className="detail-card card border-0 rounded-4 p-4">
      <div className="row g-4 align-items-center ">
        <div className="col-md-5 text-center">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid detail-image"
            style={{ maxHeight: "350px", objectFit: "contain" }}
          />
        </div>
        <div className="col-md-7">
          <h2 className="fw-bold mb-1 detail-title">{product.name}</h2>
          <span className="badge mb-2 detail-badge">{product.category}</span>
          <h4 className="fw-bold mt-2 mb-3 detail-price">₹{product.price}</h4>
          <p className="mb-4 text-white">{product.description}</p>
          <p className="fw-semibold mb-4 color-text-1">
            ⭐ {product.rating} / 5
          </p>
  
          <button
            className="back-btn rounded-pill px-4 py-2 d-flex align-items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <FaArrowCircleLeft />
            Back to Products
          </button>
        </div>
      </div>
    </div>
  </div>
  </div>
  
  );
};

export default ProductDetails;
