import React, { useState } from 'react'
import api from '../src/api'
import Router, { useRouter } from "next/router";
import { Button, Container, TextField } from '@material-ui/core';
import Redirect from '../src/redirect';
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles({
  signIn: {
    display: "flex",
    justifyContent: 'center',
    alignItems: "center",
    height: "70vh",
    gap: "10px",
    flexDirection: 'column'
  },
  submitButton: {
    placeSelf: 'flex-start',
  }
});
export default function SignIn() {
  const classes = useStyles();
  const router = useRouter()
  const { cb } = router.query;
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "bruno@email.com", password: "bruno"
  })
  const HandleSumbit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true);
      const res = await api.signIn(null, "/auth/login", formData)
      if (res?.statusText === "OK") {
        Router.push(cb || "/");
      }
      setLoading(false);
    }
    catch (err) {
      if (err.response.status === 401)
        setError(true);
      setLoading(false);
    }
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  return (
    <Container maxWidth="sm" >

      <form onSubmit={HandleSumbit} onChange={handleChange} className={classes.signIn}>
        {
          error && <div style={{ color: "red" }}>
            Email or Password is incorrect
  </div>
        }
        <TextField fullWidth label="Email" type="email" name="email" value={formData.email} name="email" />
        <TextField fullWidth label="Password" type="password" name="password" value={formData.password} name="password" />
        <Button type="submit" disabled={loading} variant="contained" color="primary" className={classes.submitButton}>Sign In</Button>
      </form>
    </Container >
  )
}

SignIn.getInitialProps = async (context) => {
  const user = await api.getUser(context, "/products");
  if (user) {
    let cb = "/";
    if (context && context.req && context.req?.query?.cb) {
      cb = req.query.cb
    }
    if (typeof window !== "undefined") {
      function parseQuery(queryString) {
        var query = {};
        var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
        for (var i = 0; i < pairs.length; i++) {
          var pair = pairs[i].split('=');
          query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
        }
        return query;
      }
      const parsed = parseQuery(window.location.search).cb;
      if (parsed)
        cb = parsed;
    }
    Redirect(context, cb)
  }
  return {

  }
}