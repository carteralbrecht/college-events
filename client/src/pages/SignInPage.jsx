import React from "react";
import {Button, Container, FormControl, Input, InputLabel, Paper, Typography} from "@material-ui/core";
import {withRouter} from "react-router-dom";

class SignInPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: "",
            user: {}
        }
    }

    handleChange = e => {
        console.log(e.currentTarget.value);
        this.setState({[e.currentTarget.id]: e.currentTarget.value});
    };

    handleSignInClick = async e => {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'email': this.state.email,
                'password': this.state.password
            })
        });

        if (response.status !== 200) {
            return this.setState({error: 'Error signing in'});
        }

        const user = await response.json();
        localStorage.setItem("user", JSON.stringify(user));
        this.props.history.push('/Home');
    }

    handleRegisterClick = () => {
        this.props.history.push('/Register');
    }

    render() {
        return (
            <Container maxWidth="sm" style={{marginTop: '5rem'}}>
                <Paper style={{padding: '2rem', textAlign: 'center'}}>
                    <Typography>Welcome! Please Sign In</Typography>
                    <div>
                        <FormControl style={{width: '100%'}}>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input id="email" type="text" value={this.state.email} onChange={this.handleChange}/>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl style={{width: '100%'}}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password" type="password" value={this.state.password}
                                   onChange={this.handleChange}/>
                        </FormControl>
                    </div>
                    <div>
                        <Typography style={{marginTop: '1rem'}}>{this.state.error}</Typography>
                    </div>
                    <div style={{marginTop: '1rem'}}>
                        <Button type="submit" color='primary' onClick={this.handleSignInClick}>
                            Sign In
                        </Button>
                        <Button type="submit" color='secondary' onClick={this.handleRegisterClick}>
                            Register
                        </Button>
                    </div>
                </Paper>
            </Container>
        );
    }
}

export default withRouter(SignInPage);