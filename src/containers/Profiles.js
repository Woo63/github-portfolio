import React, { Component } from 'react';
import './Profiles.css'
import Link from "../components/Link/Link";
import List from "../components/List";


class Profile extends Component {
    constructor() {
        super();
        this.state = {
            data: {},
            repositories:[],
            loading: true,
            error:''
        }
    }
    async componentDidMount() {
        try {
            const profile = await fetch('https://api.github.com/users/Woo63');
            const profileJSON = await profile.json();
            if (profileJSON) {
                const repositories = await fetch(profileJSON.repos_url);
                const repositoriesJSON = await repositories.json();
                this.setState({
                    data: profileJSON,
                    repositories: repositoriesJSON,
                    loading: false,
                })
            }
        } catch (error) {
            this.setState({
                error: error.message,
                loading:false
            })
        }
    }
    render() {
        const { data, repositories, loading, error } = this.state;
        if (loading || error){
            return <div>{loading? 'Loading...':error}</div>
        }
        const items = [
            { label: 'html_url', value: <Link url={data.html_url} title='Github URL' /> },
            { label: 'repos_url', value: data.repos_url },
            { label: 'name', value: data.name},
            { label: 'company', value: data.company },
            { label: 'location', value: data.location },
            { label: 'email', value: data.email },
            { label: 'bio', value: data.bio }
        ]
        const projects = repositories.map(repository => ({
            label: repository.name,
            value: <Link url={repository.html_url} title='Github URL' />
        }));
        return (
            <div  className='Profile-container'>
                <img className='Profile-avatar' src={data.avatar_url} alt='avatar' />
                <List title={'Profile'} items={items}/>
                <List title={'Repositories'} items={projects}/>
            </div>
        );
    }
}
export default Profile;