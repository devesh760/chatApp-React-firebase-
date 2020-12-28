import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
const Login=(props)=>{
    return(
        <div className='d-flex justify-content-center m-auto'>
            <div className="alert alert-primary d-flex justify-content-center flex-column" role="alert">
                <h3>Hey Login With Google to use our chat App</h3>
                <Button onClick={props.loginHandler} variant='primary' className='mt-5'>Login With Google</Button>
            </div>
        </div>
    );
}
export default Login;