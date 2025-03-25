import LoginForm from '../components/LoginForm';

function AdminLogin() {
  const credentials = { 
    username: 'superadmin', 
    password: 'superpassword' 
  };
  return <LoginForm role="Admin" credentials={credentials} redirectPath="/admin-panel/dashboard" />;
}

export default AdminLogin;
