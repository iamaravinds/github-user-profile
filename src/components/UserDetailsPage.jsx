import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {
  Avatar,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './UserDetailsPage.css';

const formConstants = [
  // { key: 'avatar_url', label: 'avatar_url'},
  { key: 'bio', label: 'Bio'},
  { key: 'blog', label: 'Blog', type: 'link', value: 'blog'},
  { key: 'company', label: 'Company'},
  { key: 'email', label: 'Email'},
  { key: 'followers', label: 'Followers'},
  { key: 'following', label: 'Following'},
  { key: 'location', label: 'Location'},
  { key: 'login', label: 'User Name'},
  { key: 'name', label: 'Name'},
  { key: 'public_repos', label: 'Public repos'},
  { key: 'twitter_username', label: 'Twitter'},
  { key: 'url', label: 'Url', type: 'link', value: 'url' },
]

const UserDetailsPage = () => {
  const {username} = useParams();
  const history = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      setUser(data);
    };

    fetchUser();
  }, [username]);

  const handleGoBack = () => {
    history('/user');
  };

  return (
    <div className="user-details-container">
      <IconButton aria-label="delete" variant="contained" color="primary" onClick={handleGoBack}>
        <ArrowBackIcon/>
      </IconButton>
      <div className="user-details-card">
        {user && (
          <div className="user-info">
            <div className="d-flex">
              <div className="user-avatar">
                <Avatar src={user.avatar_url} alt={user.login} sx={{width: 100, height: 100}}/>
              </div>
              <div>
                <Typography variant="h4" className="user-name">{user.name}</Typography>
                <Typography variant="h6" className="user-username">{user.login}</Typography>
              </div>
            </div>

            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {formConstants.reduce((acc, attributeObj)=> {
                    if (user[attributeObj.key]) {
                      acc.push(
                        <TableRow>
                          <TableCell>
                            {attributeObj.label}
                          </TableCell>
                          <TableCell>
                            {
                              attributeObj.type === 'link'
                                ? <a href={user[attributeObj.value]}>{user[attributeObj.key]}</a>
                                : user[attributeObj.key]
                            }
                          </TableCell>
                        </TableRow>
                      )
                    }
                    return acc;
                  }, [])}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetailsPage;
