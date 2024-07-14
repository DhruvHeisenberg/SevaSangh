import React, { useEffect,useState } from 'react';
import CardMembership from 'src/components/CardForum';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from '@mui/material';

const serverUrl=process.env.NEXT_PUBLIC_SERVER_URL

const UserProfile = () => {
    const [username, setUsername] = React.useState(''); 
    const [email, setEmail] = React.useState('');
    const [issues, setIssues] = React.useState([]); 

    const [filter, setFilter] = useState({
        upvotes: 0,
        category: '',
        location: '',
        date: '',
    });

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilter((prevFilter) => ({
        ...prevFilter,
        [name]: value,
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${serverUrl}/api/users/details`, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                console.log(jsonData);
                setUsername(jsonData.user.name);
                setEmail(jsonData.user.email);
                setIssues(jsonData.issues);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    },[]);
    return (
        <div>
            <h1>User Profile</h1>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
            
            {/* <Box sx={{ marginBottom: 2 }}>
            <TextField
            type="date"
            name="date"
            value={filter.date}
            onChange={handleFilterChange}
            sx={{ marginRight: 2 }}
            />

            <TextField
            label="Location"
            name="location"
            value={filter.location}
            onChange={handleFilterChange}
            sx={{ marginRight: 2 }}
            />
            <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
                value={filter.category}
                name="category"
                onChange={handleFilterChange}
            >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="water">water</MenuItem>
                <MenuItem value="infra">infra</MenuItem>
                <MenuItem value="electrical">electrical</MenuItem>
                <MenuItem value="social_justice">social_justice</MenuItem> 
                <MenuItem value="other">other</MenuItem>
                
                {/* Add more categories */}
            {/* </Select>
            </FormControl>
        </Box> */}
            <Typography variant='h4' sx={{ mb: 4 }}>User Issues</Typography>

            <CardMembership
            issues={issues?.filter((issue) => {
              return (
                // issue.upvoteCount >= filter.upvotes &&
                (filter.category === '' || issue.category === filter.category) &&
                (filter.location === '' || issue.location === filter.location) &&
                (filter.date === '' || issue.date === filter.date)
              );
            })}
          />
        </div>
    );
};

export default UserProfile;