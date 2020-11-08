import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import Link from '../src/Link';
import api from './api';
import getUser from './useAuth/client';
const useStyles = makeStyles(theme => ({
    activeLink: {
        textDecoration: "underline"
    },
    footer: {
        height: "200px",
        backgroundColor: theme.palette.primary.main,
        width: "100%"
    }
}));
export const Layout = ({ children }) => {
    const classes = useStyles();
    const [user, loading] = getUser()
    const signOut = () => api.signOut();
    return (
        <>
            <AppBar position="static">
                <Toolbar style={{ gap: "20px" }}>
                    <Link href="/" color="inherit" activeClassName={classes.activeLink}>
                        <Typography variant="h6" >
                            News
                </Typography>
                    </Link>
                    <Link href="/dashboard" color="inherit" activeClassName={classes.activeLink}>

                        Dashobard
                  </Link>
                    <Link href="/orders" color="inherit" activeClassName={classes.activeLink}>
                        Orders
                  </Link>
                    <Link href="/account" color="inherit" activeClassName={classes.activeLink}>
                        Account
                   </Link>
                    {user && <>
                        <Link href="#" color="inherit" onClick={signOut} activeClassName={classes.activeLink}>
                            Sign out
                    </Link>
                    </>}
                    {!user && <>
                        <Link href="/signin" color="inherit" activeClassName={classes.activeLink}>
                            Sign In
                    </Link>
                    </>}

                </Toolbar>
            </AppBar>
            {children}
            <div className={classes.footer}>

            </div>
        </>
    )
}
