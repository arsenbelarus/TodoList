import React from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {Redirect} from 'react-router-dom';
import {useFormik} from "formik";
import {FormErrorType, loginTC, logoutTC} from "./auth-reducer";
import {LoginParamsType} from "../api/auth-api";

export const Login = () => {
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const dispatch = useDispatch()

  const validate = (values: LoginParamsType) => {
    const errors: FormErrorType = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Required'
    } else if (values.password.length < 4) {
      errors.password = 'Must be at least 4 characters long'
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validate,
    onSubmit: values => {
      dispatch(loginTC(values));
    },
  })



  if (isLoggedIn) {
    return <Redirect to={"/TodoList"}/>
  }

  return <Grid container justify="center" >
    <Grid item style={{padding: "20px", backgroundColor: "#efc700", color: "ivory", marginTop: "40px",
    borderRadius: "10px", textAlign: "center", boxShadow: "0 0 5px 1px lightgrey"}}>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormLabel style={{color: "ivory"}}>
            <p>To log in get registered
              <a href={'https://social-network.samuraijs.com/'} style={{textDecoration: "none", color: "#282c34"}}
                 target={'_blank'}> here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
          </FormLabel>
          <FormGroup>
            <TextField
              label="Email"
              margin="normal"
              {...formik.getFieldProps("email")}
            />
            {formik.errors.email ? <div style={{color: "#282c34"}}> {formik.errors.email} </div> : null}
            <TextField
              type="password"
              label="Password"
              margin="normal"
              {...formik.getFieldProps("password")}
            />
            {formik.errors.password ? <div style={{color: "#282c34"}}> {formik.errors.password} </div> : null}
            <FormControlLabel
              label={'Remember me'}
              control={<Checkbox onChange={formik.handleChange}
                                 checked={formik.values.rememberMe}
                                 name="rememberMe"/>}
            />
            <Button type={'submit'} variant={'contained'} color={'primary'} style={{backgroundColor: "#282c34"}}>Login</Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  </Grid>
}
