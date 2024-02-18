import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Avatar, Button, Grid, Typography} from '@mui/material';
import './UserListPage.css';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [sinceId, setSinceId] = useState(1);
  const userUrl = 'https://api.github.com/users';

  useEffect( () => {
    fetch(`${userUrl}?since=${sinceId}`)
      .then(response => response.json())
      .then(data => {
        if (data.length) {
          setUsers(data)
        } else {
          alert(data.message);
        }
      })
      .catch(error => alert(error.message));
  }, [sinceId]);

  const pageChange = (action) => {
    if (users.length) {
      action === 'previous'
        ? (sinceId > 1)
          ? ((users[0].id - 30) > 1)
            ? setSinceId(users[0].id - 30)
            : setSinceId(1)
          : setSinceId(1)
        : setSinceId(users[users.length - 1].id + 1);
    }
  };

  return (
    <div className="user-list-container">
      <h1>User List</h1>
      <div className="d-flex">
        <Button disabled={!(sinceId > 1)} onClick={() => pageChange('previous')}>Previous</Button>
        <Button disabled={!(users.length)} onClick={() => pageChange('next')}>Next</Button>
      </div>
      <Grid container spacing={3}>
        {users.map(user => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Link to={`/user/${user.login}`} className="user-link">
              <div className="user-item">
                <Avatar src={user.avatar_url} alt={user.login} sx={{width: 56, height: 56}}/>
                <div className="user-info">
                  <Typography variant="h6" className="user-login">{user.login}</Typography>
                  <Typography variant="body2" className="user-url">{user.html_url}</Typography>
                </div>
              </div>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default UserListPage;
