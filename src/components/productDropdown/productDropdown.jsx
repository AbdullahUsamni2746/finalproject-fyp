import React, { useState, useEffect } from "react";
import "./productDropdown.scss";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

const ProductDropdown = (props) => {
  // console.log(props.id);
  // console.log(props.att);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {
    if (props.att === "") {
      // Fetch products data only when product is assigned
      fetchData();
    }
  }, [props.att]);
  const fetchData = async () => {
    try {
      const q = query(collection(db, "products"), where("attached", "==", ""));
      const querySnapshot = await getDocs(q);

      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      console.log("productList : " + productList);
      setProducts(productList);
      console.log(productList);
    } catch (err) {
      console.log(err);
    }
  };

  const findDocumentIdByFieldValue = async (fieldName, fieldValue) => {
    try {
      const q = query(
        collection(db, "products"),
        where(fieldName, "==", fieldValue)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No matching documents found.");
        return;
      }

      const documentId = querySnapshot.docs[0].id;
      fieldAdded(fieldValue, documentId, props.id);
      console.log("Document ID:", documentId);
    } catch (error) {
      console.error("Error finding document ID:", error);
    }
  };
  const fieldAdded = async (selectedProduct, productID, userID) => {
    const userRef = doc(db, "users", userID);
    console.log("ID :  ", productID);

    const productRef = doc(db, "products", productID);
    try {
      await updateDoc(productRef, { attached: props.id });
      await updateDoc(userRef, {
        attached: productID,
        macAddress: selectedProduct,
      });
      console.log("Field added successfully!");
    } catch (error) {
      console.error("Error adding field:", error);
    }
  };
  const handleProductChange = async (event) => {
    const selectedProduct = event.target.value;
    setSelectedProduct(selectedProduct);
    findDocumentIdByFieldValue("name", selectedProduct);

    console.log(selectedProduct);
    console.log("id:", props.id);
  };

  return (
    <div className="product-dropdown-container">
      {props.att !== "" ? (
        <p>Product Assigned</p>
      ) : (
        <select
          disabled={props.disabled === true}
          id="product"
          value={selectedProduct}
          onChange={handleProductChange}
        >
          <option value="">-- Select --</option>
          {products.map((product) => (
            <option key={product.id} value={product.name}>
              {product.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default ProductDropdown;
