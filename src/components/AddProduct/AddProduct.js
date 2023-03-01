
import ReactDOM from "react-dom/client";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";



import "./AddProduct.css";

import axios from "axios";


function AddProduct() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [sku, setSKU] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState(0);

    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [lenght, setLenght] = useState(0);
    const [size, setSize] = useState(0);
    const [weight, setWeight] = useState(0);

    const [errors, setErrors] = useState({ a: 2 });


    const product = {
        name: name,
        sku: sku,
        type: type,
        price: price,
        attr: { height: height, width: width, lenght: lenght, size: size, weight: weight }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (sku === "") {
            setErrors({ ...errors, skuEmpty: "Please, enter a product sku" });
        } else if (name === "") {
            setErrors({ ...errors, nameEmpty: "Please, enter a valid name" });
        } else if (price === 0) {
            setErrors({ ...errors, priceEmpty: "Please, enter a valid price" });
        } else if (type === "") {
            setErrors({ ...errors, typeEmpty: "Please, choose a product type" });
        } else if (type === "DVD" && size === 0) {
            setErrors({ ...errors, sizeEmpty: "Please, enter a valid number" });
        } else if (type === "Book" && weight === 0) {
            setErrors({ ...errors, weightEmpty: "Please, enter a value" });
        } else if (type === "Furniture" && (height === 0 || lenght === 0 || width === 0)) {
            setErrors({ ...errors, dimensionEmpty: "Please, fill in all fields with valid values" });
        }




        else {


            axios.post('http://localhost:80/api/product/save', product)
                .then((res) => {
                    if (res.data.message === 'success') {
                        navigate(`/`)
                    }
                    else {
                        setErrors({ ...errors, uniqueError: res.data });
                    }
                })
                .catch(err => console.log(err));

        }
    }




    useEffect(() => {
        const timer = setTimeout(() => {
            setErrors({})
        }, 3500);
        return () => clearTimeout(timer);
    }, [errors]);

    return (
        <div className="AddProduct">

            <header>
                <h1>PRODUCT ADD</h1>

                <div>
                    <Link to="/"><button>Cancel</button></Link>
                    <button id="" onClick={handleSubmit}>Save</button>
                </div>

            </header>

            <form id="product_form">
                <label>SKU:</label>
                <input
                    type="text"
                    id="sku"
                    onChange={(e) => { setSKU(e.target.value) }}
                />
                <p className="error">{errors.uniqueError}</p>
                <p className="error">{errors.skuEmpty}</p>
                <br />
                <label>Name:</label>
                <input
                    type="text"
                    id="name"
                    onChange={(e) => { setName(e.target.value) }}
                />
                <p className="error">{errors.nameEmpty}</p>

                <br />
                <label>Price ($):</label>
                <input
                    type="number"
                    id="price"
                    onChange={(e) => { setPrice(e.target.value) }}
                />
                <p className="error">{errors.priceEmpty}</p>


                <br /> <br />


                <select id="productType" onChange={(e) => { setType(e.target.value) }}>
                    <option value="">Select Product Type</option>
                    <option value="DVD">DVD</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Book">Book</option>
                </select>
                <p className="error">{errors.typeEmpty}</p>


                <br />
                <br />


                {
                    type === "DVD" ?
                        <>
                            <label>Size (MB):</label>
                            <input
                                type="number"
                                id="size"
                                onChange={(e) => { setSize(e.target.value) }}
                            />
                            <p className="error">{errors.sizeEmpty}</p>
                            <br />
                            <p>Please, provide the storage size of the DVD in MB</p>
                            <br />
                        </> : type === "Furniture" ?
                            <>
                                <label>Height (CM):</label>
                                <input
                                    type="number"
                                    id="height"
                                    onChange={(e) => { setHeight(e.target.value) }}
                                />
                                <br />

                                <label>Width (CM):</label>
                                <input
                                    type="number"
                                    id="width"
                                    onChange={(e) => { setWidth(e.target.value) }}
                                />
                                <br />

                                <label>Length (CM):</label>
                                <input
                                    type="number"
                                    id="length"
                                    onChange={(e) => { setLenght(e.target.value) }}
                                />
                                <p className="error">{errors.dimensionEmpty}</p>
                                <br />
                                <p>Please, provide dimensions in HxWxL format</p>
                                <br />
                            </> : type === "Book" ?
                                <>
                                    <label>Weight (KG):</label>
                                    <input
                                        type="number"
                                        id="weight"
                                        onChange={(e) => { setWeight(e.target.value) }}
                                    />
                                    <p className="error">{errors.weightEmpty}</p>
                                    <br />
                                    <p>Please, provide the weight of the book in KG</p>
                                    <br />
                                </> : <></>

                }
                





            </form>

        </div>
    );
}

export default AddProduct;
