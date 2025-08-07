// file imports
import MyContext from "./myContext";
import { fireDB } from "../../firebase/FirebaseConfig";

// dependency imports
import { useEffect, useState } from 'react'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, QuerySnapshot, setDoc, Timestamp } from "firebase/firestore";

const myState = (props) => {

    const [product, setProduct] = useState({
        title: "",
        price: "",
        imageUrl: "",
        category: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric"
            }
        ),
    });

    const [allProducts, setAllProducts] = useState([]);

    const addProduct = async () => {
        if(product.title === "" || product.price === "" || product.imageUrl === "" || product.description === "") return alert("required");

        const productRef = collection(fireDB, "products");// get the collection, similar to Models in nodeJS

        try {
            const operation = await addDoc(productRef, product);
            console.log("Operation is ", operation);
            getProducts();
            alert("Products added successfully");
            setTimeout(() => { window.location.href = "/"}, 800);
            setProduct("");
        } catch (error) {
            console.log("Error is ", error.message);
        }
    }

    const getProducts = async () => {
            try {
                const dbQuery = query(
                    collection(fireDB, "products"),
                    orderBy("time"),
                )

                const data = onSnapshot(dbQuery, (QuerySnapshot) => {
                    let productsArray = [];
                    QuerySnapshot.forEach((doc) => {
                        productsArray.push({ ...doc.data(), id: doc.id });
                    });
                    setAllProducts(productsArray);
                });
                return () => data;
            } catch (error) {
                console.error("Error is ", error);
            }
    }

    const editProduct = async (item) => {
        try {
            await setDoc(doc(fireDB, "products", item.id), item);
            getProducts();
            setTimeout(() => { window.location.href = "/"}, 800);
        } catch (error) {
            console.log("Error is ", error);
        }
        setProduct("");
    }

    const deleteProduct = async (item) => {
        try {
            await deleteDoc(doc(fireDB, "products", item.id));
            getProducts();
            setTimeout(() => { window.location.href = "/"}, 800);
        } catch (error) {
            console.log("Error is ", error);
        }
        setProduct("");
    }

    useEffect(() => {
        getProducts();
    }, [])

    const name = "Kamal";
  return (
    <MyContext.Provider value ={{ name, product, setProduct, allProducts, setAllProducts, addProduct, getProducts}}>{props.children}</MyContext.Provider>
  )
}

export default myState