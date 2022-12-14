import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SoldButton from './SoldButton'
import Tooltip from '@mui/material/Tooltip';
import database from "../../backend/Database/DBInstance"
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { ref, update, get, query, orderByChild, equalTo, onValue }
    from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

function UserListingItem(props) {

    const [sold, setSold] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [picture, setPicture] = useState([]);
    const [deleted, setDeleted] = useState(false);

    /*
    This method toggles the delete flag of the product. The delete flag is either true of false.
    */
    var deleteProduct = (id) => {
        const q = query(ref(database, 'products/'), orderByChild('id'), equalTo(id));
        get(q).then(snapshot => {
            snapshot.forEach(function(childSnapshot) {
                if (childSnapshot.val().deleted === "false") {
                    update(ref(database, 'products/' + id), {
                        deleted: "true"
                    })
                }
            })
        })
        alert("Product deleted! Please refresh.")
    }

    useEffect(() => {
        const readOneProductInfo = async (productID) => {
            onValue(ref(database, 'products/' + productID), (snapshot) => {
                const product = snapshot.val()
                if (product != null) {
                    if (product.sold != null) {
                        var isTrue = (product.sold === 'true');
                        setSold(isTrue);
                    }

                    if (product.name != null) {
                        setName(product.name);
                    }

                    if (product.price != null) {
                        setPrice(product.price);
                    }

                    setDeleted(product.deleted === "true");                    

                    let pics = product.pictures
                    if (pics != null) {
                        pics = (Object.prototype.toString.call(pics) === '[object Array]' ? pics : Object.values(pics))
                        setPicture(pics[0]);
                    } else {
                        console.log("should not reach this point: no pictures to display")
                        pics = [] // should not reach this place since will alert "form not filled"
                    }
                }
            })
        }

        readOneProductInfo(props.prodId).catch(console.error)
    }, [])

    if (name === "" || deleted) {
        return
    } else {
        return (
            <div className="user-listing-item">
                <Grid container spacing={2} sx={{ paddingLeft: "0px !important", paddingTop: "0px !important" }}>
                    <Grid item xs={1.5}>
                        <img src={picture} className="product-img-source"/>
                    </Grid>
                    <Grid item xs={7.5}>
                        <div>
                            <Tooltip title={props.prodId}>
                                <Link to={`/product/${props.prodId}`} className="add-listing-link">
                                    {
                                        name ? (
                                            name
                                        ):(
                                            "Loading..."
                                        )
                                    }
                                </Link>
                            </Tooltip>
                            <div>
                                ${price}
                            </div>
                        </div>
                    </Grid>
    
                    <Grid container item xs={1.5} alignItems="center">
                        <Grid item display="flex" justify="center">
                            <SoldButton productId={props.prodId} isSold={sold} />
                        </Grid>
                    </Grid>
    
                    <Grid container item xs={1.5} alignItems="center">
                        <Grid item display="flex" justify="center">
                            <div onClick={() => deleteProduct(props.prodId)}>
                                <IconButton aria-label="delete" size="large">
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                            </div>
                        </Grid>
                    </Grid>
                    
                </Grid>            
                
            </div>
      )
    }    
}

export default UserListingItem