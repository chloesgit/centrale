import React, { Component } from 'react'
import Cookies from 'universal-cookie';

export default function Logout() {
    const cookiesUSER = new Cookies();
    cookiesUSER.set('username', "-",{ path: '/' });
     setTimeout(() => {
        window.location.replace("/");
    },1000);
    return <div></div>
}