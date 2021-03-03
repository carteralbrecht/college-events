import React from "react";
import {Button, Container, FormControl, Input, InputLabel, Paper, Typography} from "@material-ui/core";
import {withRouter} from "react-router-dom";

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    }

    handleChange = e => {
        console.log(e.currentTarget.value);
        this.setState({[e.currentTarget.id]: e.currentTarget.value});
    };

    handleRegisterClick = async e => {

        if (this.state.password !== this.state.confirmPassword) {
            return this.setState({error: 'Passwords must match'});
        }

        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'email': this.state.email,
                'password': this.state.password,
                'firstname': this.state.firstName,
                'lastname': this.state.lastName
            })
        });

        if (response.status !== 200) {
            return this.setState({error: 'Error Registering'});
        }

        this.props.history.push('/');
    }

    render() {
        return (
            <Container maxWidth="sm" style={{marginTop: '5rem'}}>
                <Paper style={{padding: '2rem', textAlign: 'center'}}>
                    <Typography>Register New Account</Typography>
                    <div>
                        <FormControl style={{width: '100%'}}>
                            <InputLabel htmlFor="firstName">First Name</InputLabel>
                            <Input id="firstName" type="text" value={this.state.firstName} onChange={this.handleChange}/>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl style={{width: '100%'}}>
                            <InputLabel htmlFor="lastName">Last Name</InputLabel>
                            <Input id="lastName" type="text" value={this.state.lastName} onChange={this.handleChange}/>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl style={{width: '100%'}}>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input id="email" type="text" value={this.state.email} onChange={this.handleChange}/>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl style={{width: '100%'}}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password" type="password" value={this.state.password} onChange={this.handleChange}/>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl style={{width: '100%'}}>
                            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                            <Input id="confirmPassword" type="password" value={this.state.confirmPassword} onChange={this.handleChange}/>
                        </FormControl>
                    </div>
                    <div>
                        <Typography style={{marginTop: '1rem', color: 'red'}}>{this.state.error}</Typography>
                    </div>
                    <div style={{marginTop: '1rem'}}>
                        <Button type="submit" color='primary' onClick={this.handleRegisterClick}>
                            Submit
                        </Button>
                    </div>
                </Paper>
            </Container>
        );
    }
}

export default withRouter(RegisterPage);