import React, { useContext, useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import './navbar.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { Logincontext } from "../context/Contextprovider";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Drawer, IconButton, List, ListItem } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from "react-redux";


const Navbar = () => {
    const history = useNavigate("");
    const { account, setAccount } = useContext(Logincontext);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [text, setText] = useState("")
    const [liopen, setLiopen] = useState("")
    const { products } = useSelector(state => state.getproductsdata);

    // console.log("navbar===",account.carts.length)

    const getdetailsvaliduser = async () => {
        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();

        if (res.status !== 201) {
            console.log("first login");
        } else {
            setAccount(data);
        }
    }

    const getText = (text) => {
        setText(text)
        setLiopen(false)
    }

    useEffect(() => {
        getdetailsvaliduser();
    }, []);

    // for logout
    const logoutuser = async () => {
        const res2 = await fetch("/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data2 = await res2.json();
        // console.log(data2);

        if (!res2.status === 201) {
            const error = new Error(res2.error);
            throw error;
        } else {
            history("/");
            setAccount(false);
            // setOpen(false)
            toast.success("user Logout 😃!", {
                position: "top-center"
            });

        }
    }

    return (
        <div>
            <header>
                <nav>
                    <div className='left'>
                        <div className='navlogo'>
                            <NavLink to='/'>
                                <img src='https://raw.githubusercontent.com/harsh17112000/E-commerceapp/main/client/public/amazon_PNG25.png'></img>
                            </NavLink>
                        </div>
                        <div className='nav_searchbaar'>
                            <input type='text' name='' id='' onChange={(e) => getText(e.target.value)} placeholder='Search Your Products' />
                            <div className='search_icon' id='search'>
                                <SearchIcon />
                                {
                                    text &&
                                    <List className="extrasearch" hidden={liopen}>
                                        {
                                            products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
                                                <ListItem>
                                                    <NavLink to={`/getproductsone/${product.id}`} onClick={() => setLiopen(true)}>
                                                        {product.title.longTitle}
                                                    </NavLink>
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='right'>
                        <div className='nav_btn'>
                            <NavLink to='/login'>signin</NavLink>
                        </div>
                        {
                            account ? <NavLink to="/buynow">
                                <div className="cart_btn">
                                    <Badge badgeContent={account.carts.length} color="secondary">
                                        <ShoppingCartIcon id="icon" />
                                    </Badge>

                                    <p>Cart</p>
                                </div>
                            </NavLink> : <NavLink to="/login">
                                <div className="cart_btn">
                                    <Badge badgeContent={0} color="secondary">
                                        <ShoppingCartIcon id="icon" />
                                    </Badge>
                                    <ToastContainer />
                                    <p>Cart</p>
                                </div>
                            </NavLink>
                        }
                        {
                            account ?
                                <Avatar className="avtar2"
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    title={account.fname.toUpperCase()}>{account.fname[0].toUpperCase()}</Avatar> :
                                <Avatar className="avtar"
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick} />
                        }
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem style={{ margin: 10 }}>My account</MenuItem>
                            {account ? <MenuItem style={{ margin: 10 }} onClick={logoutuser} ><LogoutIcon style={{ fontSize: 16, marginRight: 3 }} />   Logout</MenuItem> : ""}
                        </Menu>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Navbar
