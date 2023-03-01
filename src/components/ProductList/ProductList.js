
import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";



import "./ProductList.css";

function ProductList() {

    const [allProducts, setAllProducts] = useState([]);
    const selected = [];

    const getProducts = () => {
        axios.get('http://localhost:80/api/product/save')
            .then((res) => {
                setAllProducts(res.data.reverse());
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getProducts();
    }, []);

    const massSelect = (e, a) => {
        if (e.target.checked) {
            selected.push(a);
        } else {
            selected.splice(selected.indexOf(a), 1);
        }
    }

    const unCheckAll = () => {
        let checkboxes = document.getElementsByClassName('delete-checkbox');

        for (let i = 0, n = checkboxes.length; i < n; i++) {
            checkboxes[i].checked = false;
        }
    }


    const massDelete = () => {
        fetch(`http://localhost:80/api/product/(${selected})/delete`,
        {method: "HEAD",})
            .then(res => {
                console.log(res);
                getProducts();
                unCheckAll();
            })
            .catch(err => console.log(err));
    };


    return (
        <div className="ProductList">

            <header>
                <h1>PRODUCT LIST</h1>

                <div>
                    <Link to="/add-product"><button>ADD</button></Link>
                    <button id="delete-product-btn" onClick={massDelete}>MASS DELETE</button>
                </div>

            </header>

            <div className="products">

                {
                    allProducts.map(eachProduct => {
                        return (
                            <form>
                                <input
                                    type="checkbox"
                                    className="delete-checkbox"
                                    onChange={(e) => { massSelect(e, eachProduct.id) }}
                                />
                                <div>
                                    <h5>{eachProduct.sku}</h5> <br />
                                    <h3>{eachProduct.name}</h3> <br />
                                    <p>{eachProduct.price} $</p>
                                    <p>{eachProduct.attr}</p>
                                    <h6>{eachProduct.type}</h6>
                                </div>
                            </form>
                        )
                    })
                }

            </div>

        </div>
    );
}

export default ProductList;
