import React from 'react'
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { signIn, signOut, useSession } from 'next-auth/client';
import Link from '../src/Link';

export const Layout = ({ children }) => {
    const [session, loading] = useSession()

    return (
        <>
            <AppBar position="static">
                <Toolbar style={{ gap: "20px" }}>
                    <Link href="/" color="inherit" style={{ flexGrow: 1 }}>
                        <Typography variant="h6" >
                            News
    </Typography>
                    </Link>
                    <Link href="/dashboard" color="inherit" >
                        Dashobard
  </Link>
                    <Link href="/order" color="inherit" >
                        Order
  </Link>
                    <Link href="/account" color="inherit" >
                        Account
  </Link>
                    {!session && <>
                        <Button color="secondary" variant="contained" onClick={signIn} >Sign In</Button>
                    </>}
                    {session && <>
                        <Button color="secondary" variant="contained" onClick={signOut} >Sign out</Button>

                    </>}
                </Toolbar>
            </AppBar>
            {children}
        </>
    )
}
